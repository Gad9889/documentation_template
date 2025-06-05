// components/DynamicBreadcrumb.jsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPartById } from "@/lib/parts-data";

// Helper functions remain the same
const createSlug = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/\s+/g, "-");
};

const formatSegmentDisplayName = (segment) => {
  if (!segment) return "";
  const decodedSegment = decodeURIComponent(String(segment));
  return decodedSegment
    .replace(/[-_]/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Homepage logic remains the same
  if (pathname === "/") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Logic for part pages based on department/sub-department
  const isPartPageByDept =
    pathname.startsWith("/parts/") &&
    segments.length === 2 &&
    segments[0] === "parts";

  if (isPartPageByDept) {
    const partId = segments[1];
    const partData = getPartById(partId);

    if (partData) {
      const part = partData;
      const departmentPath = `/${createSlug(part.department)}`;
      const subDepartmentPath = part.subDepartment
        ? `${departmentPath}/${createSlug(part.subDepartment)}`
        : "";

      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* Reverted to default separator */}
            {part.department && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}

            {part.department && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={departmentPath}>
                    {formatSegmentDisplayName(part.department)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {/* Reverted to default separator */}
            {part.subDepartment && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}

            {part.subDepartment && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={subDepartmentPath}>
                    {formatSegmentDisplayName(part.subDepartment)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {/* Reverted to default separator */}
            <BreadcrumbSeparator className="hidden md:block" />

            <BreadcrumbItem>
              <BreadcrumbPage>
                {formatSegmentDisplayName(part.name)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }
  }

  // Enhanced fallback logic
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Reverted to default separator */}
        {segments.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}

        {segments.flatMap((segment, index) => {
          const isLastSegment = index === segments.length - 1;
          const decodedSegment = decodeURIComponent(segment);
          const items = [];

          if (decodedSegment.includes(",")) {
            const multiItems = decodedSegment
              .split(",")
              .map((item) => item.trim());

            multiItems.forEach((item, itemIndex) => {
              const href = `/${createSlug(item)}`;
              const displayName = formatSegmentDisplayName(item);
              const isLastItemInGroup = itemIndex === multiItems.length - 1;

              items.push(
                <BreadcrumbItem key={href} className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );

              // *** THIS IS THE KEY CHANGE ***
              // Use a custom pipe separator ONLY between the car names
              if (!isLastItemInGroup) {
                items.push(
                  <BreadcrumbSeparator
                    key={`${href}-separator`}
                    className="hidden md:block"
                  >
                    |
                  </BreadcrumbSeparator>
                );
              }
            });
          } else {
            // Standard logic for single-item segments
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const displayName = formatSegmentDisplayName(segment);

            if (isLastSegment) {
              items.push(
                <BreadcrumbItem key={href}>
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            } else {
              items.push(
                <BreadcrumbItem key={href} className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
          }

          // Use the default separator after the entire segment group
          if (!isLastSegment) {
            items.push(
              <BreadcrumbSeparator
                key={`${segment}-separator`}
                className="hidden md:block"
              />
            );
          }

          return items;
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
