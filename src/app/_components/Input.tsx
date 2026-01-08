import { ComponentProps, useId } from "react";

interface Props extends ComponentProps<"input"> {
 label: string;
 error: string | undefined;
}

export function Input({
 label,
 error,
 type = "text",
 ...otherInputProps
}: Props) {
 const inputId = useId();

 return (
  <div className="flex flex-col">
   <label className="text-sm font-medium" htmlFor={inputId}>{label}</label>
   <input className="border border-gray-300 rounded-md" id={inputId} type={type} {...otherInputProps} />
   <p className="text-sm text-red-600">{error}</p>
  </div>
 );
}
 