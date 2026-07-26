import Input from './Input'

export default function SearchBar({value,onChange,placeholder}){
    return(
        <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className=" w-1/2
            text-center
            min-w-40
            bor ded hover:rounded mx-auto"
        />

    )
}