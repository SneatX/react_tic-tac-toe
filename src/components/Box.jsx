import "../css/Box.css"

export function Box({children, movement, index}){
    return (
        <div className="box" onClick={()=>{movement(index)}}>
            {children}
        </div>
    )
}