import { useState } from "react"

export default function Container({children}){
    const [isOpen,setIsOpen] = useState(true)

    return <div className="movie-details">
        <button className="btn" onClick={()=>setIsOpen(open=>!open)}>{isOpen? "-" : "+"}</button>
        {isOpen && children}
    </div>
}