import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const popularStores = [
  { id: "amazon", name: "Amazon" },
  { id: "target", name: "Target" },
  { id: "walmart", name: "Walmart" },
  { id: "bestbuy", name: "Best Buy" },
  { id: "macys", name: "Macy's" },
];

export function GiftShopping() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Send Gifts to Loved Ones</CardTitle>
        <CardDescription>
          Choose from your favorite stores and send gifts directly to your loved ones using your X.AI Wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="store">Select Store</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a store" />
                </SelectTrigger>
                <SelectContent>
                  {popularStores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient's Name</Label>
              <Input id="recipient" placeholder="Enter recipient's name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Gift Amount</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="flex-1"
                />
                <Button className="w-[150px]">Send Gift</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {popularStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                  <CardDescription>Send gifts from {store.name}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}