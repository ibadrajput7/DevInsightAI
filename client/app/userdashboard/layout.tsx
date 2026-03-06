// "use client"

// import { useState } from "react"
// import { DashboardSidebar } from "@/components/dashbaord/sidebar"
// import { DashboardHeader } from "@/components/dashbaord/header"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {

//   const [isOpen, setIsOpen] = useState(true)
//   const [activeSection, setActiveSection] = useState("home")

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   const handleNavigate = (section: string) => {
//     setActiveSection(section)
//   }

//   return (
//     <div className="flex h-screen bg-background">

//       <DashboardSidebar
//         isOpen={isOpen}
//         onToggle={toggleSidebar}
//         activeSection={activeSection}
//         onNavigate={handleNavigate}
//       />

//       <div className="flex flex-col flex-1">

//         <DashboardHeader
//           onToggleSidebar={toggleSidebar}
//           activeSection={activeSection}
//         />

//         <main className="p-6">
//           {children}
//         </main>

//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashbaord/sidebar"
import { DashboardHeader } from "@/components/dashbaord/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex h-screen bg-background">

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <DashboardHeader
          activeSection="" // optional: ab Sidebar usePathname handle karta hai header title ke liye
          onToggleSidebar={toggleSidebar}
        />

        <main className="p-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  )
}