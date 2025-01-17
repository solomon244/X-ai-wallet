import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, BellIcon } from "@radix-ui/react-icons";

interface ScheduledPayment {
  id: string;
  from: string;
  amount: number;
  dueDate: string;
  status: "pending" | "completed";
}

const IncomingPayments: React.FC = () => {
  const scheduledPayments: ScheduledPayment[] = [
    {
      id: "1",
      from: "David Goggins",
      amount: 2300,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "pending"
    },
    {
      id: "2",
      from: "Mike's Allowance",
      amount: 80,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "pending"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Incoming Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scheduledPayments.map((payment) => (
          <div key={payment.id} className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-primary">{payment.from}</h3>
                <p className="text-sm text-muted-foreground">
                  Due: {formatDate(payment.dueDate)}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                ${payment.amount.toFixed(2)}
              </Badge>
            </div>
            <Alert className="bg-blue-500/10 border-blue-500/20">
              <div className="flex items-center gap-2">
                <BellIcon className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-400">
                  AI Assistant: I will remind David about the payment via notification. 
                  Payment tracking is active.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IncomingPayments;