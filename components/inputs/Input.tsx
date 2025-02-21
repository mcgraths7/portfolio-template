"use client";

import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const ValidationText = styled.p<{ error?: string }>`
  color: var(--color-invalid);
  visibility: ${({ error }) => (error ? "visible" : "invisible")};
`;

const InputField = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  &:focus {
    border-color: var(--color-primary);
  }
`;

const TextareaField = styled.textarea`
  width: 100%;
  height: 9rem;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  &:focus {
    border-color: var(--color-primary);
  }
`;

const Label = styled.label`
  position: absolute;
  left: var(--space-3);
  top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-foreground);
  transition: all 0.3s;
  ${InputField}:placeholder-shown + &,
  ${TextareaField}:placeholder-shown + & {
    top: var(--space-4);
    font-size: var(--text-sm);
  }
  ${InputField}:focus + &,
  ${TextareaField}:focus + &,
  ${InputField}:valid + &,
  ${TextareaField}:valid + & {
    top: 0;
    font-size: var(--text-xs);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: var(--space-2);
`;

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      <InputField placeholder=" " {...props} />
      <Label htmlFor={props.id}>{label}</Label>
      <ValidationText error={error}>{error || "Placeholder"}</ValidationText>
    </InputWrapper>
  );
};

const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      <TextareaField placeholder=" " {...props} />
      <Label htmlFor={props.id}>{label}</Label>
      <ValidationText error={error}>{error || "Placeholder"}</ValidationText>
    </InputWrapper>
  );
};

export { Input, Textarea, ValidationText };
