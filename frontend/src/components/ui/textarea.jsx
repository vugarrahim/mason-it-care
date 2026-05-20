import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full min-h-[120px] rounded-none border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 font-sans resize-y focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-150",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
