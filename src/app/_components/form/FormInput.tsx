import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, suffix, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        <label className="text-[10px] uppercase font-bold text-slate-500">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm outline-none transition-colors placeholder:text-slate-600",
              "focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20",
              suffix ? "pr-8" : "",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-2.5 text-slate-500 text-sm pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";