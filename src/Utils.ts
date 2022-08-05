import { Card as GameCard } from './GameState'

export class Utils {
  static encodeCard(card: GameCard): string {
    const rank = card.rank === '10' ? 'T' : card.rank
    return `${rank}${card.suit[0]}`
  }
}

export default Utils
