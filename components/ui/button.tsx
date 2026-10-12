"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingType?: "typing" | "spinner";
  isLink?: boolean;
  path?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size,
      isLoading = false,
      loadingType = "typing",
      disabled,
      type = "button",
      isLink = false,
      path,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex items-center justify-center font-medium text-base rounded transition-all ease-in-out duration-300 hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary: "bg-forest hover:bg-forest/90 text-white",
      secondary: "bg-lime hover:bg-lime/90 text-foreground",
      outline:
        "border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-800 hover:text-forest shadow-2xs",
      ghost: "bg-transparent text-zinc-700 hover:text-forest hover:bg-forest/5",
      danger: "bg-rose-600 hover:bg-rose-700 text-white",
    };

    const sizes = {
      sm: "px-3 py-1 text-sm rounded",
      md: "px-5 py-2 text-base rounded",
      lg: "px-7 py-3 text-lg rounded",
    };

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      size ? sizes[size] : "",
      className
    );

    const content = (
      <>
        {children}
        {isLoading && loadingType === "typing" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 shrink-0",
              children ? "ml-2" : ""
            )}
            aria-label="Loading"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-current animate-typing-dot"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-current animate-typing-dot"
              style={{ animationDelay: "180ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-current animate-typing-dot"
              style={{ animationDelay: "360ms" }}
            />
          </span>
        )}
        {isLoading && loadingType === "spinner" && (
          <svg
            className="animate-spin h-4 w-4 ml-2 text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
      </>
    );

    if (isLink || path) {
      const destination = path || href || "#";
      const isDisabled = disabled || isLoading;

      return (
        <Link
          href={isDisabled ? "#" : destination}
          className={cn(buttonClasses, isDisabled && "pointer-events-none opacity-50")}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
          target={target}
          rel={rel}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            props.onClick?.(e as any);
          }}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

/*
 * --------------------------------------------------------------------------
 * Usage Examples:
 * --------------------------------------------------------------------------
 * 
 * 1. As a regular button (default):
 * <Button variant="primary" onClick={handleClick}>
 *   Submit
 * </Button>
 * 
 * 2. As a Next.js Link:
 * <Button isLink path="/login" variant="ghost" size="sm">
 *   Log In
 * </Button>
 * 
 * // Or directly providing path:
 * <Button path="/register/candidate" variant="secondary">
 *   Get Started
 * </Button>
 * 
 * 3. With loading state (typing dots default):
 * <Button isLoading variant="secondary">
 *   Saving
 * </Button>
 * 
 * 4. With traditional spinner loading state:
 * <Button isLoading loadingType="spinner" variant="primary">
 *   Processing
 * </Button>
 */

