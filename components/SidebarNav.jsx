// components/SidebarNav.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Car, // Main app icon
  ChevronDown,
  ChevronRight,
  Settings,
  LifeBuoy,
  LogOut,
  Wrench, // Mechanical
  Zap, // Electrical
  Brain, // Autonomous
  Briefcase, // Managerial
  Home,
  PanelLeft, // For mobile sheet trigger
} from "lucide-react";
import { getAllCars } from "@/lib/parts-data"; // Fetch car data

// Main navigation structure
const primaryNavItems = [
  { title: "Home", href: "/", icon: Home },
  {
    title: "Mechanical",
    icon: Wrench,
    value: "mechanical", // for accordion
    subItems: [
      { title: "Heat Dissipation", href: "/mechanical/heat-dissipation" },
      { title: "Chassis", href: "/mechanical/chassis" },
    ],
  },
  {
    title: "Electrical",
    icon: Zap,
    value: "electrical", // for accordion
    subItems: [
      { title: "High Voltage", href: "/electrical/high-voltage" },
      { title: "Low Voltage", href: "/electrical/low-voltage" },
      { title: "Communication", href: "/electrical/communication" },
    ],
  },
  { title: "Autonomous", href: "/autonomous", icon: Brain },
  { title: "Managerial", href: "/managerial", icon: Briefcase },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const carData = getAllCars();
    setCars(carData);
    if (carData.length > 0) {
      // Try to get selected car from localStorage or default to first car
      const storedCarId = localStorage.getItem("selectedCarId");
      const initialCar =
        carData.find((c) => c.id === storedCarId) || carData[0];
      setSelectedCar(initialCar);
    }
  }, []);

  useEffect(() => {
    if (selectedCar) {
      localStorage.setItem("selectedCarId", selectedCar.id);
      // Here you would typically trigger a refetch of data based on selectedCar.id
      // For now, it just updates the UI.
      // Example: router.push(`/?carId=${selectedCar.id}`) or use context/zustand
    }
  }, [selectedCar]);

  // Determine default open accordions based on current path
  const defaultAccordionValues = primaryNavItems
    .filter(
      (item) =>
        item.subItems &&
        item.subItems.some((sub) => pathname.startsWith(sub.href))
    )
    .map((item) => item.value);

  if (!isMounted) {
    // Prevent hydration mismatch by rendering nothing or a placeholder until client-side state is ready
    return (
      <div className="flex h-full flex-col gap-2 p-2">
        {/* Placeholder for car selector */}
        <div className="h-10 w-full bg-muted rounded-md animate-pulse mb-4"></div>
        {/* Placeholder for nav items */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-full bg-muted rounded-md animate-pulse mb-2"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full flex-col justify-between">
        {/* Top section: Car Selector and Main Navigation */}
        <div>
          {/* Car Selector Dropdown */}
          <div className="px-2 py-4 border-b">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  {selectedCar ? (
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={selectedCar.imageUrl}
                        alt={selectedCar.name}
                      />
                      <AvatarFallback>
                        {selectedCar.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Car className="h-5 w-5" />
                  )}
                  <span className="truncate flex-1 text-left">
                    {selectedCar ? selectedCar.name : "Select Car"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Select Vehicle</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cars.map((car) => (
                  <DropdownMenuItem
                    key={car.id}
                    onSelect={() => setSelectedCar(car)}
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={car.imageUrl} alt={car.name} />
                      <AvatarFallback>
                        {car.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      {car.name} ({car.year})
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Main Navigation Links */}
          <nav className="grid gap-1 p-2">
            <Accordion
              type="multiple"
              defaultValue={defaultAccordionValues}
              className="w-full"
            >
              {primaryNavItems.map((item) =>
                item.subItems ? (
                  <AccordionItem
                    value={item.value}
                    key={item.value}
                    className="border-b-0"
                  >
                    <AccordionTrigger
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50 [&[data-state=open]>svg:last-child]:rotate-90",
                        item.subItems.some((sub) =>
                          pathname.startsWith(sub.href)
                        ) && "text-primary bg-muted"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 py-1">
                      <ul className="space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.href}>
                            <Link href={subItem.href} passHref>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 rounded-md px-3 py-2 text-muted-foreground font-normal hover:text-primary hover:bg-muted/50",
                                  pathname === subItem.href &&
                                    "text-primary bg-muted/80 font-medium"
                                )}
                              >
                                <span className="ml-5">{subItem.title}</span>{" "}
                                {/* Indent sub-items */}
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <Link href={item.href || "#"} passHref>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex w-full justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                            (pathname === item.href ||
                              (pathname === "/" && item.href === "/")) &&
                              "text-primary bg-muted"
                          )}
                          aria-label={item.title}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.title}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                )
              )}
            </Accordion>
          </nav>
        </div>

        {/* Bottom section: Settings, Help, Logout (optional) */}
        <nav className="mt-auto grid gap-1 p-2 border-t">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="flex justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
          {/* Add more items like Help or Logout if needed */}
        </nav>
      </div>
    </TooltipProvider>
  );
}

