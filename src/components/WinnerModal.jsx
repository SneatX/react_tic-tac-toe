import '../css/WinnerModal.css'

export function WinnerModal({winner, resetGame}) {

  if(!winner) return

  let title = winner != '=' ? 'Winner' : 'Draw'


  return (
    <section className='winner-background'>
      <div className='winner-player'>
        <h1>{title}!!</h1>
        <span>{winner}</span>
      </div>
      <div className='tryAgain-section'>
        <button onClick={()=>{resetGame()}}>Try again</button>
      </div>
    </section>
  )
}

