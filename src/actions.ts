import { allowedNodeEnvironmentFlags } from "process";
import { GameState } from "./GameState";

// export function raise(gameState: GameState, betCallback: (bet: number) => void): void {
//     betCallback(gameState.current_buy_in)
// }

export function check(gameState: GameState, betCallback: (bet: number) => void): void {
    if (gameState.current_buy_in === gameState.players[gameState.in_action].bet) {
        console.log('ACTION: check function: check with 0')
        betCallback(0) // no more raise
    } else {
        console.log(`ACTION: checking with current_buy: ${gameState.current_buy_in}`)
        betCallback(gameState.current_buy_in) // we raise
    }
}

export function fold(gameState: GameState, betCallback: (bet: number) => void): void {
    console.log(`ACTION: FOLD!`)
    betCallback(0)
}

export function allIn(gameState: GameState, betCallback: (bet: number) => void): void {
    console.log(`ACTION: ALL IN!!!!`)
    betCallback(gameState.players[gameState.in_action].stack)
}
