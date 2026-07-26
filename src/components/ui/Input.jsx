import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export default function Input({ className, ...props }) {
  return (
    <input
      className={twMerge(
        clsx(
          // 1. Clases base que SIEMPRE tendrá el input
          "border rounded-lg px-3 py-2 w-full bg-gray-50 focus:ring-2 focus:ring-green-500",
          // 2. Aquí inyectamos las clases extras o modificaciones que envíes desde fuera
          className 
        )
      )}
      // 3. El resto de propiedades (type, placeholder, value, onChange) siguen su camino intactas
      {...props}
    />
  );
}