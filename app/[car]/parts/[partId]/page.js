// app/parts/[partId]/page.js
// This is now a Server Component

import { getPartById, getAllParts } from "@/lib/parts-data";
import PartDetailClient from "@/components/PartDetailClient"; // We will create this component

// Generate static paths for all parts
export async function generateStaticParams() {
  const parts = getAllParts();
  return parts.map((part) => ({
    partId: part.id,
  }));
}

// This Server Component fetches data and passes it to the Client Component
export default async function PartDetailPage({ params }) {
  const { partId } = await params;
  const part = getPartById(partId); // Data fetching happens here (server-side or at build time)

  // It's good practice to handle the case where a part might not be found,
  // especially if getPartById could return undefined.
  // The PartDetailClient component will also handle this.

  return <PartDetailClient part={part} />;
}
