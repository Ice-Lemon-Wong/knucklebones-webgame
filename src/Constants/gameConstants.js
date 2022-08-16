export const gameState = {
    unInitialized: 'unInitialized',
    running: 'running',
    win: 'win',
    lose: 'lose',
    tied: 'tied'
}

export const turnPhase = {
    playerRoll: 'playerRoll',
    playerInput: 'playerInput',
    playerEffect: 'playerEffect',
    checkGameCondition: 'checkGameCondition',
    opponentRoll: 'opponentRoll',
    opponentInput: 'opponentInput',
    opponentEffect: 'opponentEffect',
    passTurn: 'passTurn',
    none: 'none'
}

export const phaseDelay = new Map([
    ['playerRoll', 0.5],
    ['playerInput', 0],
    ['playerEffect', 1],
    ['checkGameCondition', 0.5],
    ['opponentRoll', 0.5],
    ['opponentInput', 1],
    ['opponentEffect', 1],
    ['passTurn', 0.5],
    ['none', 1],
])

export const duplicateColours = [
    'dark',
    'primary',
    'success'
]
    


