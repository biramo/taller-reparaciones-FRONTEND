export default function InfoRow({title,value}){
    return(
         <div>
            <h4 className="font-bold text-lg">{title}</h4>
            <span className="text-gray-700">{value}</span>
        </div>
    )
}