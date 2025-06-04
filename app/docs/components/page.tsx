'use client';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { Code } from '../../../components/ui/code';

const exampleCode = `<Button>Click me</Button>`;

export default function ComponentsPage() {
  const [tab, setTab] = useState('preview');
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Components</h1>
      <Card>
        <CardContent className="p-4">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="space-y-2">
                <Button>Button</Button>
                <Input placeholder="Input" />
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Code>{exampleCode}</Code>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
