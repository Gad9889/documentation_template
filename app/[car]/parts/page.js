// app/[car]/page.js (or similar, e.g., app/[car]/all-parts/page.js)
// This page lists all parts for a specific car.

import PartCard from "@/components/PartCard";
import { getAllParts, getAllCars } from "@/lib/parts-data"; // Added getAllCars
import { formatCarNameForDisplay } from "@/lib/utils";
import { ChevronRight } from "lucide-react"; // Not used in current layout, but kept if needed later
import Link from "next/link"; // Not used in current layout, but kept if needed later

export async function generateStaticParams() {
  const cars = getAllCars(); // Assumes this function returns all car objects e.g. [{id: 'falcon'}, ...]
  if (!cars || cars.length === 0) {
    // Handle case where no cars are found, or return a default if necessary
    // This prevents errors during build if getAllCars() is empty or not yet populated
    console.warn(
      "No cars found for generateStaticParams in CarPartsPage. Check getAllCars function and data."
    );
    return [];
  }
  return cars.map((car) => ({
    car: car.id.toLowerCase(), // Assuming car.id is the slug like "falcon"
  }));
}

export default async function CarPartsPage({ params }) {
  const { car: carNameSlug } = await params; // carNameSlug will be e.g., "falcon"

  // It's good practice to have a display name if the slug is different or needs capitalization
  // For simplicity, we'll capitalize the slug for display.
  // You might want to fetch the actual car details here to get a proper display name.
  const carDisplayName = formatCarNameForDisplay(
    carNameSlug.charAt(0).toUpperCase() + carNameSlug.slice(1)
  );

  const partsForCar = getAllParts(formatCarNameForDisplay(carNameSlug));

  const carExists = getAllCars().find(
    (c) => c.name.toLowerCase() === carDisplayName.toLowerCase()
  );

  if (carExists) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          All Parts for {carDisplayName}
        </h1>

        {partsForCar.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partsForCar.map((part) => (
              // --- MODIFICATION: Pass carNameSlug as carContext to PartCard ---
              <PartCard
                key={part.id}
                part={part}
                carContext={carNameSlug} // Pass the car slug as the context
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">
              No parts found for {carDisplayName}.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              This car model may not have any parts documented yet, or the
              association is missing. Please check your data source.
            </p>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
