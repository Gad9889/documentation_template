import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function Home() {
  return (
    <div className="flex justify-center py-20">
      <Card className="max-w-xl text-center p-8">
        <CardContent>
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-gray-500 mb-6">Example docs site using shadcn UI and Next.js</p>
          <Button asChild>
            <Link href="/docs/getting-started">Get Started</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
