import React, { useState } from 'react'
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa'


const DiceSlot = ({ onClick, diceValue, diceColour, location, interactable}) => {
  const [currentDiceValue, setCurrentDiceValue] = useState(null)

  const getDiceAnimationClass = (value) => {
    if (value === 1) {console.log('comparing: ' + value + ', ' + currentDiceValue) }
    if (!value && currentDiceValue) return 'dicedisappear'
    else if (value && !currentDiceValue) return 'diceappear'
    else return ''
  } 

  const getDiceIcon = (value) => {
      
      let diceJSX= null
      if (value === 1) {console.log( getDiceAnimationClass(diceValue)) }
      switch (value) {
          case 1: 
            //diceJSX = <FaDiceOne className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            diceJSX = <FaDiceOne className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            break
          case 2: 
            diceJSX = <FaDiceTwo className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            break
          case 3: 
            diceJSX =  <FaDiceThree className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            break
          case 4: 
            diceJSX = <FaDiceFour className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            break
          case 5:
            diceJSX =  <FaDiceFive className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            break
          case 6: 
            diceJSX = <FaDiceSix className={`text-${diceColour} ${getDiceAnimationClass(diceValue)}`} />
            break
          default: 
            diceJSX =  null
            break
      }

      if (value === undefined) value = null;
      if (currentDiceValue !== value)setCurrentDiceValue(value);

      return diceJSX
  }

  return (
    <div className="diceslot" onClick={() => {interactable && onClick(location)}} >
        <div className={`griddice`}>{getDiceIcon(diceValue)}</div>
    </div>
  )
}

export default DiceSlot
