import React from 'react'
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa'

const DiceSlot = ({ onClick, diceValue, location }) => {
  const getDiceIcon = (value) => {
      switch (value) {
          case 1: return <FaDiceOne />
          case 2: return <FaDiceTwo />
          case 3: return <FaDiceThree />
          case 4: return <FaDiceFour />
          case 5: return <FaDiceFive />
          case 6: return <FaDiceSix />
          default: return null
      }
  }

  return (
    <div className="diceslot" onClick={() => onClick(Math.floor(Math.random() * 7),location)} >
        <div className="griddice">{getDiceIcon(diceValue)}</div>
    </div>
  )
}

export default DiceSlot
