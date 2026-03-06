// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Send, Bot, User, Sparkles, RotateCcw } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { cn } from "@/lib/utils"

// interface Message {
//   id: string
//   role: "user" | "assistant"
//   content: string
//   timestamp: Date
// }

// const INITIAL_MESSAGES: Message[] = [
//   {
//     id: "1",
//     role: "assistant",
//     content:
//       "Hello! I'm your DevInsight AI assistant. I can help you understand your reports, explain code analysis findings, suggest improvements, or answer questions about best practices. What would you like to know?",
//     timestamp: new Date(),
//   },
// ]

// const SUGGESTED_PROMPTS = [
//   "Explain my latest report findings",
//   "How can I improve my code score?",
//   "What are common security vulnerabilities?",
//   "Best practices for React performance",
// ]

// const MOCK_RESPONSES: Record<string, string> = {
//   default:
//     "Based on your codebase analysis, I can see several areas for improvement. The most impactful changes would be implementing proper memoization patterns, adding error boundaries, and optimizing your bundle size through code splitting. Would you like me to dive deeper into any of these areas?",
//   performance:
//     "For React performance optimization, focus on these key areas:\n\n1. **Memoization**: Use `React.memo()` for components that receive the same props frequently, and `useMemo`/`useCallback` for expensive calculations.\n\n2. **Code Splitting**: Implement dynamic imports with `React.lazy()` and `Suspense` to reduce initial bundle size.\n\n3. **Virtual Lists**: For long lists, use libraries like `react-window` or `react-virtuoso` to only render visible items.\n\n4. **State Management**: Keep state as close to where it's needed as possible. Avoid lifting state unnecessarily.\n\nWould you like specific code examples for any of these?",
//   security:
//     "Common security vulnerabilities in web applications include:\n\n1. **XSS (Cross-Site Scripting)**: Always sanitize user input and use proper encoding when rendering dynamic content.\n\n2. **CSRF (Cross-Site Request Forgery)**: Implement anti-CSRF tokens for state-changing operations.\n\n3. **SQL Injection**: Use parameterized queries and ORMs instead of raw SQL string concatenation.\n\n4. **Dependency Vulnerabilities**: Regularly audit and update your dependencies using `npm audit` or tools like Snyk.\n\n5. **Authentication Flaws**: Use secure session management, implement rate limiting, and enforce strong password policies.\n\nYour latest report flagged 3 potential security concerns. Want me to explain them in detail?",
//   score:
//     "To improve your code health score, I recommend focusing on these high-impact areas:\n\n1. **Fix High Severity Issues First**: Your report shows 2 high-severity findings related to unoptimized renders and large bundle size. Addressing these alone could boost your score by 8-10 points.\n\n2. **Add Missing Tests**: Code coverage is a significant factor. Aim for at least 80% coverage on critical paths.\n\n3. **Resolve Unused Dependencies**: Remove the 3 unused packages flagged in your report to reduce complexity.\n\n4. **Implement Error Handling**: Add error boundaries and proper try-catch patterns throughout the application.\n\nBased on your current score of 87%, these changes could bring you to 95%+.",
// }

// export function ChatBot() {
//   const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
//   const [input, setInput] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [messages, isTyping])

//   const getResponse = (query: string): string => {
//     const q = query.toLowerCase()
//     if (q.includes("performance") || q.includes("optimize") || q.includes("speed") || q.includes("react performance")) {
//       return MOCK_RESPONSES.performance
//     }
//     if (q.includes("security") || q.includes("vulnerab") || q.includes("xss") || q.includes("csrf")) {
//       return MOCK_RESPONSES.security
//     }
//     if (q.includes("score") || q.includes("improve") || q.includes("better")) {
//       return MOCK_RESPONSES.score
//     }
//     return MOCK_RESPONSES.default
//   }

//   const handleSend = async () => {
//     if (!input.trim() || isTyping) return

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: input.trim(),
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     const query = input.trim()
//     setInput("")
//     setIsTyping(true)

//     // Simulate AI response delay
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     const assistantMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       role: "assistant",
//       content: getResponse(query),
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, assistantMessage])
//     setIsTyping(false)
//   }

