import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const ValidationText: React.FC<{ error?: string }> = ({ error }) => (
  <p className={`text-invalid ${error ? 'visible' : 'invisible'}`}>
    {error || 'Placeholder'}
  </p>
);

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="relative mb-2">
      <input
        className="input-field peer h-14"
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={props.id}
        className="absolute left-3 top-4 text-sm text-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs"
      >
        {label}
      </label>
      <ValidationText error={error} />
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => {
  return (
    <div className="relative mb-2">
      <textarea
        className="input-field peer h-36 pt-4"
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={props.id}
        className="absolute left-3 top-4 text-sm text-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs"
      >
        {label}
      </label>
      <ValidationText error={error} />
    </div>
  );
};
