import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { LockClosedIcon, RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import IncomingPayments from "@/components/IncomingPayments";
import { KazChat } from "@/components/KazChat";
import Paymaster from "@/components/Paymaster";
import { GlobalAutopilot } from "@/components/GlobalAutopilot";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import DocumentAnalyzer from "@/components/DocumentAnalyzer";
import { GiftShopping } from "@/components/GiftShopping";

interface Transaction {
  id: string;
  date: string;
  serviceProvider: string;
  items: string[];
  amount: number;
}

interface Wallet {
  id: string;
  name: string;
  balance: number;
  locked: boolean;
  showLockIcon?: boolean;
  aiMessage?: string;
  transactions?: Transaction[];
  showAutopilot?: boolean;
  autopilotEnabled?: boolean;
}

const initialWallets: Wallet[] = [
  { 
    id: "ai-savings", 
    name: "AI Personal Savings", 
    balance: 600, 
    locked: true, 
    showLockIcon: true,
    aiMessage: "AI recommendation: Keep this wallet locked for optimal savings growth" 
  },
  { 
    id: "food", 
    name: "Food & Drinks", 
    balance: 500, 
    locked: true, 
    showLockIcon: true,
    showAutopilot: true,
    autopilotEnabled: false,
    aiMessage: "AI food and drink allowance is in 3 days: $60",
    transactions: [
      {
        id: "t1",
        date: "2024-12-22",
        serviceProvider: "Starbucks",
        items: ["Grande Latte", "Blueberry Muffin"],
        amount: 12.50
      },
      {
        id: "t2",
        date: "2024-12-21",
        serviceProvider: "Subway",
        items: ["Footlong Italian BMT", "Cookie", "Drink"],
        amount: 15.99
      },
      {
        id: "t3",
        date: "2024-12-20",
        serviceProvider: "Whole Foods",
        items: ["Organic Bananas", "Greek Yogurt", "Granola", "Fresh Bread"],
        amount: 28.75
      }
    ]
  },
  { id: "laundry", name: "Laundry", balance: 100, locked: true },
  { 
    id: "emergency", 
    name: "Emergency", 
    balance: 1000, 
    locked: true,
    showLockIcon: true 
  },
  { id: "children", name: "Children Allowance", balance: 200, locked: true },
  { id: "parents-allowance", name: "Mom and Dad's allowance", balance: 500, locked: true },
  { id: "gas", name: "Gas", balance: 300, locked: true },
  { 
    id: "charity", 
    name: "Charity", 
    balance: 150, 
    locked: true,
    showLockIcon: true 
  },
  { id: "dating", name: "Dating", balance: 250, locked: true },
  { id: "clubbing", name: "Clubbing", balance: 200, locked: true }
];

export default function Home() {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets);
  const [globalAutopilotEnabled, setGlobalAutopilotEnabled] = useState(false);
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const handleUnlock = (id: string) => {
    setWallets(wallets.map(wallet => 
      wallet.id === id ? { ...wallet, locked: false } : wallet
    ));
  };

  const handleLock = (id: string) => {
    setWallets(wallets.map(wallet => 
      wallet.id === id ? { ...wallet, locked: true } : wallet
    ));
  };

  const handleBalanceChange = (id: string, newBalance: string) => {
    const numBalance = parseFloat(newBalance) || 0;
    setWallets(wallets.map(wallet => 
      wallet.id === id ? { ...wallet, balance: numBalance } : wallet
    ));
  };

  const handleAutopilotToggle = (id: string) => {
    setWallets(wallets.map(wallet => 
      wallet.id === id ? { ...wallet, autopilotEnabled: !wallet.autopilotEnabled } : wallet
    ));
  };

  return (
    <>
      <Head>
        <title>X.AI Wallet</title>
        <meta name="description" content="Your trusted personal finance AI agent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 max-w-4xl">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">X.AI Wallet</CardTitle>
              <CardDescription className="text-lg">Your Trusted Personal Finance AI Agent</CardDescription>
              <CardDescription className="mt-2">Total Balance: ${totalBalance.toFixed(2)}</CardDescription>
            </CardHeader>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4 mb-6">
            {wallets.map((wallet) => (
              <AccordionItem 
                key={wallet.id} 
                value={wallet.id}
                className="bg-card border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-between w-full pr-4">
                    <div className="flex items-center gap-2">
                      <span>{wallet.name}</span>
                      {wallet.showLockIcon && (
                        <LockClosedIcon className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <span className="text-muted-foreground">
                      ${wallet.balance.toFixed(2)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 py-2">
                    {wallet.aiMessage && (
                      <Alert className="bg-blue-500/10 border-blue-500/20 mb-4">
                        <AlertDescription className="text-blue-400">
                          {wallet.aiMessage}
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Label htmlFor={`balance-${wallet.id}`}>Balance:</Label>
                        <Input
                          id={`balance-${wallet.id}`}
                          type="number"
                          value={wallet.balance}
                          onChange={(e) => handleBalanceChange(wallet.id, e.target.value)}
                          disabled={wallet.locked}
                          className="max-w-[150px]"
                        />
                      </div>
                      {wallet.showAutopilot && (
                        <div className="flex items-center space-x-2">
                          <RocketIcon className={`h-4 w-4 ${wallet.autopilotEnabled ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <Label htmlFor={`autopilot-${wallet.id}`} className="text-sm">Autopilot</Label>
                          <Switch
                            id={`autopilot-${wallet.id}`}
                            checked={wallet.autopilotEnabled}
                            onCheckedChange={() => handleAutopilotToggle(wallet.id)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      {wallet.locked ? (
                        <Button 
                          variant="outline"
                          onClick={() => handleUnlock(wallet.id)}
                        >
                          Unlock Wallet
                        </Button>
                      ) : (
                        <Button 
                          variant="default"
                          onClick={() => handleLock(wallet.id)}
                        >
                          Lock Wallet
                        </Button>
                      )}
                    </div>

                    {wallet.id === "emergency" && (
                      <EmergencyContacts
                        onAllApproved={() => handleUnlock(wallet.id)}
                      />
                    )}

                    {wallet.transactions && wallet.transactions.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                        <div className="space-y-4">
                          {wallet.transactions.map((transaction) => (
                            <Card key={transaction.id}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-medium text-primary">{transaction.serviceProvider}</h4>
                                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                  </div>
                                  <Badge variant="secondary" className="ml-2">
                                    ${transaction.amount.toFixed(2)}
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <p className="text-sm text-muted-foreground">Items:</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {transaction.items.map((item, index) => (
                                      <Badge key={index} variant="outline">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Shop X.AI Wallet from Your Favorite Platform</CardTitle>
              <CardDescription>Choose your preferred shopping platform to get X.AI Wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                      </svg>
                      Amazon
                    </CardTitle>
                    <CardDescription>Purchase X.AI Wallet through Amazon's secure platform</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                      </svg>
                      Costco
                    </CardTitle>
                    <CardDescription>Get X.AI Wallet with your Costco membership</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>

          <GiftShopping />

          <DocumentAnalyzer />
          <IncomingPayments />
          <Paymaster />
        </main>
        <KazChat />
        <GlobalAutopilot 
          enabled={globalAutopilotEnabled}
          onToggle={() => setGlobalAutopilotEnabled(!globalAutopilotEnabled)}
        />
      </div>
    </>
  );
}