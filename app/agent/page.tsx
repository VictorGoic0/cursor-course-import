"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function AgentChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setIsLoading(true);
    
    // Mock AI response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          role: "ai",
          content: `I understand you said "${userMsg.content}". How can I help you with that?`,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
    }, 1000);
    
    scrollToBottom();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
          <Link
            href="/cmdk"
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
              <p className="text-sm text-gray-400">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Welcome to AI Assistant</h2>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    I&apos;m here to help you with any questions, tasks, or just to chat. What would you like to know?
                  </p>
                </div>
              )}
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex flex-col max-w-[80%]">
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-gray-800 text-gray-100 border border-gray-700"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    <span className={`text-xs text-gray-500 mt-1 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl px-4 py-3 shadow-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm p-4">
          <form
            className="flex gap-3 max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              disabled={isLoading}
              autoFocus
              autoComplete="off"
              aria-label="Type your message"
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
