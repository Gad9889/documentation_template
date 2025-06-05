// components/PartCard.js
"use client"; // This directive makes it a Client Component

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * PartCard component to display individual part information.
 * @param {object} part - The part object from partsData.
 * @param {string} [carContext] - The current car context (e.g., "falcon") for link prefixing. Optional.
 */
export default function PartCard({ part, carContext }) {
  // Added carContext prop
  if (!part) {
    return null;
  }

  // --- MODIFICATION START: Construct dynamic link ---
  // If carContext is provided, prepend it to the parts link.
  // Otherwise, use the default parts link.
  // Example: if carContext is "falcon", link becomes "/falcon/parts/part.id"
  // Example: if carContext is undefined/null, link remains "/parts/part.id"
  let partDetailHref = `/parts/${part.id}`;
  if (carContext) {
    partDetailHref = `/${carContext.toLowerCase()}/parts/${part.id}`;
  }
  // --- MODIFICATION END: Construct dynamic link ---

  return (
    // --- MODIFICATION: Use the dynamically constructed partDetailHref ---
    <Link href={partDetailHref} passHref>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <CardHeader>
          <CardTitle className="text-lg">{part.name}</CardTitle>
          <CardDescription>{part.partNumber || "N/A"}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
            <Image
              src={
                part.imageUrl ||
                "https://placehold.co/300x200/E2E8F0/4A5568?text=No+Image"
              }
              alt={part.name || "Part image"} // Added fallback for alt text
              layout="fill"
              onError={(e) => {
                // Check if e.target and e.target.src exist to prevent errors
                if (e.target && typeof e.target.src === "string") {
                  e.target.onerror = null; // Prevent infinite loop if fallback also fails
                  e.target.src =
                    "https://placehold.co/300x200/E2E8F0/4A5568?text=Error";
                }
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {part.shortDescription}
          </p>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">
            {part.department}
            {part.subDepartment ? ` > ${part.subDepartment}` : ""}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
