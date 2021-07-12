import './style.css'

export default function InfoItem({statName, children}) {
  return (
    <div className='info-item-container'>
      <div className='stat-name'>{statName}:</div>
      <div className='data'>{children}</div>
    </div>
  )
}