import * as React from 'react';

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="rounded bg-muted p-4 text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}
