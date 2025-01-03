"use client";

import { useState } from "react";
import { AddPurchaseForm } from "@/app/_components/add-purchase-form";
import { PurchaseItemCard } from "@/app/_components/purchase-item-card";

interface PurchaseItem {
  id: number;
  name: string;
  notes: string;
}

export default function Home() {
  const [items, setItems] = useState<PurchaseItem[]>([]);

  const addItem = (name: string) => {
    const newItem: PurchaseItem = {
      id: Date.now(),
      name,
      notes: "",
    };
    setItems([newItem, ...items]);
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-3xl font-bold">私の買ったものリスト</h1>
      <AddPurchaseForm onAdd={addItem} />
      <div className="space-y-4">
        {items.map((item) => (
          <PurchaseItemCard
            key={item.id}
            initialName={item.name}
            initialNotes={item.notes}
          />
        ))}
      </div>
    </div>
  );
}
