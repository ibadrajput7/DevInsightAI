// export function TechTicker() {
//   const items = [
//     "NEXT.JS",
//     "REACT",
//     "TYPESCRIPT",
//     "PYTHON",
//     "GO",
//     "RUST",
//     "JAVA",
//     "DJANGO",
//     "RAILS",
//     "EXPRESS",
//     "FASTAPI",
//     "SPRING BOOT",
//     "LARAVEL",
//     "FLASK",
//     "VUE",
//     "ANGULAR",
//     "SVELTE",
//   ]

//   return (
//     <div className="overflow-hidden border-b border-border bg-card py-4">
//       <div className="animate-ticker flex whitespace-nowrap">
//         {[...items, ...items].map((item, i) => (
//           <span key={i} className="mx-6 font-mono text-xs tracking-widest text-muted-foreground">
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import {
  // Core Languages
  SiPython,
  SiJavascript,
  SiTypescript,
  // SiJava,
  SiCplusplus,
  SiGo,

  // Python Ecosystem
  SiFastapi,
  SiDjango,
  SiFlask,

  // JavaScript Ecosystem
  SiNextdotjs,
  SiReact,
  SiAngular,
  SiVuedotjs,

  // TypeScript Ecosystem
  SiNestjs,

  // Java Ecosystem
  SiSpringboot,
} from "react-icons/si"

export function TechTicker() {
  const items = [
    // Core Languages
    SiPython,
    SiJavascript,
    SiTypescript,
    // SiJava,
    SiCplusplus,
    SiGo,

    // Python Stack
    SiFastapi,
    SiDjango,
    SiFlask,

    // JavaScript Stack
    SiNextdotjs,
    SiReact,
    SiAngular,
    SiVuedotjs,

    // TypeScript Stack
    SiNestjs,

    // Java Stack
    SiSpringboot,
  ]

  return (
    
    <div className="overflow-hidden border-b border-border bg-card py-6">
      <div className="animate-ticker flex whitespace-nowrap items-center">
        {[...items, ...items].map((Icon, i) => (
          <span
            key={i}
            className="mx-10 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
          >
            <Icon size={34} />
          </span>
        ))}
      </div>
    </div>
  )
}