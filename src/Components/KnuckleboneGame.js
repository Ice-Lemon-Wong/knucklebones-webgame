import React, { useEffect, useState } from 'react'
import Grid from './Grid.js'
import GameBoard from './GameBoard.js'
import useKnuckleBone from '../Hooks/useKnuckleBone.js'
import { gameState } from '../Constants/gameConstants'

const KnuckleboneGame = () => {
  const {
    placeDice,
    generateDice,
    initGame,
    setPhaseExternal,
    playerDice,
    opponentDice,
    playerGrid,
    opponentGrid,
    playerScore,
    opponentScore,
    playerTotalScore,
    opponentTotalScore,
    nextPhase,
    turn,
    currentGameState
  } =  useKnuckleBone()

  useEffect(() =>{
    //will remove later
    if (currentGameState === gameState.running) {
      //console.log('setting phase externally to ', nextPhase)
      setPhaseExternal(nextPhase)
    }  
    
    if (currentGameState !== gameState.running) {
      initGame()
    }
  }, [nextPhase])

  useEffect(() =>{
   console.log('results',currentGameState )
  }, [currentGameState])

  /* useEffect(() =>{
    
   
  }, [nextPhase]) */


  return (
    <div className="container">
      <h1  className="text-center">KnuckleboneGame</h1>
      <div>
        <GameBoard isPlayer={false} generatedDice={opponentDice} gridData={opponentGrid} placeDice={placeDice} score={opponentScore} totalScore={opponentTotalScore}/>
        <h2 className="text-center">---   VS   ---</h2>
        <GameBoard isPlayer={true} generatedDice={playerDice} gridData={playerGrid} placeDice={placeDice} score={playerScore} totalScore={playerTotalScore}/>
      </div>
    </div>
  )
}

export default KnuckleboneGame
