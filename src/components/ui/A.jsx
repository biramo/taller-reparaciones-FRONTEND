import { twMerge } from "tailwind-merge"
import { clsx } from "clsx";

export default function A({className, ...props}){

    return (
        <a
            className={twMerge(
            clsx("border bg-emerald-900 text-white p-2 rounded-3xl text-center hover:bg-emerald-700",
                className
            )
        )}
        {...props}
        />

    
    )
}