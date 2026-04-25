import { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-[var(--sand-300)] bg-white p-5 shadow-[0_12px_24px_-16px_rgba(35,48,34,0.38)] ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
