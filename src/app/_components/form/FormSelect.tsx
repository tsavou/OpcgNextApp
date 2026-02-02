import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        <label className="text-[10px] uppercase font-bold text-slate-500">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm outline-none transition-colors appearance-none cursor-pointer",
              "focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-2.5 pointer-events-none opacity-50">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";