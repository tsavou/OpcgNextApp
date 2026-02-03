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
      <div className="w-full space-y-1.5">
        <label className="text-[10px] font-bold text-slate-500 uppercase">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm transition-colors outline-none placeholder:text-slate-600",
              "focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20",
              suffix ? "pr-8" : "",
              error && "border-red-500 focus:border-red-500",
              className,
            )}
            {...props}
          />
          {suffix && (
            <span className="pointer-events-none absolute top-2.5 right-3 text-sm text-slate-500">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
FormInput.displayName = "FormInput";
