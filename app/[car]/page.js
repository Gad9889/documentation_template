// app/[car]/page.js
// This page serves as a landing page for a specific car, showing featured parts.

import PartCard from "@/components/PartCard";
import { getFeaturedParts, getAllCars } from "@/lib/parts-data"; // Added getAllCars
import Link from "next/link";

// Helper function to format car name for display purposes
function formatCarNameForDisplay(carNameSlug) {
  if (!carNameSlug) return "Team";
  // Decode URI component (e.g., %20 to space), replace hyphens, and capitalize words
  return decodeURIComponent(carNameSlug)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const cars = getAllCars(); // Assumes this function returns all car objects e.g. [{id: 'falcon'}, ...]
  if (!cars || cars.length === 0) {
    // Handle case where no cars are found
    console.warn(
      "No cars found for generateStaticParams in CarPage. Check getAllCars function and data."
    );
    return [];
  }
  return cars.map((car) => ({
    car: car.id.toLowerCase(), // Assuming car.id is the slug like "falcon"
  }));
}

export default async function CarPage({ params }) {
  const { car: carNameSlug } = await params; // carNameSlug will be e.g., "falcon"
  const displayCarName = formatCarNameForDisplay(carNameSlug);

  // Assuming getFeaturedParts can take a carName (slug) and a count.
  // It's generally better to use slugs for data fetching consistency.
  const featuredParts = getFeaturedParts(3, displayCarName); // Using carNameSlug for fetching

  // Check if the car itself is valid, perhaps by trying to get car details or checking against getAllCars
  // For this example, we'll assume if getFeaturedParts returns undefined or null for a car, the car is considered not found.
  // A more robust check might involve a dedicated function like `getCarDetails(carNameSlug)`.
  const carExists = getAllCars().find(
    (c) => c.name.toLowerCase() === displayCarName.toLowerCase()
  );

  if (!carExists) {
    // Or if getFeaturedParts returns a specific "not found" indicator for the car
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">
          No Car Named "{displayCarName}" Found.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please check the URL or select a valid Car from the sidebar if
          available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          {displayCarName} Knowledge Archive
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Welcome to the central repository for all information related to the{" "}
          {displayCarName}. Browse through departments, explore detailed part
          specifications, and access critical documentation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Featured{" "}
          <Link
            href={`/${carNameSlug}/parts`}
            className="hover:underline text-blue-700"
          >
            Parts
          </Link>{" "}
          for {displayCarName}
        </h2>
        {featuredParts && featuredParts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredParts.map((part) => (
              // --- MODIFICATION: Pass carNameSlug as carContext to PartCard ---
              <PartCard
                key={part.id}
                part={part}
                carContext={carNameSlug} // Pass the car slug as the context
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No featured parts available for {displayCarName} at the moment.
          </p>
        )}
      </section>

      {/* You can add more sections here, like "Recently Updated" or "Quick Links" */}
    </div>
  );
}
