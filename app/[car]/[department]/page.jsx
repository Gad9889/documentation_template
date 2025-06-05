// app/[car]/[department]/page.js
// Note: The file path is assumed to be something like app/[car]/[department]/page.js
// for params.car to be available.
// This page handles routes like /falcon/mechanical, /viper/electrical, etc.

import PartCard from "@/components/PartCard";
import {
  getPartsByDepartment,
  getAllParts,
  getAllCars,
} from "@/lib/parts-data"; // Added getAllCars
import Link from "next/link";
import { formatCarNameForDisplay } from "@/lib/utils";

// Define which top-level departments exist
const TOP_LEVEL_DEPARTMENTS = [
  "mechanical",
  "electrical",
  "autonomous",
  "managerial",
];

export async function generateStaticParams() {
  const generatedParams = [];
  const cars = getAllCars(); // Assumes this returns an array like [{ id: 'falcon', ... }, ...]

  for (const car of cars) {
    const carSlug = car.id.toLowerCase(); // Assuming car.id is the slug
    const departmentPathsForCar = new Set();

    // Get parts specific to this car to find relevant departments
    // If getAllParts can't be filtered by car here, or it's too heavy,
    // you might just combine TOP_LEVEL_DEPARTMENTS for each car.
    // For a more accurate list, filter parts by car if possible.
    // const partsForCar = getAllParts(carSlug);
    // partsForCar.forEach((part) => {
    //   if (part.department) {
    //     departmentPathsForCar.add(part.department.toLowerCase());
    //   }
    // });

    // Add all defined top-level departments for each car
    TOP_LEVEL_DEPARTMENTS.forEach((dep) => departmentPathsForCar.add(dep));

    departmentPathsForCar.forEach((department) => {
      generatedParams.push({ car: carSlug, department });
    });
  }
  return generatedParams;
}

export default async function DepartmentPage({ params }) {
  // params will now contain { car: 'falcon', department: 'mechanical' } (example)
  const { department: departmentSlug, car: carName } = await params; // carName will be the prefix like "falcon"

  // Fetch parts for the current car and department
  const allPartsForCar = getAllParts(carName);

  // Find the correct display name for the department (scoped to the current car's data if relevant)
  // This logic might need adjustment based on how department names are stored/derived with cars.
  // For simplicity, using the slug and capitalizing if not found in parts data.
  const currentDepartmentData = allPartsForCar.find(
    (p) =>
      p.department?.toLowerCase() === departmentSlug.toLowerCase() &&
      !p.subDepartment // ensure it's a top-level part for display name
  );
  const departmentDisplayName = currentDepartmentData
    ? currentDepartmentData.department
    : departmentSlug.charAt(0).toUpperCase() + departmentSlug.slice(1);

  // Fetch parts that belong directly to this department for the specific car
  const parts = getPartsByDepartment(departmentSlug, null, carName); // Pass carName, explicitly null for subDepartment

  const displayCarName = formatCarNameForDisplay(carName);
  const pageTitle = `${
    displayCarName.charAt(0).toUpperCase() + displayCarName.slice(1)
  } ${departmentDisplayName} Overview`;

  // Get sub-departments for this department (scoped to the current car)
  const subDepartments = [
    ...new Set(
      allPartsForCar
        .filter(
          (p) =>
            p.department?.toLowerCase() === departmentSlug.toLowerCase() &&
            p.subDepartment
        )
        .map((p) => p.subDepartment)
    ),
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>

      {/* Section for Sub-Departments if they exist */}
      {subDepartments.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Sub-Categories in {departmentDisplayName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subDepartments.map((subDeptName) => {
              const subDepartmentSlug = subDeptName
                .toLowerCase()
                .replace(/\s+/g, "-");
              // --- MODIFICATION: Prepend carName to the href ---
              const linkHref = `/${carName}/${departmentSlug}/${subDepartmentSlug}`;
              return (
                <Link
                  key={subDeptName}
                  href={linkHref} // Use the updated href
                  className="block p-6 bg-card border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-medium text-primary">
                    {subDeptName}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explore parts related to {subDeptName.toLowerCase()}.
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Section for Parts directly under this department */}
      {/* Ensure parts are filtered by carName and only direct parts (no subDepartment) */}
      {parts.length > 0 && (
        <section className={subDepartments.length > 0 ? "mt-12" : ""}>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            Direct Parts in {departmentDisplayName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {parts.map((part) => (
              // Assuming PartCard handles links correctly or doesn't need carName prefix for its own internal links
              <PartCard key={part.id} part={part} carContext={carName} />
            ))}
          </div>
        </section>
      )}

      {parts.length === 0 && subDepartments.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            No specific parts or sub-categories directly under{" "}
            {departmentDisplayName} for {carName}.
          </p>
          <p className="mt-2">
            Please select a sub-category from the sidebar if available, or check
            other departments.
          </p>
        </div>
      )}
    </div>
  );
}
