interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const ButtonPrimary: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        cta-button
        w-full md:w-auto
        shadow-md hover:shadow-lg
        transform hover:-translate-y-0.5
        transition duration-300 ease-in-out
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export const ButtonSecondary: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        cta-button-secondary
        w-full md:w-auto
        shadow-md hover:shadow-lg
        transform hover:-translate-y-0.5
        transition duration-300 ease-in-out
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>
  )
}