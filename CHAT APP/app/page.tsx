"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Mic, Paperclip, MoreVertical, Search, ArrowLeft, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeSwitcher } from "@/components/theme-switcher"

type Message = {
  id: string
  text: string
  sender: "user" | "contact"
  timestamp: Date
  status: "sent" | "delivered" | "read"
}

type Contact = {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

export default function NeonChatApp() {
  const [currentView, setCurrentView] = useState<"chats" | "conversation">("chats")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Alex Morgan",
      lastMessage: "Hey! How are you doing?",
      timestamp: "10:30 AM",
      unread: 2,
      online: true,
    },
    { id: "2", name: "Sam Rivera", lastMessage: "See you tomorrow!", timestamp: "9:15 AM", unread: 0, online: false },
    {
      id: "3",
      name: "Jordan Lee",
      lastMessage: "Thanks for your help 😊",
      timestamp: "Yesterday",
      unread: 1,
      online: true,
    },
    {
      id: "4",
      name: "Casey Taylor",
      lastMessage: "Did you check the file?",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Morgan Blake",
      lastMessage: "Perfect! Let's do it",
      timestamp: "Tuesday",
      unread: 0,
      online: true,
    },
  ]

  useEffect(() => {
    if (selectedContact) {
      // Sample messages for the selected contact
      setMessages([
        {
          id: "1",
          text: "Hey! How are you?",
          sender: "contact",
          timestamp: new Date(Date.now() - 3600000),
          status: "read",
        },
        {
          id: "2",
          text: "I'm good! Just working on a new project",
          sender: "user",
          timestamp: new Date(Date.now() - 3500000),
          status: "read",
        },
        {
          id: "3",
          text: "That's awesome! What kind of project?",
          sender: "contact",
          timestamp: new Date(Date.now() - 3400000),
          status: "read",
        },
        {
          id: "4",
          text: "A messaging app with a neon theme",
          sender: "user",
          timestamp: new Date(Date.now() - 3300000),
          status: "delivered",
        },
        {
          id: "5",
          text: "Wow! Sounds really cool 🔥",
          sender: "contact",
          timestamp: new Date(Date.now() - 3200000),
          status: "read",
        },
      ])
    }
  }, [selectedContact])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
        status: "sent",
      }
      setMessages([...messages, newMessage])
      setInputMessage("")

      // Simulate contact response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "That's interesting! Tell me more 😊",
          sender: "contact",
          timestamp: new Date(),
          status: "sent",
        }
        setMessages((prev) => [...prev, response])
      }, 1500)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  }

  const openChat = (contact: Contact) => {
    setSelectedContact(contact)
    setCurrentView("conversation")
  }

  const backToChats = () => {
    setCurrentView("chats")
    setSelectedContact(null)
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Chats List View */}
      {currentView === "chats" && (
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-neon-pink">❤️K&V❤️</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80">
                <Search className="h-5 w-5" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Chats List */}
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border/50">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => openChat(contact)}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-card/50 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-primary/30">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent rounded-full border-2 border-background neon-glow-green" />
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{contact.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>

                  {contact.unread > 0 && (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center neon-glow-pink">
                      <span className="text-xs font-bold text-primary-foreground">{contact.unread}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Conversation View */}
      {currentView === "conversation" && selectedContact && (
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={backToChats}
              className="text-neon-cyan hover:text-neon-cyan/80 -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold text-sm">
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {selectedContact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background neon-glow-green" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground truncate">{selectedContact.name}</h2>
              <p className="text-xs text-neon-green">{selectedContact.online ? "Online" : "Offline"}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80">
                <Search className="h-5 w-5" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-background to-background/95"
          >
            {messages.map((message) => (
              <div key={message.id} className={flex ${message.sender === "user" ? "justify-end" : "justify-start"}}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary/90 text-primary-foreground neon-glow-pink"
                      : "bg-card border border-border/50 text-card-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.text}</p>
                  <div
                    className={flex items-center gap-1 mt-1 ${message.sender === "user" ? "justify-end" : "justify-start"}}
                  >
                    <span
                      className={text-xs ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === "user" && (
                      <span className="text-primary-foreground/70">
                        {message.status === "read" ? (
                          <CheckCheck className="h-3.5 w-3.5 text-neon-cyan" />
                        ) : message.status === "delivered" ? (
                          <CheckCheck className="h-3.5 w-3.5" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80 flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>

              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground pr-12 rounded-full focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {inputMessage.trim() ? (
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-pink flex-shrink-0 rounded-full"
                >
                  <Send className="h-5 w-5" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80 flex-shrink-0">
                  <Mic className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}