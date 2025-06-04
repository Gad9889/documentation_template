import Sidebar from '../../components/Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 border-r h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto">
        <Sidebar />
      </aside>
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
