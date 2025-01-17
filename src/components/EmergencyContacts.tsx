import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, Check, X } from "lucide-react";

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  hasApproved: boolean;
}

interface EmergencyContactsProps {
  onAllApproved: () => void;
}

export function EmergencyContacts({ onAllApproved }: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: 1, name: "John Smith", phone: "+1 (555) 123-4567", hasApproved: false },
    { id: 2, name: "Sarah Johnson", phone: "+1 (555) 234-5678", hasApproved: false },
    { id: 3, name: "Michael Brown", phone: "+1 (555) 345-6789", hasApproved: false }
  ]);

  const [withdrawalRequested, setWithdrawalRequested] = useState(false);

  const handleRequestWithdrawal = () => {
    setWithdrawalRequested(true);
  };

  const handleApproval = (contactId: number) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, hasApproved: true } : contact
    );
    setContacts(updatedContacts);

    // Check if all contacts have approved
    if (updatedContacts.every(contact => contact.hasApproved)) {
      onAllApproved();
    }
  };

  const resetApprovals = () => {
    setContacts(contacts.map(contact => ({ ...contact, hasApproved: false })));
    setWithdrawalRequested(false);
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-lg">Emergency Contacts Approval System</h3>
          </div>

          {!withdrawalRequested ? (
            <Button 
              variant="destructive" 
              onClick={handleRequestWithdrawal}
              className="w-full mb-4"
            >
              Request Emergency Withdrawal
            </Button>
          ) : (
            <Alert className="bg-yellow-500/10 border-yellow-500/20 mb-4">
              <AlertDescription className="text-yellow-600 dark:text-yellow-400">
                Withdrawal request sent. Waiting for all emergency contacts to approve.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  {withdrawalRequested && (
                    contact.hasApproved ? (
                      <Badge variant="success" className="bg-green-500">
                        <Check className="h-4 w-4 mr-1" />
                        Approved
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproval(contact.id)}
                      >
                        Simulate Approval
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {withdrawalRequested && (
            <Button 
              variant="outline" 
              onClick={resetApprovals}
              className="w-full mt-4"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}