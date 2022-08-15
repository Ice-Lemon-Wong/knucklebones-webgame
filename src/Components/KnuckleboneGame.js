import React, { useEffect, useState } from 'react'
import Grid from './Grid.js'
import GameBoard from './GameBoard.js'
import useKnuckleBone from '../Hooks/useKnuckleBone.js'
import { gameState, turnPhase } from '../Constants/gameConstants'
import ResultModal from './ResultModal.js'

const KnuckleboneGame = () => {
  const {
    placeDice,
    initGame,
    setPhaseExternal,
    endGame,
    playerDice,
    opponentDice,
    playerGrid,
    opponentGrid,
    playerScore,
    opponentScore,
    playerTotalScore,
    opponentTotalScore,
    currentPhase,
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
  }, [nextPhase])

  const startGame = () => {
    if (currentGameState !== gameState.running) {
      initGame()
    }
  } 

  const closeGame = () => {
    if (currentGameState !== gameState.running) {
      endGame()
    }
  } 

  useEffect(() =>{
   console.log('results',currentGameState )
  }, [currentGameState])

  const getPhaseText = () =>  {
    switch (currentPhase){
      case turnPhase.playerRoll:
          return 'Rolling player dice'
      case turnPhase.playerInput:
          return 'Place your dice'
      case turnPhase.playerEffect:
          return 'Triggering dice effect'
      case turnPhase.opponentRoll:
          return 'Rolling opponent dice'
      case turnPhase.opponentInput:
          return 'Opponent is placing dice'
      case turnPhase.opponentEffect:
          return 'Triggering dice effect'
      case turnPhase.checkGameCondition:
          return 'Calculating score'
      default:
        return 'VS'
    }
  }

  return (
    <>
      { currentGameState !== gameState.unInitialized && (
        <div className="container">
        {/* <h1  className="text-center">Knuckke Bones</h1> */}
       
        <div>
          
          <GameBoard isPlayer={false} generatedDice={opponentDice} gridData={opponentGrid} placeDice={placeDice} score={opponentScore} totalScore={opponentTotalScore}/>
          <div className="text-center">
            <p className="text-center d-inline-block ">{`Turn: ${turn}`}</p>
            <h4 className="text-center">---   {getPhaseText()}   ---</h4>
          </div>
          
          <GameBoard isPlayer={true} generatedDice={playerDice} gridData={playerGrid} placeDice={placeDice} score={playerScore} totalScore={playerTotalScore}/>
        </div>
      </div>
      )}

      { currentGameState === gameState.unInitialized && (
        <div className="titlescreen align-items-center justify-content-center">
          <h1  className="text-center">Knuckle Bones</h1>
          <p className="text-center">A game about risk and luck!</p>
          <div className="text-center">
            <button className="btn btn-primary px-4" onClick={startGame}>Play</button>
          </div>
        </div>
      )}

      { (currentGameState === gameState.win || currentGameState === gameState.lose || currentGameState === gameState.tied) && 
          <ResultModal 
            show={true} 
            onClose={closeGame}
            onPlayAgain={startGame}
            playerTotalScore={playerTotalScore}
            opponentTotalScore={opponentTotalScore}
            result={currentGameState}/>
      }

      </>
  )
}

export default KnuckleboneGame

