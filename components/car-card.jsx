// components/CarCard.js
"use client";

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
 * CarCard component to display individual vehicle information.
 * @param {object} car - The car object.
 * Expected properties: id, name, modelCode, imageUrl, shortDescription, category.
 */
export default function CarCard({ car }) {
  if (!car) {
    return null;
  }

  return (
    <Link href={`/${car.name}`} passHref>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold">
            {car.name || "Unnamed Vehicle"}
          </CardTitle>
          <CardDescription>{car.modelCode || "N/A"}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden group">
            <Image
              src={car.imageUrl || "https://placehold.co/400x300.png"}
              alt={car.name || "Vehicle image"}
              layout="fill"
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              onError={(e) => {
                if (
                  e.target &&
                  typeof e.target.src === "string" &&
                  !e.target.src.includes("placehold.co")
                ) {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x300/E2E8F0/4A5568.png?text=Error";
                }
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
            {car.shortDescription ||
              "No description available for this vehicle."}
          </p>
        </CardContent>
        <CardFooter className="p-4 bg-secondary/20 dark:bg-zinc-900/30">
          <Badge variant="outline" className="text-xs">
            {car.category || "Vehicle"}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
