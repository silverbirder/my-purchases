"use client";

import { useCallback, useState } from "react";
import { PurchaseItemCard } from "@/app/_components/purchase-item-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, LockIcon, SaveIcon, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PurchaseItem {
  id: number;
  name: string;
  notes: string;
}

export default function Home() {
  const [items, setItems] = useState<PurchaseItem[]>([
    { id: Date.now(), name: "", notes: "" },
  ]);
  const [listName, setListName] = useState("");
  const [author, setAuthor] = useState("");

  const addItem = useCallback(() => {
    const newItem: PurchaseItem = {
      id: Date.now(),
      name: "",
      notes: "",
    };
    setItems((prevItems) => [newItem, ...prevItems]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-5xl p-6">
        <div>
          <h1 className="mb-8 text-4xl font-bold">かったものリストをつくる</h1>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1 space-y-6 rounded-lg bg-white p-6 shadow-sm">
              <Button
                onClick={() => addItem()}
                className="flex w-full items-center justify-center text-base"
                variant="outline"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                買ったものを追加
              </Button>

              <div className="space-y-4">
                {items.map((item) => (
                  <PurchaseItemCard
                    key={item.id}
                    initialName={item.name}
                    initialNotes={item.notes}
                  />
                ))}
              </div>

              <Separator className="my-2" />

              <div className="space-y-3 rounded-md bg-gray-50 p-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">リスト名</label>
                  <Input
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="リスト名を入力"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">作者</label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="作者名を入力"
                    className="border-gray-200 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 lg:ml-6 lg:flex-col">
              <Button className="w-32 bg-gray-900" size="lg">
                <EyeIcon className="mr-2 h-4 w-4" />
                プレビュー
              </Button>
              <Button className="w-32 bg-gray-900" size="lg">
                <LockIcon className="mr-2 h-4 w-4" />
                鍵締め
              </Button>
              <Button className="w-32 bg-gray-900" size="lg">
                <SaveIcon className="mr-2 h-4 w-4" />
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
