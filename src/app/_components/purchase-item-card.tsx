"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Novel } from "./novel";

interface PurchaseItemCardProps {
  initialName: string;
  initialNotes: string;
}

export function PurchaseItemCard({ initialName, initialNotes }: PurchaseItemCardProps) {
  const [name, setName] = useState(initialName);

  return (
    <Card className="mb-4 w-full">
      <CardHeader className="pb-2">
        <CardTitle>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-none text-xl font-bold focus:ring-0"
            placeholder="アイテム名"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Novel initialContent={initialNotes} />
      </CardContent>
    </Card>
  );
}
