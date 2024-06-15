import styles from './Game.module.css'

import GameOption from '../gameoption/GameOption'
import GameInfo from '../gameinfo/GameInfo'
import Score from '../../score/Score'

import { useState, useEffect } from 'react'



const winnerTable = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6], 
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function Game () {
    const [gameState,setGameState] = useState(Array(9).fill(0))
    const [currentPlayer,setCurrentPlayer] = useState(-1)
    const [winner, setWinner] = useState(0)
    const [winnerLine,setWinnerLine] = useState([])
    const [draw,setDraw] = useState(false)
    const [winnerCircle,setWinnerCircle] = useState(0)
    const [winnerX,setWinnerX] = useState(0)
    const [yellowDraw, setYellowDraw] = useState(0)
    const [redWinner,setRedWinner] = useState(false)
    const [blueWinner,setBlueWinner] = useState(false)
    



    const handleClick = (pos) => {
      if (gameState[pos] === 0 && winner === 0){
      let newGameState = [...gameState]
      newGameState [pos] = currentPlayer
      setGameState(newGameState)
      }
    } 


    const verifyGame = () => {
      winnerTable.forEach((line) => { 
        const value = line.map((value) =>  gameState[value])
        const sum = value.reduce((sum, value) => sum + value)
        if (sum === 3 || sum === -3) {
          setWinner(sum/3)
          setWinnerLine(line)
          if(sum === 3){
            setWinnerCircle(winnerCircle + 1) 
            setBlueWinner(true)
          }else if (sum === -3){
            setWinnerX(winnerX + 1)
            setRedWinner(true)
          }
        } 
      }) 
    }

    const handleReset = () => {
      setGameState(Array(9).fill(0)) 
      setWinner(0)
      setWinnerLine([])
      setDraw(false)
      setBlueWinner(false)
      setRedWinner(false)
    }

    const resetScore = () => {
      setWinnerCircle(0)
      setWinnerX(0)
      setYellowDraw(0)
    }

    const verifyDraw = () => {
      if (gameState.find((value)=> value === 0 ) === undefined && winner === 0){
        setDraw(true)
        setYellowDraw(yellowDraw + 1)
      }
    }


    const verifyWinnerLine = (pos) =>  winnerLine.find((value) => value === pos) !== undefined 
    
   
    useEffect(() => {
      setCurrentPlayer(currentPlayer * -1)
      verifyGame()
      verifyDraw()
    }, [gameState])

   useEffect (() => {
    if (winner !== 0) setDraw(false)
   }, [winner]) 



  return (
   <> 
      <div className={styles.gameContent}>
        <div className={styles.game}>
        {
          gameState.map((value,pos) => 
            <GameOption
              key={`game-option-pos${pos}`}
              status = {value}
              onClick={() => handleClick(pos)}
              isWinner = {verifyWinnerLine(pos)}
              winnerX={redWinner}
              winnerCircle = {blueWinner}
              isDraw = {draw}
          />
          )
        }
  
      </div>
      <GameInfo 
        currentPlayer = {currentPlayer}
        winner = {winner}
        onReset = {handleReset}
        isDraw = {draw}
      />
      
    </div>
    <Score
      className = {styles.score}
      winnerCircle = {winnerCircle}
      winnerX = {winnerX}
      yellowDraw = {yellowDraw}
      resetScore = {resetScore}
     />
  </>  
  )
}

export default Game