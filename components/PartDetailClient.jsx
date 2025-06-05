// components/PartDetailClient.js
"use client"; // This is the Client Component

import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Download, Info } from "lucide-react";

export default function PartDetailClient({ part }) {
  if (!part) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Part Not Found</h1>
        <p className="text-muted-foreground">
          The part you are looking for does not exist or could not be loaded.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const departmentPath = part.department ? part.department.toLowerCase() : "#";
  const subDepartmentPath = part.subDepartment
    ? `${departmentPath}/${part.subDepartment
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    : departmentPath;

  // Default and error image URLs with corrected .png placement
  const defaultPartImageUrl =
    "https://placehold.co/600x600/E2E8F0/4A5568.png?text=Part+Image";
  const errorPartImageUrl =
    "https://placehold.co/600x600/E2E8F0/4A5568.png?text=Error";
  const defaultGalleryImageUrl =
    "https://placehold.co/150x150/E2E8F0/4A5568.png?text=Thumb";
  const errorGalleryImageUrl =
    "https://placehold.co/150x150/E2E8F0/4A5568.png?text=Error";

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}

      {/* Header Section */}
      <header className="pb-6 border-b">
        <h1 className="text-4xl font-bold tracking-tight">{part.name}</h1>
        <p className="text-xl text-muted-foreground mt-1">
          {part.shortDescription}
        </p>
        <div className="mt-3 space-x-2">
          <Badge variant="secondary">{part.department}</Badge>
          {part.subDepartment && (
            <Badge variant="secondary">{part.subDepartment}</Badge>
          )}
          {part.status && (
            <Badge
              variant={part.status === "In Production" ? "default" : "outline"}
            >
              {part.status}
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content: Image Gallery & Details */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Image Gallery */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
            <Image
              src={part.imageUrl || defaultPartImageUrl}
              alt={`Main image of ${part.name}`}
              layout="fill"
              className="bg-muted"
              onError={(e) => {
                if (
                  e.target &&
                  typeof e.target.src === "string" &&
                  e.target.src !== errorPartImageUrl
                ) {
                  e.target.onerror = null;
                  e.target.src = errorPartImageUrl;
                }
              }}
            />
          </div>
          {part.galleryImages && part.galleryImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {part.galleryImages.slice(0, 3).map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded overflow-hidden border"
                >
                  <Image
                    src={imgUrl || defaultGalleryImageUrl}
                    alt={`${part.name} thumbnail ${index + 1}`}
                    layout="fill"
                    className="bg-muted"
                    onError={(e) => {
                      if (
                        e.target &&
                        typeof e.target.src === "string" &&
                        e.target.src !== errorGalleryImageUrl
                      ) {
                        e.target.onerror = null;
                        e.target.src = errorGalleryImageUrl;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specifications Table */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          {part.specifications &&
          Object.keys(part.specifications).length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Property</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(part.specifications).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </TableCell>
                    <TableCell>{String(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">
              No specifications available for this part.
            </p>
          )}
        </div>
      </div>

      {/* Documentation Section */}
      <section className="pt-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="description">
              <Info className="mr-2 h-4 w-4 inline-block" />
              Description
            </TabsTrigger>
            <TabsTrigger value="design-files">
              <FileText className="mr-2 h-4 w-4 inline-block" />
              Design Files
            </TabsTrigger>
            <TabsTrigger value="notes">
              <Download className="mr-2 h-4 w-4 inline-block" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="description"
            className="mt-6 prose max-w-none dark:prose-invert"
          >
            <h3 className="text-xl font-semibold mb-2">Part Description</h3>
            {part.description ? (
              <p>{part.description}</p>
            ) : (
              <p className="text-muted-foreground">
                No detailed description available.
              </p>
            )}
          </TabsContent>

          <TabsContent value="design-files" className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Design & Documentation Files
            </h3>
            {part.designFiles && part.designFiles.length > 0 ? (
              <ul className="space-y-3">
                {part.designFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md bg-muted/50"
                  >
                    <span className="text-sm font-medium">{file.name}</span>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No design files listed for this part.
              </p>
            )}
          </TabsContent>

          <TabsContent
            value="notes"
            className="mt-6 prose max-w-none dark:prose-invert"
          >
            <h3 className="text-xl font-semibold mb-2">Notes & Observations</h3>
            {part.notes ? (
              <p>{part.notes}</p>
            ) : (
              <p className="text-muted-foreground">
                No additional notes available.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
