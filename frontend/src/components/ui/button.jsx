import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.14em] text-sm font-medium transition-all duration-150 ease-out150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white hover:bg-brand-hover border border-brand hover:border-brand-hover",
        secondary:
          "border border-ink text-ink bg-transparent hover:bg-ink hover:text-white",
        ghost: "text-ink hover:text-brand",
        dark: "bg-ink text-white border border-ink hover:bg-brand hover:border-brand",
      },
      size: {
        md: "px-6 py-3",
        lg: "px-8 py-4 text-sm",
        sm: "px-4 py-2 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
