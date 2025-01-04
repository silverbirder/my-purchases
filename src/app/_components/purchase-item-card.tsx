"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Novel } from "./novel";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
    <Card className="w-full border-gray-200 bg-gray-50">
      <CardContent className="relative space-y-4 p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 -top-4 shrink-0 rounded-full border border-gray-200 bg-white hover:bg-gray-100"
        >
          <X className="h-2 w-2" />
        </Button>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow"
          placeholder="品名"
        />
        <div className="space-y-2">
          <label className="text-sm font-medium">自由欄</label>
          <div className="rounded-md border border-gray-200 bg-white">
            <Novel initialContent={initialNotes} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