// Helper component for mobile sheet based navigation
export function MobileSidebarNav({ onLinkClick }) {
  const pathname = usePathname();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const carData = getAllCars();
    setCars(carData);
    if (carData.length > 0) {
      const storedCarId = localStorage.getItem("selectedCarId");
      const initialCar =
        carData.find((c) => c.id === storedCarId) || carData[0];
      setSelectedCar(initialCar);
    }
  }, []);

  useEffect(() => {
    if (selectedCar) {
      localStorage.setItem("selectedCarId", selectedCar.id);
    }
  }, [selectedCar]);

  const defaultAccordionValues = primaryNavItems
    .filter(
      (item) =>
        item.subItems &&
        item.subItems.some((sub) => pathname.startsWith(sub.href))
    )
    .map((item) => item.value);

  if (!isMounted) return null; // Or a loading skeleton

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              {selectedCar ? (
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={selectedCar.imageUrl}
                    alt={selectedCar.name}
                  />
                  <AvatarFallback>
                    {selectedCar.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Car className="h-5 w-5" />
              )}
              <span className="truncate flex-1 text-left">
                {selectedCar ? selectedCar.name : "Select Car"}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[calc(100vw-2rem)] max-w-xs"
            align="start"
          >
            <DropdownMenuLabel>Select Vehicle</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {cars.map((car) => (
              <DropdownMenuItem
                key={car.id}
                onSelect={() => {
                  setSelectedCar(car);
                  if (onLinkClick) onLinkClick();
                }}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={car.imageUrl} alt={car.name} />
                  <AvatarFallback>{car.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span>
                  {car.name} ({car.year})
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValues}
          className="w-full"
        >
          {primaryNavItems.map((item) =>
            item.subItems ? (
              <AccordionItem
                value={item.value}
                key={item.value}
                className="border-b-0"
              >
                <AccordionTrigger
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50 [&[data-state=open]>svg:last-child]:rotate-90",
                    item.subItems.some((sub) =>
                      pathname.startsWith(sub.href)
                    ) && "text-primary bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="pl-4 py-1">
                  <ul className="space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          passHref
                          onClick={onLinkClick}
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-3 rounded-md px-3 py-2 text-muted-foreground font-normal hover:text-primary hover:bg-muted/50",
                              pathname === subItem.href &&
                                "text-primary bg-muted/80 font-medium"
                            )}
                          >
                            <span className="ml-5">{subItem.title}</span>
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <Link
                key={item.title}
                href={item.href || "#"}
                passHref
                onClick={onLinkClick}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "flex w-full justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                    (pathname === item.href ||
                      (pathname === "/" && item.href === "/")) &&
                      "text-primary bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            )
          )}
        </Accordion>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="flex w-full justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
      </div>
    </div>
  );
}
