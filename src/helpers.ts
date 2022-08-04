import { Card } from 'deuces.js'
import { GameState } from "./GameState";


export function logGameStatus(gameState: GameState, hand: any[], board: any [], percentage: number, rank: number, evaluator: any) {
    let rankClass = evaluator.get_rank_class(rank)
    const fish = gameState.players[gameState.in_action]
    const ivy = gameState.players.find(player => player.id === 1);
    const Merciless = gameState.players.find(player => player.id === 2);
    const currentBuying = gameState.current_buy_in;

    console.log(`🐟 Hole cards & Board: round ${gameState.round} currentBuying: ${currentBuying}`)
    Card.print_pretty_cards(hand, true)
    Card.print_pretty_cards(board, true)
    console.log(`🐟 Rank for your hand is: ${rank} (${evaluator.class_to_string(rankClass)})`)
    console.log(`🐟 hand percentage ${percentage}`)
    console.log(`
        
       ${fish.status === 'out'? '[X]': '' } Fish: current bet ${fish.bet}, stack 💰 ${fish.stack}
       ${fish.status === 'out'? '[X]': '' }  Ivy League: current bet ${ivy.bet}, stack 💰 ${ivy.stack}
       ${fish.status === 'out'? '[X]': '' }  Merciless Ace: current bet ${Merciless.bet}, stack 💰 ${Merciless.stack}    
    `)
}
