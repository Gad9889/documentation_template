// components/SearchDialog.js
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { getAllParts, getAllCars } from "@/lib/parts-data"; // getAllCars might still be needed if other logic depends on it, or can be removed if truly unused now.
import { formatCarNameForDisplay } from "@/lib/utils";

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchableItemsList, setSearchableItemsList] = useState([]);

  const pathname = usePathname(); // Can be null on initial client render

  // Derive currentBasePrefix. This calculation will run on every render.
  // It's based on pathname, which can be null initially.
  // We use (pathname ?? "") to ensure split works and currentBasePrefix is always a string.
  const derivedPathname = pathname ?? ""; // Ensures derivedPathname is always a string
  const pathSegments = derivedPathname.split("/").filter(Boolean);
  let currentBasePrefix = ""; // Always initialized as a string
  if (pathSegments.length > 0) {
    const potentialCarSlug = pathSegments[0];
    // More robust check for what constitutes a car slug.
    // Exclude common top-level paths that are not car slugs.
    const knownNonCarSegments = [
      "parts",
      "mechanical",
      "electrical",
      "autonomous",
      "managerial",
      "api",
      "public",
      "_next",
    ];
    if (!knownNonCarSegments.includes(potentialCarSlug)) {
      currentBasePrefix = `/${potentialCarSlug}`;
    }
    // Example for deeper slugs, if needed:
    // else if (pathSegments.length > 1 && pathSegments[0] === 'vehicles' && !knownNonCarSegments.includes(pathSegments[1])) {
    // currentBasePrefix = `/${pathSegments[1]}`; // If URL is /vehicles/falcon
    // }
  }

  useEffect(() => {
    // Guard: If pathname is null, the router isn't ready. Don't populate items yet.
    // This prevents the effect from running with an incomplete/changing dependency (pathname: null -> string),
    // which can cause the "changed size between renders" error.
    if (pathname === null) {
      setSearchableItemsList([]); // Clear or set to loading, or just return to wait for pathname
      return;
    }

    // At this point, pathname is a string.
    // currentBasePrefix has been derived based on (pathname ?? ""), so it's also stable for this given pathname.

    let itemsToDisplay = [];
    // Use the currentBasePrefix that was calculated outside the effect.
    // It is stable now that pathname is guaranteed to be a string (or guarded against null).
    const carSlugFromPrefix = currentBasePrefix
      ? formatCarNameForDisplay(currentBasePrefix.substring(1))
      : null;

    if (carSlugFromPrefix) {
      // Fetch parts for the specific car
      const partsForCar = getAllParts(carSlugFromPrefix);
      itemsToDisplay = partsForCar.map((part) => ({
        id: `${carSlugFromPrefix}-part-${part.id}`, // Ensure unique ID with car prefix
        name: part.name || "Unnamed Part",
        category: `${part.department || "General"}${
          part.subDepartment ? ` > ${part.subDepartment}` : ""
        }`,
        type: "Part", // Explicitly set type
        href: `/${carSlugFromPrefix}/parts/${part.id}`, // Full path for the part within its car context
      }));
    } else {
      // No car context (e.g., at "/" or a non-car path like "/about"): fetch all parts globally
      // Cars themselves are not added to searchable items here as per user request.
      const allPartsGlobally = getAllParts(); // Fetch all parts
      const allCars = getAllCars(); // Fetch all cars

      const partItems = allPartsGlobally.map((part) => {
        let carSlugForUrl = "unknown-car"; // Default fallback slug

        // Check if the part is associated with any cars
        if (part.carId && part.carId.length > 0) {
          // 1. Get the ID of the FIRST car in the array.
          const firstCarId = part.carId[0];

          // 2. Find the full car object for that ID.
          const carForUrl = allCars.find((c) => c.id === firstCarId);

          // 3. If the car is found, create a URL-friendly slug from its name.
          if (carForUrl) {
            // Assuming car object has a name like "Terra Explorer". This will create "terra-explorer".
            carSlugForUrl = carForUrl.name;
          }
        }

        return {
          id: `${carSlugForUrl}-part-${part.id}`, // Ensure unique ID with car prefix
          name: part.name || "Unnamed Part",
          category: `${part.department || "General"}${
            part.subDepartment ? ` > ${part.subDepartment}` : ""
          }`,
          type: "Part", // Explicitly set type
          // 4. Construct the correct href using the derived slug.
          href: `/${carSlugForUrl}/parts/${part.id}`,
        };
      });
      itemsToDisplay = [...partItems]; // Only parts are included for global search
    }
    setSearchableItemsList(itemsToDisplay);
  }, [currentBasePrefix, pathname]); // Dependencies: effect re-runs if pathname or derived currentBasePrefix changes.
  // The guard `if (pathname === null)` handles the initial null state of pathname.

  // Keyboard shortcut effect (for opening/closing the dialog)
  useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []); // Empty dependency array: runs once on mount.

  // Search filtering effect (filters searchableItemsList based on searchTerm)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = searchableItemsList.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (item.category &&
          item.category.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (item.type && item.type.toLowerCase().includes(lowerCaseSearchTerm))
    );
    setSearchResults(results.slice(0, 10)); // Limit results displayed
  }, [searchTerm, searchableItemsList]); // Runs when search term or the list of available items changes.

  const handleResultClick = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        >
          <SearchIcon className="h-4 w-4 mr-2" />
          Search archive...
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">Ctrl+</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className={"hidden"}>
            Search Knowledge Archive
          </DialogTitle>
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              type="search"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 max-h-[70vh] overflow-y-auto">
          {searchTerm.trim() !== "" && searchResults.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found for "{searchTerm}".
            </div>
          )}
          {searchResults.length > 0 && (
            <div className="space-y-2 py-4">
              <p className="text-xs font-medium text-muted-foreground px-2">
                Results
              </p>
              {searchResults.map((item) => {
                return (
                  <Link
                    key={item.id} // Ensured item.id is unique
                    href={item.href}
                    onClick={handleResultClick}
                    className="block p-3 rounded-md hover:bg-muted focus:bg-muted outline-none"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.category} ({item.type})
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {searchTerm.trim() === "" && searchableItemsList.length > 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Start typing to search{" "}
              {currentBasePrefix
                ? `within ${formatCarNameForDisplay(
                    currentBasePrefix.substring(1)
                  )}`
                : "all parts in the archive"}
              .
            </div>
          )}
          {/* Displayed when no items are available to search at all (e.g. data fetch failed or router not ready) */}
          {searchableItemsList.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No items available to search. This may be due to an issue fetching
              data or router initialization.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
