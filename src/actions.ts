import { GameState } from './GameState'

 export function raise(gameState: GameState, betCallback: (bet: number) => void): void {
     betCallback(gameState.minimum_raise);
 }

 export function raiseHigh(gameState: GameState, betCallback: (bet: number) => void): void {
    const us = gameState.players[gameState.in_action]
    betCallback(Math.floor(us.stack / 3));
 }

export function callOrCheck(gameState: GameState, betCallback: (bet: number) => void): void {
  const currentBuy = gameState.current_buy_in;
  const us = gameState.players[gameState.in_action]
  if (currentBuy === us.bet) {
    console.log('ACTION: check function: check with 0')
    betCallback(0) // no more raise
  } else {
    console.log(`ACTION: calling with current_buy: ${currentBuy}`)
    const amount = currentBuy - us.bet
    betCallback(amount) // we stay in the game
  }
}

export function fold(_gameState: GameState, betCallback: (bet: number) => void): void {
  console.log(`ACTION: FOLD!`)
  betCallback(0)
}

export function allIn(gameState: GameState, betCallback: (bet: number) => void): void {
  console.log(`ACTION: ALL IN!!!!`)
  betCallback(gameState.players[gameState.in_action].stack)
}
