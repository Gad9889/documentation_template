// app/page.js
import CarCard from "@/components/car-card";
import SearchDialog from "@/components/search-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllCars } from "@/lib/parts-data";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const cars = getAllCars(); // Using the locally defined or imported carsData

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-zinc-900/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Vehicle Systems Knowledge Archive
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome to the central hub for detailed information on our vehicle
            components and systems. Start by selecting a vehicle model below to
            explore its specific parts and documentation.
          </p>
          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto flex justify-center gap-2">
            <SearchDialog />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            e.g., "Pegasus GT", "Brake Pads for Model X", "Engine Specs"
          </p>
        </div>
      </section>

      {/* Cars Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold tracking-tight mb-2 text-center">
          Select Your Vehicle Model
        </h2>
        <p className="text-muted-foreground mb-8 text-center max-w-xl mx-auto">
          Choose a vehicle below to access its detailed knowledge base,
          including parts, system diagrams, and maintenance guides.
        </p>
        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => {
              const { logo, ...carObj } = car;
              return <CarCard key={car.id} car={carObj} />;
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No Vehicle models are currently available. Please check back later.
          </p>
        )}
      </section>

      {/* Quick Links / Call to Action Section */}
      <section className="container mx-auto px-4 mt-16 py-12 bg-secondary/30 dark:bg-zinc-900/40 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Need Help or Want to Contribute?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Access general user manuals, troubleshooting guides, or learn how
              you can contribute to expanding our knowledge archive.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
            <Button variant="outline" size="lg" className="rounded-lg">
              View General Documentation
            </Button>
            <Button size="lg" className="rounded-lg">
              Contribute Information
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t border-border/40 dark:bg-zinc-950 dark:border-zinc-800/50 py-8 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} BGR. All rights reserved.</p>
            <p>Vehicle Systems Knowledge Archive</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <Link
              href="https://drive.google.com/drive/folders/1KWKJ_f2hz_FFBGsD2Qj5kBGIZurYjk3-?usp=drive_link" // Replace with your Google Drive link
              className="hover:text-primary transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Drive
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.notion.so/bgracing"
              className="hover:text-primary transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Notion
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.bgracing-il.com/"
              className="hover:text-primary transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
