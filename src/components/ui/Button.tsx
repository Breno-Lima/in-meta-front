import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `btn btn-${variant}`;
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${widthClass} ${className}`;

  return (
    <button 
      className={classes} 
      disabled={isLoading || disabled} 
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
          <span>Carregando...</span>
        </div>
      ) : children}
    </button>
  );
}
