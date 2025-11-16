import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const sizeMap = {
  sm: 'padding:6px 12px; font-size:12px; border-radius: var(--radius-sm);',
  md: 'padding:10px 18px; font-size:14px; border-radius: var(--radius-md);',
  lg: 'padding:14px 24px; font-size:16px; border-radius: var(--radius-lg);'
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  style,
  className,
  ...rest
}) => {
  const base = 'display:inline-flex; align-items:center; justify-content:center; gap:8px; font-weight:500; letter-spacing:.3px; cursor:pointer; transition:var(--transition);';
  const solid = 'background:var(--color-accent); color:#fff; border:1px solid var(--color-accent);';
  const outline = 'background:transparent; color:var(--color-text); border:1px solid var(--color-border);';
  const ghost = 'background:transparent; color:var(--color-muted); border:1px solid transparent;';
  const disabledStyle = 'opacity:.5; pointer-events:none;';

  const variantStyle = variant === 'solid' ? solid : variant === 'outline' ? outline : ghost;
  const computed = `${base} ${variantStyle} ${sizeMap[size]} ${disabled || loading ? disabledStyle : ''}`;

  return (
    <button
      className={clsx(className)}
      style={{ ...style, boxShadow:'var(--shadow-sm)', ...(variant==='solid'?{ }:{}) }}
      disabled={disabled || loading}
      {...rest}
    >
      {leftIcon && <span style={{ display:'inline-flex' }}>{leftIcon}</span>}
      <span>{loading ? '...' : children}</span>
      {rightIcon && <span style={{ display:'inline-flex' }}>{rightIcon}</span>}
      <style>{`.${className||''}`}</style>
    </button>
  );
};

export default Button;
