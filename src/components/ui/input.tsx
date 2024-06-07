import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 dark:text-white text-zinc-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const HiddenInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isHidden, setIsHidden] = React.useState(true);

    return (
      <div className="flex w-full items-center space-x-1">
        <input
          type={isHidden ? "password" : "text"}
          className={cn(
            "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 dark:text-white text-zinc-900",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          className="p-2 bg-white dark:bg-zinc-950 rounded-lg text-black dark:text-white"
          onMouseDown={() => setIsHidden(!isHidden)}
          type="button"
        >
          {isHidden ? (
            <EyeIcon className="h-6" />
          ) : (
            <EyeSlashIcon className="h-6" />
          )}
        </button>
      </div>
    );
  }
);
HiddenInput.displayName = "Input";

export { Input, HiddenInput };
