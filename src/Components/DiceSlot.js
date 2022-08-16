import React, { useState } from 'react'
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa'


const DiceSlot = ({ onClick, diceValue, diceColour, location, interactable, canChangeBorder}) => {
  const [currentDiceValue, setCurrentDiceValue] = useState(null)



  const getDiceElement = (value, colour, animName) => {
    switch (value) {
      case 1: 
        return <FaDiceOne className={`text-${colour} ${animName}`} />
      case 2: 
        return <FaDiceTwo className={`text-${colour} ${animName}`} />

      case 3: 
        return <FaDiceThree className={`text-${colour} ${animName}`} />

      case 4: 
        return <FaDiceFour className={`text-${colour} ${animName}`} />

      case 5:
        return <FaDiceFive className={`text-${colour} ${animName}`} />

      case 6: 
        return <FaDiceSix className={`text-${colour} ${animName}`} />

      default: 
        return null
  
    }
  }

  const getDiceIcon = (value) => {
      
      let diceJSX= null
      //let animName = getDiceAnimationClass(show);
      //{console.log( animName, location) }
      if (value) {
        diceJSX = getDiceElement(value, diceColour, 'diceappear')
      }
      else {
        diceJSX = getDiceElement(currentDiceValue, diceColour, 'dicedisappear')
      }

      if (value === undefined) value = null;
      if (currentDiceValue !== value){
        setCurrentDiceValue(value);
      } 
      return diceJSX
  }

  return (
    <div className={`diceslot ${(!diceValue && canChangeBorder) && 'empty'} ${(interactable) && 'interactable'}`} onClick={() => {interactable && onClick(location)}} >
        <div className={`griddice`}>{getDiceIcon(diceValue)}</div>
    </div>
  )
}

export default DiceSlot
