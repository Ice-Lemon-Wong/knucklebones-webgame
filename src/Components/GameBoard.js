import React from 'react'
import Grid from './Grid.js'
import DiceSlot from './DiceSlot.js'

const GameBoard = ({isPlayer}) => {
  return (
    <div className="container d-flex justify-content-center gameboard">
      <div className="w-75" >
        <div className=" d-flex justify-content-center align-items-center ">
          <div className=" w-25 align-items-center justify-content-end">
              <p className=" text-center">Player Dice:</p>
              <div className="d-flex justify-content-center ">
                <DiceSlot/>
              </div>
          </div>
          <Grid className="justify-content-center align-items-center" isFacingUp={isPlayer}/>
          <div className="w-25 align-items-center justify-content-start">
            <p className=" text-center">Player Dice:</p>
            <h2 className=" text-center">420</h2>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default GameBoard
