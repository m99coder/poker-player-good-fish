import { Card as GameCard, GameState } from './GameState'
import { Card, Evaluator } from 'deuces.js'

export class Utils {
  static encodeCard(card: GameCard): string {
    const rank = card.rank === '10' ? 'T' : card.rank
    return `${rank}${card.suit[0]}`
  }

  static encodeHand(gameState: GameState): Array<number> {
    return gameState.players[gameState.in_action].hole_cards.map((c) => Card.newCard(Utils.encodeCard(c)))
  }

  static encodeBoard(gameState: GameState): Array<number> {
    return gameState.community_cards.map((c) => Card.newCard(Utils.encodeCard(c)))
  }

  static getRank(board: Array<number>, hand: Array<number>): number {
    return new Evaluator().evaluate(board, hand)
  }

  static getWinProbability(board: Array<number>, hand: Array<number>): number {
    const evaluator = new Evaluator()
    const rank = evaluator.evaluate(board, hand)
    return 1.0 - evaluator.get_five_card_rank_percentage(rank)
  }
}

export default Utils
