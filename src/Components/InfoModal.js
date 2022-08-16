import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const InfoModal = ({ show, onClose}) => {
    return (
      <Modal show={show} onHide={onClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title >How To Play</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
            <li className="infoitem">Place a dice with a random value from 1 to 6 on an empty space on the board, the dice valyue determines the score you'll get.</li>
            <li className="infoitem">When multiple dice of the same number are placed in the same column, their value will be multiplied.</li>
            <li className="infoitem">When placing a dice you can destroy opponent's dice that matches your dice value in the same column.</li>
            <li className="infoitem">The game ends when either the player or the opponent's board is filled, the player with the highest score by then is the winner.</li>
        </ul>

      </Modal.Body>
      <Modal.Footer className="justify-content-center mx-5">
        <Button className="col btn mx-5" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
}

export default InfoModal
