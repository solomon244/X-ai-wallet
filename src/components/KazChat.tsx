import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, History, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface SavedConversation {
  id: string;
  person: string;
  lastMessage: string;
  date: Date;
  messages: Message[];
}

export function KazChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Kaz, your AI financial assistant. How can I help you with your wallet management today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isPromptVisible, setIsPromptVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedConversation, setSelectedConversation] = useState<SavedConversation | null>(null);

  // Sample saved conversations
  const [savedConversations] = useState<SavedConversation[]>([
    {
      id: '1',
      person: 'Financial Advisor',
      lastMessage: 'Let\'s review your investment strategy',
      date: new Date(2024, 11, 28),
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'ve reviewed your portfolio.',
          timestamp: new Date(2024, 11, 28)
        },
        {
          role: 'user',
          content: 'What do you think about my current investment mix?',
          timestamp: new Date(2024, 11, 28)
        },
        {
          role: 'assistant',
          content: 'Your portfolio is well-balanced, but we could optimize the bond allocation.',
          timestamp: new Date(2024, 11, 28)
        }
      ]
    },
    {
      id: '2',
      person: 'Tax Consultant',
      lastMessage: 'Tax planning for next year',
      date: new Date(2024, 11, 27),
      messages: [
        {
          role: 'assistant',
          content: 'Let\'s discuss your tax planning strategy.',
          timestamp: new Date(2024, 11, 27)
        },
        {
          role: 'user',
          content: 'What deductions should I consider for next year?',
          timestamp: new Date(2024, 11, 27)
        },
        {
          role: 'assistant',
          content: 'Based on your profile, here are some key deductions to consider...',
          timestamp: new Date(2024, 11, 27)
        }
      ]
    }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { 
      role: 'user' as const, 
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on user input
    const aiResponse = generateAIResponse(input);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        timestamp: new Date()
      }]);
    }, 500);

    setInput('');
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('balance') || input.includes('how much')) {
      return "Based on your current wallets, you have:\n- $500 in Mom and Dad's allowance\n- $600 in AI Personal Savings (locked)";
    }
    
    if (input.includes('saving') || input.includes('save')) {
      return "I notice you have $600 in your AI Personal Savings wallet. That's a great start! I recommend maintaining this locked status to build your emergency fund.";
    }
    
    if (input.includes('spend') || input.includes('transaction')) {
      return "I can help you track your spending patterns. Would you like to see a breakdown of your recent transactions or get advice on budgeting?";
    }

    return "I'm here to help you manage your finances better. You can ask me about your balances, savings, or spending patterns!";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleConversationSelect = (conversation: SavedConversation) => {
    setSelectedConversation(conversation);
    setActiveTab('chat');
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {isPromptVisible && (
        <div className="bg-blue-50/90 dark:bg-blue-900/90 p-3 rounded-lg shadow-lg backdrop-blur-sm max-w-[200px] text-sm animate-fade-in border border-blue-200 dark:border-blue-700">
          Chat with Kaz about your wallet transactions and expenditures! 💬
          <button 
            onClick={() => setIsPromptVisible(false)} 
            className="absolute top-1 right-1 text-xs opacity-50 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Kaz</span>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">Kaz</span>
              <span className="text-sm text-muted-foreground">AI Financial Assistant</span>
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-4">
              <ScrollArea className="h-[400px] w-full pr-4">
                <div className="flex flex-col gap-4">
                  {(selectedConversation ? selectedConversation.messages : messages).map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 dark:bg-blue-900 text-foreground'
                        }`}
                      >
                        {message.content}
                        {message.timestamp && (
                          <div className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                          }`}>
                            {formatDate(message.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSend();
                    }
                  }}
                  className="border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
                />
                <Button 
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Send
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <ScrollArea className="h-[400px] w-full pr-4">
                <div className="flex flex-col gap-2">
                  {savedConversations.map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant="outline"
                      className="flex items-start justify-between p-4 h-auto"
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">{conversation.person}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {conversation.lastMessage}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(conversation.date)}
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}