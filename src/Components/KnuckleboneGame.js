import React from 'react'
import Grid from './Grid.js'
import GameBoard from './GameBoard.js'

const KnuckleboneGame = () => {
  return (
    <div className="container">
      <h1  className="text-center">KnuckleboneGame</h1>
      <div>
        <GameBoard isPlayer={false}/>
        <h2 className="text-center">---   VS   ---</h2>
        <GameBoard isPlayer={true}/>
      </div>
    </div>
  )
}

export default KnuckleboneGame
