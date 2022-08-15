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
    ['playerRoll', 1],
    ['playerInput', 1],
    ['playerEffect', 1],
    ['checkGameCondition', 1],
    ['opponentRoll', 1],
    ['opponentInput', 1],
    ['opponentEffect', 1],
    ['passTurn', 1],
    ['none', 1],
])

export const duplicateColours = [
    'dark',
    'primary',
    'success'
]
    


