"use client";

import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BaseButton = styled.button`
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 700;
  @media (min-width: 768px) {
    width: auto;
  }
  box-shadow: var(--box-shadow-color) 0px 4px 6px -1px, var(--box-shadow-color) 0px 2px 4px -1px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: var(--box-shadow-color) 0px 10px 15px -3px, var(--box-shadow-color) 0px 4px 6px -2px;
    transform: translateY(-0.125rem);
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: hsl(var(--color-primary));
  color: white;
`;

const SecondaryButton = styled(BaseButton)`
  border: 1px solid hsl(var(--color-primary));
  color: hsl(var(--color-primary));
  background-color: transparent;
  &:hover {
    background-color: hsl(var(--color-primary));
    color: white;
  }
`;

export const ButtonPrimary: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <PrimaryButton {...props}>{children}</PrimaryButton>;
};

export const ButtonSecondary: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <SecondaryButton {...props}>{children}</SecondaryButton>;
};