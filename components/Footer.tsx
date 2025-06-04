export default function Footer() {
  return (
    <footer className="text-center py-4 bg-muted mt-auto">
      <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Docs Site</p>
    </footer>
  );
}
