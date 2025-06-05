// components/AppSidebar.js
"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  AudioWaveform,
  Command,
  CogIcon,
  Zap,
  Brain,
  Briefcase,
  Bird,
  // Frame, // Not used in current data
  // PieChart, // Not used in current data
  // Map, // Not used in current data
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getAllCars } from "@/lib/parts-data"; // Assuming this path is correct
import { CarSwitcher } from "./car-switcher"; // Assuming this path is correct

// Original data structure
const originalNavData = {
  user: {
    name: "BGRacing",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Mechanical",
      url: "/mechanical",
      icon: CogIcon,
      isActive: true, // This might need to be dynamic based on the full path
      items: [
        {
          title: "Heat Dissipation",
          url: "/mechanical/heat-dissipation",
        },
        {
          title: "Chassis",
          url: "/mechanical/chassis",
        },
      ],
    },
    {
      title: "electrical", // Consider consistent casing like "Electrical"
      url: "/electrical",
      icon: Zap,
      items: [
        {
          title: "High Voltage",
          url: "/electrical/high-voltage",
        },
        {
          title: "Low Voltage",
          url: "/electrical/low-voltage",
        },
        {
          title: "Communication",
          url: "/electrical/communication",
        },
      ],
    },
    {
      title: "Autonomous",
      url: "/autonomous",
      icon: Brain,
      items: [],
    },
    {
      title: "Operations",
      url: "/managerial", // Note: URL segment is "managerial" for title "Operations"
      icon: Briefcase,
      items: [],
    },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#", // These would also need prefixing if active
    //   icon: Frame,
    // },
  ],
};

export function AppSidebar({ ...props }) {
  const cars = getAllCars();
  const pathname = usePathname(); // Get current pathname

  // --- MODIFICATION START: Derive base prefix ---
  const pathSegments = pathname.split("/").filter(Boolean);
  let currentBasePrefix = "";
  if (pathSegments.length > 0) {
    // This example assumes the prefix is always the first segment.
    // e.g., /falcon from /falcon/mechanical/heat-dissipation
    currentBasePrefix = `/${pathSegments[0]}`;
  }
  // --- MODIFICATION END: Derive base prefix ---

  // --- MODIFICATION START: Dynamically update nav URLs ---
  const processedNavMain = originalNavData.navMain.map((mainItem) => {
    // Prefix the main item URL
    const updatedMainUrl = `${currentBasePrefix}${mainItem.url}`;

    // Prefix URLs of sub-items, if they exist
    const updatedSubItems = mainItem.items?.map((subItem) => ({
      ...subItem,
      url: `${currentBasePrefix}${subItem.url}`,
    }));

    // Determine if the main item should be active.
    // This is a simple check: if the current full path starts with the (prefixed) main item's URL.
    // And the main item's URL is not just the prefix itself (e.g. if currentBasePrefix is /falcon, and item url is /falcon, then it will be active)
    // You might need more sophisticated logic for isActive, especially if sub-items can also set the parent as active.
    const isActive =
      pathname.startsWith(updatedMainUrl) &&
      updatedMainUrl !== currentBasePrefix;

    return {
      ...mainItem,
      url: updatedMainUrl,
      items: updatedSubItems || [], // Ensure items is always an array
      isActive: isActive, // Update isActive based on the prefixed URL
    };
  });

  // Process project URLs similarly if they become active
  const processedProjects = originalNavData.projects.map((project) => ({
    ...project,
    url: project.url.startsWith("#")
      ? project.url
      : `${currentBasePrefix}${project.url}`, // Avoid prefixing anchor links
  }));
  // --- MODIFICATION END: Dynamically update nav URLs ---

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CarSwitcher cars={cars} />
      </SidebarHeader>
      <SidebarContent>
        {/* Pass the processed data to NavMain */}
        <NavMain items={processedNavMain} />
        <NavProjects projects={processedProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={originalNavData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
