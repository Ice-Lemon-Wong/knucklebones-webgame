import { useState } from 'react'
import { turnPhase, phaseDelay, duplicateColours, gameState } from '../Constants/gameConstants'

const useKnuckleBone = () => {
    //  board data
    const [playerDice, setPlayerDice] = useState(0)
    const [opponentDice, setOpponentDice] = useState(0)
    const [playerGrid, setPlayerGrid] = useState([...Array(9)]) // {value: 6, duplicates: 1}
    const [opponentGrid, setOpponentGrid] = useState([...Array(9)]) // {value: 6, duplicates: 1}
    
    //  score data
    const [playerScore, setPlayerScore] = useState([0,0,0])
    const [playerTotalScore, setPlayerTotalScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState([0,0,0])
    const [opponentTotalScore, setOpponentTotalScore] = useState(0)

    //  phase Data
    const [currentPhase, setCurrentPhase] = useState(turnPhase.none)
    const [nextPhase, setNextPhase] = useState(turnPhase.none)
    const [isPlayerControl, setPlayerControl] = useState(false)
    let upToDateCurrentPhase = currentPhase

    const [currentGameState, setCurrentGameState] = useState(gameState.unInitialized)
    const [turn, setTurn] = useState(0)

    const initGame = () => {
        if (currentGameState === gameState.running) return
        setCurrentGameState(gameState.running)
        setPlayerControl(true)
        setPhase(turnPhase.playerRoll)
    }

    const setPhaseExternal = (phase) => {
        setPhaseDelay(phase, phaseDelay.get(phase))
    }

    const setPhaseDelay = (phase, delayInSeconds) => {
        setTimeout(() => setPhase(phase), delayInSeconds * 500)
    }

    const setPhase = (phase) => {
        setCurrentPhase(phase)
        //console.log('current phase', currentPhase, phase)
        upToDateCurrentPhase = phase
        switch (phase){
            case turnPhase.playerRoll:
                generateDice(true)
                setNextPhase(turnPhase.playerInput)
                break;
            case turnPhase.playerInput:
                break;
            case turnPhase.playerEffect:
                destroyOpponentDice(true)
                setNextPhase(turnPhase.checkGameCondition)
                break;
            case turnPhase.opponentRoll:
                generateDice(false)
                setNextPhase(turnPhase.opponentInput)
                break;
            case turnPhase.opponentInput:
                opponentAction()
                setNextPhase(turnPhase.opponentEffect)
                break;
            case turnPhase.opponentEffect:
                destroyOpponentDice(false)
                setNextPhase(turnPhase.checkGameCondition)
                break;
            case turnPhase.checkGameCondition:
                console.log(typeof(calculateScore))
                //calculateScore(isPlayerControl, checkDuplicateDice(isPlayerControl ? playerGrid : opponentGrid));
                calculateScore(true, checkDuplicateDice(playerGrid));
                calculateScore(false, checkDuplicateDice(opponentGrid));

                if (checkEndGame()){
                    checkWhoWins()
                    setNextPhase(turnPhase.none)
                } else {
                    (isPlayerControl) ? setNextPhase(turnPhase.opponentRoll) : setNextPhase(turnPhase.playerRoll)
                    setPlayerControl(!isPlayerControl)
                }
                break;
            default:
                break;
        }
    } 

    const generateDice = (isPlayer) =>{
        const rolledValue = Math.floor(Math.random() * 6) + 1;
        (isPlayer) ? setPlayerDice(rolledValue) : setOpponentDice(rolledValue)
    }

    const opponentAction = () =>{
        let emptySpaces  = []
        opponentGrid.forEach((element, index) => {
            if (!element) emptySpaces.push(index)
        })
        placeDice(false, opponentDice, emptySpaces[ Math.floor(Math.random() * emptySpaces.length)])
    }

    const placeDice = (isPlayer, value, location) => {
        let gridData
        if (isPlayer) {
            if (upToDateCurrentPhase !== turnPhase.playerInput) return
            if (!isPlayerControl) return
            if (!playerGrid) return
            gridData = [...playerGrid]
        }else{
            if (upToDateCurrentPhase !== turnPhase.opponentInput) return
            if (isPlayerControl) return
            if (!opponentGrid) return
            gridData = [...opponentGrid]
        }

        if (!gridData) return
        if (value < 0 || value > 6) return
        if (location < 0 || location > 9) return
        if (gridData[location]) return
        
        gridData[location] = {value: value, colour: duplicateColours[0]}

        if (isPlayer){
            setPlayerGrid(gridData)
            setPlayerDice(null)
            setNextPhase(turnPhase.playerEffect)
        }else {
            setOpponentDice(null)
            setOpponentGrid(gridData)
        }
        console.log('upodate grid', gridData)
    }

    const formatGridToColumn =  (gridData) => {
        let columnDatas = [...Array(3)]
        columnDatas[0] = [gridData[0],gridData[3],gridData[6]]
        columnDatas[1] = [gridData[1],gridData[4],gridData[7]]
        columnDatas[2] = [gridData[2],gridData[5],gridData[8]]
        return columnDatas
    }

    const destroyOpponentDice = (isPlayer) =>{
        if (!playerGrid || !opponentGrid) return
        let attackerGridData, victimGridData
        if (isPlayer) {
            attackerGridData = [...playerGrid]
            victimGridData = [...opponentGrid]
        }else{
            victimGridData = [...playerGrid]
            attackerGridData = [...opponentGrid]
        }

        for (let i = 0; i < 3; i++) {
            for (let j = i; j < attackerGridData.length; j += 3 ) {
               if(attackerGridData[j]){
                for (let k = i; k < victimGridData.length; k += 3){
                    console.log('check to destroy dice',attackerGridData[j].value , (victimGridData[k] && victimGridData[k].value))
                    if (victimGridData[k] && victimGridData[k].value === attackerGridData[j].value){
                        console.log('destroy dice proper')
                        victimGridData[k] = null
                    }
                }                    

               }
            }
        }
        console.log('upodate destroy grid', attackerGridData, victimGridData)
        setPlayerGrid((isPlayer) ? attackerGridData : victimGridData)
        setOpponentGrid((isPlayer) ? victimGridData : attackerGridData)
    }

    const checkDuplicateDice = (gridData) => {
        let columnValues = formatGridToColumn(gridData)

        let duplicateMaps = [...Array(columnValues.length)]
        columnValues.forEach((column, index) => {
            let counter = new Map()
            for (let i = 0; i < column.length; i++){
                if (column[i]){
                    let count = counter.has(column[i].value) ? counter.get(column[i].value) : 0;
                    count++
                    counter.set(column[i].value, count)
                }
            }
            duplicateMaps[index] = counter
            //  reapply colours
            for (let j = index; j < gridData.length; j += 3 ) {
                if(gridData[j]){
                    gridData[j].colour = duplicateColours[counter.get(gridData[j].value) - 1]
                }
            }
        })
        return duplicateMaps
    }

    const calculateScore = (isPlayer , duplicateMaps) => {
        /* let gridData
        if (isPlayer) {
            gridData = [...playerGrid]
        }else{
            gridData = [...opponentGrid]
        } */

        let scoreArray = [0,0,0]
        for (let i = 0; i < scoreArray.length; i++) {
            /* for (let j = i; j < gridData.length; j += 3 ) {
               if(gridData[j]){
                scoreArray[i] += gridData[j].value
               }
            } */
            let columnTotal = 0
            duplicateMaps[i].forEach((values, keys) => {
                columnTotal += Math.pow(keys, values)
            })
            scoreArray[i] = columnTotal
        }
      /*   const calculatedArray = scoreArray.map((value, index) => {
            for (let i = index, index < scoreArray.length; i += 3; ){
                if (gridData[i]){
                    value += gridData[i]
                }
            }
            return value
        }) */

        (isPlayer) ? setPlayerScore(scoreArray) : setOpponentScore(scoreArray);
        (isPlayer) ? setPlayerTotalScore(calculateTotalScore(scoreArray)) : setOpponentTotalScore(calculateTotalScore(scoreArray));
    }

    const calculateTotalScore = (scoreArray) =>{
        let totalScore = 0
        scoreArray.forEach((value) => {
            totalScore += value
        })
        return totalScore
    }

    const checkEndGame = () =>{
        if (!playerGrid.includes(null) && !playerGrid.includes(undefined)) return true
        if (!opponentGrid.includes(null) && !opponentGrid.includes(undefined)) return true
        return false
    }

    const checkWhoWins = () => {
        if (playerTotalScore === opponentTotalScore) setCurrentGameState(gameState.tied)
        else if (playerTotalScore > opponentTotalScore) setCurrentGameState(gameState.win)
        else setCurrentGameState(gameState.lose)
    }

    return {
        placeDice,
        generateDice,
        initGame,
        setPhaseExternal,
        playerDice,
        opponentDice,
        playerGrid,
        opponentGrid,
        playerScore,
        opponentScore,
        playerTotalScore,
        opponentTotalScore,
        nextPhase,
        turn,
        currentGameState
    }
}

export default useKnuckleBone