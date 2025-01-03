"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

interface AddPurchaseFormProps {
  onAdd: (name: string) => void;
}

export function AddPurchaseForm({ onAdd }: AddPurchaseFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="新しいアイテムを追加"
        className="flex-grow"
      />
      <Button type="submit" size="icon">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}
