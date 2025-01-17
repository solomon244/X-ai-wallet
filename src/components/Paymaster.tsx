import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, TimerIcon } from "@radix-ui/react-icons";

interface ScheduledPayment {
  id: string;
  amount: number;
  frequency: string;
  nextPayment: string;
}

const Paymaster: React.FC = () => {
  const [amount, setAmount] = React.useState("");
  const [scheduleAmount, setScheduleAmount] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [paymasterBalance, setPaymasterBalance] = React.useState(2500);
  const [scheduledPayments, setScheduledPayments] = React.useState<ScheduledPayment[]>([]);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {
      setPaymasterBalance(prev => prev + depositAmount);
      setAmount("");
    }
  };

  const handleSchedulePayment = () => {
    const paymentAmount = parseFloat(scheduleAmount);
    if (paymentAmount > 0 && frequency) {
      const newPayment: ScheduledPayment = {
        id: Math.random().toString(36).substr(2, 9),
        amount: paymentAmount,
        frequency: frequency,
        nextPayment: getNextPaymentDate(frequency)
      };
      setScheduledPayments(prev => [...prev, newPayment]);
      setScheduleAmount("");
      setFrequency("");
    }
  };

  const getNextPaymentDate = (freq: string) => {
    const date = new Date();
    switch (freq) {
      case "daily":
        date.setDate(date.getDate() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
    }
    return date.toLocaleDateString();
  };

  const removeScheduledPayment = (id: string) => {
    setScheduledPayments(prev => prev.filter(payment => payment.id !== id));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <TimerIcon className="h-5 w-5 text-white" />
          </div>
          Paymaster Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Balance:</span>
            <Badge variant="secondary" className="text-lg">
              ${paymasterBalance.toFixed(2)}
            </Badge>
          </div>
          
          {/* Deposit Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Deposit Amount:</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleDeposit}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Deposit
              </Button>
            </div>
          </div>

          {/* Schedule Payment Section */}
          <div className="flex flex-col gap-2 border-t pt-4">
            <label className="text-sm font-medium">Schedule New Payment</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Amount"
                value={scheduleAmount}
                onChange={(e) => setScheduleAmount(e.target.value)}
                className="flex-1"
              />
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleSchedulePayment}
                className="bg-green-500 hover:bg-green-600"
              >
                Schedule
              </Button>
            </div>
          </div>

          {/* Scheduled Payments List */}
          {scheduledPayments.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">Scheduled Payments</h3>
              <div className="space-y-2">
                {scheduledPayments.map((payment) => (
                  <div 
                    key={payment.id} 
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">${payment.amount}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.frequency} - Next: {payment.nextPayment}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeScheduledPayment(payment.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <p className="text-sm text-blue-400">
              💡 Paymaster automatically handles scheduled payments based on your preferences. 
              Make sure to maintain sufficient balance for your scheduled payments.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Paymaster;