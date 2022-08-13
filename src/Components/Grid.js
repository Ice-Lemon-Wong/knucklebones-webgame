import React, { useState } from 'react'
//import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa'
import DiceSlot from './DiceSlot'

const Grid = ({ isFacingUp }) => {
  const [gridData, setGridData] = useState([...Array(9)])

  const placeDice = (value, location) => {
    if (!gridData) return
    if (value < 0 || value > 6) return
    if (location < 0 || location > 9) return
    if (gridData[location]) return

    console.log('placing dice')
    let prevData = [...gridData]
    prevData[location] = value
    setGridData(prevData)
    console.log('upodate grid', gridData)
  }

  const displayGrid = () => {
    return gridData.map((data,i) => {
      console.log('mapping', i)
      return <DiceSlot onClick={placeDice} diceValue={data} location={i}/>
    })
  }

  //drawing row by row so beware
  return (
    <div className="d-flex flex-column justify-content-center">
        {isFacingUp && ( <div className={`gamegridNumbers up`}>
            <div>21</div>
            <div>21</div>
            <div>21</div>
          </div>)}
        <div className={`gamegrid ${(isFacingUp) ? 'up' : 'down'}`}>
            {gridData && displayGrid()}
        </div>
        {!isFacingUp && ( <div className={`gamegridNumbers down`}>
            <div>21</div>
            <div>21</div>
            <div>21</div>
          </div>)}
    </div>
  )
}

export default Grid
