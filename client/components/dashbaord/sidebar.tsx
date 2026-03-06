// "use client"

// import {
//   LayoutDashboard,
//   FileText,
//   PlusCircle,
//   MessageSquare,
//   Settings,
//   ChevronLeft,
//   Zap,
//   LogOut,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

// interface SidebarProps {
//   activeSection: string
//   onNavigate: (section: string) => void
//   isOpen: boolean
//   onToggle: () => void
// }

// const NAV_ITEMS = [
//   { id: "overview", label: "Overview", icon: LayoutDashboard },
//   { id: "generate", label: "Generate Report", icon: PlusCircle },
//   { id: "reports", label: "My Reports", icon: FileText },
//   { id: "chatbot", label: "AI Assistant", icon: MessageSquare },
// ]

// const BOTTOM_ITEMS = [
//   { id: "settings", label: "Settings", icon: Settings },
// ]

// export function DashboardSidebar({ activeSection, onNavigate, isOpen, onToggle }: SidebarProps) {
//   return (
//     <TooltipProvider delayDuration={0}>
//       <aside
//         className={cn(
//           "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out shrink-0",
//           isOpen ? "w-64" : "w-16"
//         )}
//       >
//         {/* Logo */}
//         <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
//           <div className="flex items-center gap-3 min-w-0">
//             <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
//               <Zap className="size-4 text-primary" />
//             </div>
//             {isOpen && (
//               <div className="flex flex-col min-w-0">
//                 <span className="text-sm font-semibold text-sidebar-foreground truncate">DevInsight</span>
//                 <span className="text-xs text-muted-foreground truncate">Code Intelligence</span>
//               </div>
//             )}
//           </div>
//           {isOpen && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="ml-auto size-7 text-muted-foreground hover:text-sidebar-foreground"
//               onClick={onToggle}
//             >
//               <ChevronLeft className="size-4" />
//               <span className="sr-only">Collapse sidebar</span>
//             </Button>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-3 flex flex-col gap-1">
//           {NAV_ITEMS.map((item) => {
//             const isActive = activeSection === item.id || (item.id === "reports" && activeSection === "view-report")
//             const button = (
//               <button
//                 key={item.id}
//                 onClick={() => onNavigate(item.id)}
//                 className={cn(
//                   "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full",
//                   isActive
//                     ? "bg-primary/10 text-primary"
//                     : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                 )}
//               >
//                 <item.icon className="size-4 shrink-0" />
//                 {isOpen && <span className="truncate">{item.label}</span>}
//               </button>
//             )

//             if (!isOpen) {
//               return (
//                 <Tooltip key={item.id}>
//                   <TooltipTrigger asChild>{button}</TooltipTrigger>
//                   <TooltipContent side="right">{item.label}</TooltipContent>
//                 </Tooltip>
//               )
//             }

//             return button
//           })}
//         </nav>

//         {/* Bottom section */}
//         <div className="p-3 flex flex-col gap-1">
//           <Separator className="mb-2 bg-sidebar-border" />
//           {BOTTOM_ITEMS.map((item) => {
//             const isActive = activeSection === item.id
//             const button = (
//               <button
//                 key={item.id}
//                 onClick={() => onNavigate(item.id)}
//                 className={cn(
//                   "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full",
//                   isActive
//                     ? "bg-primary/10 text-primary"
//                     : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                 )}
//               >
//                 <item.icon className="size-4 shrink-0" />
//                 {isOpen && <span className="truncate">{item.label}</span>}
//               </button>
//             )

//             if (!isOpen) {
//               return (
//                 <Tooltip key={item.id}>
//                   <TooltipTrigger asChild>{button}</TooltipTrigger>
//                   <TooltipContent side="right">{item.label}</TooltipContent>
//                 </Tooltip>
//               )
//             }

//             return button
//           })}

//           {/* User section */}
//           <div className={cn(
//             "flex items-center gap-3 rounded-lg px-3 py-2.5 mt-1",
//             isOpen ? "" : "justify-center"
//           )}>
//             <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
//               <span className="text-xs font-semibold text-primary">JD</span>
//             </div>
//             {isOpen && (
//               <div className="flex flex-col min-w-0 flex-1">
//                 <span className="text-sm font-medium text-sidebar-foreground truncate">John Doe</span>
//                 <span className="text-xs text-muted-foreground truncate">john@devinsight.ai</span>
//               </div>
//             )}
//             {isOpen && (
//               <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-sidebar-foreground shrink-0">
//                 <LogOut className="size-3.5" />
//                 <span className="sr-only">Sign out</span>
//               </Button>
//             )}
//           </div>
//         </div>
//       </aside>
//     </TooltipProvider>
//   )
// }


"use client"

import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  MessageSquare,
  Settings,
  ChevronLeft,
  Zap,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const NAV_ITEMS = [
  { href: "/userdashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/userdashboard/generate-report", label: "Generate Report", icon: PlusCircle },
  { href: "/userdashboard/my-report", label: "My Reports", icon: FileText },
  { href: "/userdashboard/chatbot", label: "AI Assistant", icon: MessageSquare },
]

const BOTTOM_ITEMS = [
  { href: "/userdashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardSidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname() // current route

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out shrink-0",
          isOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="size-4 text-primary" />
            </div>
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-sidebar-foreground truncate">DevInsight</span>
                <span className="text-xs text-muted-foreground truncate">Code Intelligence</span>
              </div>
            )}
          </div>
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto size-7 text-muted-foreground hover:text-sidebar-foreground"
              onClick={onToggle}
            >
              <ChevronLeft className="size-4" />
              <span className="sr-only">Collapse sidebar</span>
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Link>
            )

            if (!isOpen) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return link
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 flex flex-col gap-1">
          <Separator className="mb-2 bg-sidebar-border" />
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname === item.href
            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Link>
            )

            if (!isOpen) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return link
          })}

          {/* User section */}
          <div className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 mt-1",
            isOpen ? "" : "justify-center"
          )}>
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary">JD</span>
            </div>
            {isOpen && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-sidebar-foreground truncate">John Doe</span>
                <span className="text-xs text-muted-foreground truncate">john@devinsight.ai</span>
              </div>
            )}
            {isOpen && (
              <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-sidebar-foreground shrink-0">
                <LogOut className="size-3.5" />
                <span className="sr-only">Sign out</span>
              </Button>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}