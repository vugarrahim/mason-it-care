import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex w-full rounded-none border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 font-sans focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-150",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