//   const handleReset = () => {
//     setMessages(INITIAL_MESSAGES)
//   }

//   return (
//     <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
//             <Bot className="size-5 text-primary" />
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
//             <p className="text-xs text-muted-foreground">Powered by DevInsight AI</p>
//           </div>
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-muted-foreground hover:text-foreground"
//           onClick={handleReset}
//         >
//           <RotateCcw className="size-3.5 mr-1.5" />
//           Reset
//         </Button>
//       </div>

//       {/* Messages */}
//       <div
//         ref={scrollRef}
//         className="flex-1 overflow-auto rounded-xl border border-border bg-card p-4"
//       >
//         <div className="flex flex-col gap-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={cn(
//                 "flex gap-3",
//                 message.role === "user" ? "flex-row-reverse" : "flex-row"
//               )}
//             >
//               <div
//                 className={cn(
//                   "flex size-8 shrink-0 items-center justify-center rounded-lg",
//                   message.role === "user" ? "bg-primary/20" : "bg-primary/10"
//                 )}
//               >
//                 {message.role === "user" ? (
//                   <User className="size-4 text-primary" />
//                 ) : (
//                   <Sparkles className="size-4 text-primary" />
//                 )}
//               </div>
//               <div
//                 className={cn(
//                   "rounded-xl px-4 py-3 max-w-[80%]",
//                   message.role === "user"
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-secondary/60 text-foreground"
//                 )}
//               >
//                 <div className="text-sm leading-relaxed whitespace-pre-wrap">
//                   {message.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
//                     if (part.startsWith("**") && part.endsWith("**")) {
//                       return (
//                         <strong key={i} className="font-semibold">
//                           {part.slice(2, -2)}
//                         </strong>
//                       )
//                     }
//                     return part
//                   })}
//                 </div>
//                 <p
//                   className={cn(
//                     "text-[10px] mt-1.5",
//                     message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
//                   )}
//                 >
//                   {message.timestamp.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {isTyping && (
//             <div className="flex gap-3">
//               <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
//                 <Sparkles className="size-4 text-primary" />
//               </div>
//               <div className="rounded-xl bg-secondary/60 px-4 py-3">
//                 <div className="flex items-center gap-1">
//                   <span className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
//                   <span className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
//                   <span className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Suggested prompts */}
//       {messages.length <= 1 && (
//         <div className="flex flex-wrap gap-2 mt-3">
//           {SUGGESTED_PROMPTS.map((prompt) => (
//             <button
//               key={prompt}
//               onClick={() => {
//                 setInput(prompt)
//                 inputRef.current?.focus()
//               }}
//               className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
//             >
//               {prompt}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Input */}
//       <div className="flex items-center gap-2 mt-3">
//         <Input
//           ref={inputRef}
//           placeholder="Ask about your code analysis..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault()
//               handleSend()
//             }
//           }}
//           disabled={isTyping}
//           className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
//         />
//         <Button
//           size="icon"
//           className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 size-10"
//           onClick={handleSend}
//           disabled={!input.trim() || isTyping}
//         >
//           <Send className="size-4" />
//           <span className="sr-only">Send message</span>
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your DevInsight AI assistant. I can help you understand your reports and improve your code.",
    timestamp: new Date(),
  },
]

export default function ChatbotPage() {

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a demo AI response from DevInsightAI.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

    }, 1200)
  }

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">

          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Bot className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">
              Powered by DevInsightAI
            </p>
          </div>

        </div>

        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="size-4 mr-1" />
          Reset
        </Button>

      </div>

      {/* Messages */}

      <div
        ref={scrollRef}
        className="flex-1 overflow-auto rounded-xl border p-4"
      >

        {messages.map((message) => (

          <div
            key={message.id}
            className={`flex mb-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >

            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {message.content}
            </div>

          </div>

        ))}

        {isTyping && (
          <div className="text-sm text-muted-foreground">
            AI is typing...
          </div>
        )}

      </div>

      {/* Input */}

      <div className="flex gap-2 mt-3">

        <Input
          placeholder="Ask about your code..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={handleSend}>
          <Send className="size-4" />
        </Button>

      </div>

    </div>
  )
}