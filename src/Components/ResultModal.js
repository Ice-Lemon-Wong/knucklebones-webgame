import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { gameState } from '../Constants/gameConstants'

const ResultModal = ({ show, onClose, onPlayAgain, playerTotalScore, opponentTotalScore, result }) => {

    const getQuoteText = () => {
      if (result === gameState.win){
        return <>
          <h2 className="text-center pt-4">You Won!</h2>
          <p className="text-center ">Congratulations, you are very lucky! :)</p>
        </>
      } else if  (result === gameState.lose){
        return <>
          <h2 className="text-center pt-4">You Lost!</h2>
          <p className="text-center ">Better lick next time! :P</p>
        </>
      } else if  (result === gameState.tied){
        return <>
          <h2 className="text-center pt-4">Tied!</h2>
          <p className="text-center ">What are the odds! :O</p>
        </>
      } 
    }

   

    return (
        
      <Modal show={show} onHide={onClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

      <Modal.Body>
        <h4 className="text-center">Game Over</h4>
        <div className="d-flex justify-content-center align-items-end m-10">
          <h1 className="w-25 text-center">{playerTotalScore}</h1>
          <h5 className="w-10 text-center">vs</h5>
          <h1 className="w-25 text-center">{opponentTotalScore}</h1>
        </div>
        
        {getQuoteText()}
      </Modal.Body>
      <Modal.Footer className="justify-content-center mx-5">
        <Button className="col btn btn-block mx-3" onClick={onPlayAgain}>Play Again</Button>
        <Button className="col btn btn-block mx-3" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
}

export default ResultModal
