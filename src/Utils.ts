import { Card as GameCard, GameState } from './GameState'
import { Card, Evaluator } from 'deuces.js'

export enum Action {
  'Fold',
  'Call',
  'Raise',
  'AllIn',
}

// patched `int_to_str` from `deuces.js`
const intToStr = (card: Card, cardInt: number): string => {
  const rank_int = card.get_rank_int(cardInt)
  const suit_int = card.get_suit_int(cardInt)
  return Card.STR_RANKS[rank_int] + Card.INT_SUIT_TO_CHAR_SUIT[suit_int]
}

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

  static getActionForStartingHand(hand: Array<number>): Action {
    const raiseHandRanks = ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AK']
    const raiseHandSuits = ['cc', 'ss', 'hh', 'dd']
    const callHandRanks = ['AQ', 'AJ', 'AT', 'A9', 'KQ', 'KJ', 'KT']

    const ranks = hand.map((c) => intToStr(Card, c)[0]).join('')
    const suits = hand.map((c) => intToStr(Card, c)[1]).join('')

    if (raiseHandRanks.includes(ranks) || raiseHandSuits.includes(suits)) {
      return Action.Raise
    }

    if (callHandRanks.includes(ranks)) {
      return Action.Call
    }

    return Action.Fold
  }
}

export default Utils
