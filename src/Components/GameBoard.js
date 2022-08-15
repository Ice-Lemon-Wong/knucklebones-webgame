import React from 'react'
import Grid from './Grid.js'
import DiceSlot from './DiceSlot.js'

const GameBoard = ({isPlayer, generatedDice, placeDice, gridData, score, totalScore}) => {
  return (
    <div className="container d-flex justify-content-center gameboard">
      <div className="w-75" >
        <div className=" d-flex justify-content-center align-items-center ">
          <div className=" w-25 align-items-center justify-content-end">
              <p className=" text-center">{isPlayer ? 'Player' : 'Opponent'} Dice:</p>
              <div className="d-flex justify-content-center ">
                <DiceSlot diceValue={generatedDice} interactable={false} diceColour={'dark'}/>
              </div>
          </div>
          <Grid className="justify-content-center align-items-center" score={score} isFacingUp={isPlayer} gridData={gridData} onSlotClick={(location) => {placeDice(isPlayer,generatedDice,location)}} interactable={isPlayer} />
          <div className="w-25 align-items-center justify-content-start">
            <p className=" text-center">{isPlayer ? 'Player' : 'Opponent'} Score:</p>
            <h2 className=" text-center">{totalScore}</h2>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default GameBoard
