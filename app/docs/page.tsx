import { redirect } from 'next/navigation';

export default function DocsHome() {
  redirect('/docs/getting-started');
  return null;
}
