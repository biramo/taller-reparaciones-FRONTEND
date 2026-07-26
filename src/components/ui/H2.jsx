import { twMerge } from "tailwind-merge"
import { clsx } from "clsx";

export default function H3({className,...props}){

    return(
        <h2
          className={twMerge(
            clsx("bg-emerald-100 text-center p-2 rounded-sm font-bold text-gray-600 text-xl",
                className
            )
        )}
        {...props}
        />
    )
    
}