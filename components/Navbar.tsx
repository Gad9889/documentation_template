import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background sticky top-0 z-50">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
        <span className="font-bold">Docs Site</span>
      </Link>
      <Button asChild variant="outline">
        <Link href="/docs/getting-started">Docs</Link>
      </Button>
    </header>
  );
}
