
import * as React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const location = useLocation();
    const isFinderPage = location.pathname === '/finder';
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-none bg-[#90b5cd] px-3 py-2 text-[#2977b7] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#f7f4e3] focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        style={isFinderPage ? {
          fontSize: props.value ? '16pt' : '14pt',
          fontWeight: props.value ? 300 : 300,
        } : undefined}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
