import { allowedNodeEnvironmentFlags } from "process";
import { GameState } from "./GameState";

export function call(gameState: GameState, betCallback: (bet: number) => void): void {
    betCallback(gameState.current_buy_in)
}

export function fold(gameState: GameState, betCallback: (bet: number) => void): void {
    betCallback(0)
}

export function allIn(gameState: GameState, betCallback: (bet: number) => void): void {
    betCallback(gameState.players[gameState.in_action].stack)
}
