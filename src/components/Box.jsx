import "./Box.css"

export default function Box({children, movement, index}){
    return (
        <div className="box" onClick={()=>{movement(index)}}>
            {children}
        </div>
    )
}