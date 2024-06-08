import styles from './Game.module.css'

import GameOption from '../gameoption/GameOption'
import { useState } from 'react'


function Game () {
    const [gameState,setGameState] = useState(Array(9).fill(0))
    console.log(gameState)

  return (
    <div className={styles.game}>
      <GameOption />
      <GameOption />
      <GameOption />
      <GameOption />
      <GameOption />
      <GameOption />
      <GameOption />
      <GameOption />
      <GameOption />
    </div>
  )
}

export default Game