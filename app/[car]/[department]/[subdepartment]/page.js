// app/[car]/[department]/[subdepartment]/page.js
// Note: The file path is assumed to be something like app/[car]/[department]/[subdepartment]/page.js
// for params.car to be available.
// This page handles routes like /falcon/mechanical/chassis, /viper/electrical/low-voltage, etc.

import PartCard from "@/components/PartCard";
import {
  getPartsByDepartment,
  getAllParts,
  getAllCars,
} from "@/lib/parts-data"; // Added getAllCars
import Link from "next/link"; // Link might not be used directly on this page unless for breadcrumbs etc.
import { ChevronRight } from "lucide-react"; // ChevronRight might not be used unless for breadcrumbs
import { formatCarNameForDisplay } from "@/lib/utils";

export async function generateStaticParams() {
  const generatedParams = [];
  const cars = getAllCars(); // Assumes this returns an array like [{ id: 'falcon', name: 'Falcon' ... }, ...]
  const allPartsData = getAllParts(); // Get all parts once to derive department/subdepartment combinations

  for (const car of cars) {
    const carSlug = car.id.toLowerCase(); // Assuming car.id is the slug like "falcon"
    const departmentSubDepartmentPaths = new Set();

    // Iterate over all parts to find unique department/subdepartment combinations
    // This could be optimized if you have a more direct way to get all department/subdepartment structures
    allPartsData.forEach((part) => {
      if (part.department && part.subDepartment) {
        // We add paths for all cars, data filtering happens at page load
        departmentSubDepartmentPaths.add(
          `${part.department.toLowerCase()}/${part.subDepartment
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        );
      }
    });

    departmentSubDepartmentPaths.forEach((path) => {
      const [department, subdepartment] = path.split("/");
      generatedParams.push({
        car: carSlug,
        department,
        subdepartment,
      });
    });
  }
  return generatedParams;
}

export default async function SubDepartmentPage({ params }) {
  // params will now contain { car: 'falcon', department: 'mechanical', subdepartment: 'chassis' } (example)
  const {
    department: departmentSlug,
    subdepartment: subDepartmentSlug,
    car: carName,
  } = await params;

  // Fetch all parts for the current car to find display names and filter
  const allPartsForCar = getAllParts(formatCarNameForDisplay(carName));

  // Find display names using data fetched for the specific car
  const currentDepartmentData = allPartsForCar.find(
    (p) => p.department?.toLowerCase() === departmentSlug.toLowerCase()
  );
  const currentSubDepartmentData = allPartsForCar.find(
    (p) =>
      p.department?.toLowerCase() === departmentSlug.toLowerCase() &&
      p.subDepartment &&
      p.subDepartment.toLowerCase().replace(/\s+/g, "-") ===
        subDepartmentSlug.toLowerCase()
  );

  const carDisplayName = formatCarNameForDisplay(
    carName.charAt(0).toUpperCase() + carName.slice(1)
  );
  const departmentDisplayName = currentDepartmentData
    ? currentDepartmentData.department
    : departmentSlug.charAt(0).toUpperCase() + departmentSlug.slice(1);
  const subDepartmentDisplayName = currentSubDepartmentData
    ? currentSubDepartmentData.subDepartment
    : subDepartmentSlug.replace(/-/g, " ").charAt(0).toUpperCase() +
      subDepartmentSlug.replace(/-/g, " ").slice(1);

  // Fetch parts for the current car, department, and sub-department
  const parts = getPartsByDepartment(
    departmentSlug,
    subDepartmentSlug,
    carName
  );

  const pageTitle = `${carDisplayName} > ${departmentDisplayName} > ${subDepartmentDisplayName} Parts`;

  return (
    <div className="space-y-8">
      {/* Optional: Breadcrumbs could be added here */}
      {/* <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <Link href={`/${carName}`} className="hover:underline">{carDisplayName}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${carName}/${departmentSlug}`} className="hover:underline">{departmentDisplayName}</Link>
        <ChevronRight className="h-4 w-4" />
        <span>{subDepartmentDisplayName}</span>
      </nav> */}
      <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>

      {parts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {parts.map((part) => (
            // Assuming PartCard handles links correctly or doesn't need carName prefix for its own internal links
            // Pass carContext if PartCard needs it for generating its own links or specific logic
            <PartCard key={part.id} part={part} carContext={carName} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            No parts found in the {subDepartmentDisplayName.toLowerCase()}{" "}
            category for {departmentDisplayName.toLowerCase()} in the{" "}
            {carDisplayName}.
          </p>
          <p className="mt-2">
            Please check back later or try a different category.
          </p>
        </div>
      )}
    </div>
  );
}
