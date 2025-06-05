"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import Link from "next/link";

// Skeleton component for the CarSwitcher
function CarSwitcherSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="pointer-events-none" // Make skeleton non-interactive
        >
          <Skeleton className="aspect-square size-8 rounded-lg bg-sidebar-primary" />
          <div className="grid flex-1 gap-1 py-1 text-left">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
          <Skeleton className="ml-auto size-5 rounded" />
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function formatCarNameForDisplay(carName) {
  if (!carName) return "Team";
  // Decode URI component (e.g., %20 to space), replace hyphens, and capitalize words
  return decodeURIComponent(carName)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function CarSwitcher({ cars }) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const [activeCar, setActiveCar] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (cars && cars.length > 0) {
      const segments = pathname.split("/").filter(Boolean);
      let carToSet = null;

      if (segments.length > 0) {
        const carNameFromUrl = segments[0];
        const carName = formatCarNameForDisplay(carNameFromUrl);
        const foundcar = cars.find(
          (car) => car.name.toLowerCase() === carName.toLowerCase()
        );
        if (foundcar) {
          carToSet = foundcar;
        }
      }

      // If no car found from URL, or URL doesn't have a car segment,
      // default to the first car in the list.
      if (!carToSet) {
        carToSet = cars[0];
      }

      setActiveCar(carToSet);
    } else {
      setActiveCar(null); // No cars, so no active car
    }
    setIsLoading(false); // Finished processing
  }, [pathname, cars]);

  if (isLoading) {
    return <CarSwitcherSkeleton />;
  }

  if (!activeCar) {
    // Not loading, and no active car (e.g., cars array was empty or no match)
    // You might want to return null or a placeholder indicating no cars.
    // For now, returning null to match previous behavior when no activeCar.
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeCar.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeCar.name}</span>
                <span className="truncate text-xs">{activeCar.category}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Cars
            </DropdownMenuLabel>
            {cars.map((car, index) => (
              <Link href={"/" + car.name} key={car.name}>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <car.logo className="size-3.5 shrink-0" />
                  </div>
                  {car.name}
                  {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add car</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
