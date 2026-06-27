import { twMerge } from "tailwind-merge"
import { clsx } from "clsx";

export default function Button({ className, ...props }) {    return(
        <button
        className={twMerge(
            clsx("border border-green-300 px-5 py-2 rounded-lg",
                 "bg-emerald-100 cursor-pointer hover:bg-emerald-200",
                 "focus:outline-none focus:ring-2 focus:ring-green-500", 
                 "font-medium text-green-800 transition-colors",
                className
            )
        )}
        {...props}
        />
    )
}