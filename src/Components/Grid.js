import React, { useState } from 'react'
//import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa'
import DiceSlot from './DiceSlot'

const Grid = ({ isFacingUp, gridData, onSlotClick, interactable, score }) => {

  /* const placeDice = (value, location) => {
    if (!gridData) return
    if (value < 0 || value > 6) return
    if (location < 0 || location > 9) return
    if (gridData[location]) return

    console.log('placing dice')
    let prevData = [...gridData]
    prevData[location] = value
    setGridData(prevData)
    console.log('upodate grid', gridData)
  } */

  const displayGrid = () => {
    return gridData.map((data,i) => {
      return <DiceSlot key={i} onClick={onSlotClick} canChangeBorder={true} diceValue={data ? data.value : null} diceColour={data ? data.colour : 'dark'} location={i} interactable={interactable}/>
    })
  }

  //drawing row by row so beware
  return (
    <div className="d-flex flex-column justify-content-center">
        {isFacingUp && ( <div className={`gamegridNumbers up`}>
            <div>{score && score[0]}</div>
            <div>{score && score[1]}</div>
            <div>{score && score[2]}</div>
          </div>)}
        <div className={`gamegrid ${(isFacingUp) ? 'up' : 'down'}`}>
            {gridData && displayGrid()}
        </div>
        {!isFacingUp && ( <div className={`gamegridNumbers down`}>
            <div>{score && score[0]}</div>
            <div>{score && score[1]}</div>
            <div>{score && score[2]}</div>
          </div>)}
    </div>
  )
}

export default Grid
