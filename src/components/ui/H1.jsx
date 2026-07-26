import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export default function H1({ children, className, ...props }) {
  return (
    <h1
      className={twMerge(
        clsx(
          "font-poppins text-3xl md:text-4xl font-extrabold tracking-tight",
          "text-gray-900",
          "text-center mb-4 animate-fade-in<<-.",
          className
        )
      )}
      {...props}
    >
      {children}
    </h1>
  );
}