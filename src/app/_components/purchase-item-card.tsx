"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Novel } from "./novel";

interface PurchaseItemCardProps {
  initialName: string;
  initialNotes: string;
}

export function PurchaseItemCard({
  initialName,
  initialNotes,
}: PurchaseItemCardProps) {
  const [name, setName] = useState(initialName);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-none"
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
