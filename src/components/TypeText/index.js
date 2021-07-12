import './style.css'

export default function TypeText({children}) {
  return(
    <div className="type-text-container">
      <div className="type-text">{children}</div>
    </div>
  )
}