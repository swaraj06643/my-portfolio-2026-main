"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-foreground/[0.08] bg-background/50 px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.03)] backdrop-blur-md transition-all duration-300 placeholder:text-muted-foreground focus:border-foreground/15 focus:bg-background/70 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:shadow-[0_0_0_2px_hsl(var(--background)),0_0_0_4px_hsl(var(--foreground)/0.1),inset_0_1px_0_0_hsl(var(--foreground)/0.05)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
