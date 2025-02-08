import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label}
      </label>
      <input
        className="w-full px-3 py-2 text-foreground bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label}
      </label>
      <textarea
        className="w-full px-3 py-2 text-foreground bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
};
