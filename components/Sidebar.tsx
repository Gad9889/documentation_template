'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

const links = [
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/docs/components', label: 'Components' },
  { href: '/docs/api', label: 'API Reference' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn('block px-2 py-1 rounded hover:bg-muted', pathname === link.href && 'bg-muted font-medium')}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
