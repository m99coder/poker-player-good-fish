import { GameState, Card as GameCard } from './GameState'
import { Card, Evaluator } from 'deuces.js'
import { allIn, callOrCheck, fold, raise, raiseHigh } from './actions'
import { logGameStatus } from './helpers'

export class Player {
  static encodeCard(card: GameCard): string {
    const rank = card.rank === '10' ? 'T' : card.rank
    return `${rank}${card.suit[0]}`
  }

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    // encode hole cards
    const hand = gameState.players[gameState.in_action].hole_cards.map((c) => Card.newCard(Player.encodeCard(c)))

    // encode community cards
    const board = gameState.community_cards.map((c) => Card.newCard(Player.encodeCard(c)))

    const evaluator = new Evaluator()
    const rank = evaluator.evaluate(board, hand)
    const percentage = 1.0 - evaluator.get_five_card_rank_percentage(rank)

    // this will fold all the time
    // betCallback(0)

    // phase 1 –––
    // directly go all-in until a better strategy is implemented
    // assuming it’s a sit’n’go and every round is new, this is valid
    logGameStatus(gameState, hand, board, percentage, rank, evaluator)
    if (gameState.community_cards.length === 0) {
      const startingHandRanks = gameState.players[gameState.in_action].hole_cards
        .map((c) => (c.rank === '10' ? 'T' : c.rank))
        .join('')
      const startingHandSuits = gameState.players[gameState.in_action].hole_cards.map((c) => c.suit[0]).join('')

      const raiseHandRanks = ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AK']
      const raiseHandSuits = ['cc', 'ss', 'hh', 'dd']
      const callHandRanks = ['AQ', 'AJ', 'AT', 'A9', 'KQ', 'KJ', 'KT']

      console.log(`

      startingHandRanks : ${startingHandRanks}
      startingHandSuits : ${startingHandSuits}
      do we raise? ${raiseHandRanks.includes(startingHandRanks) || raiseHandSuits.includes(startingHandSuits)}

      do we call? ${callHandRanks.includes(startingHandRanks)}

      `)

      if (raiseHandRanks.includes(startingHandRanks) || raiseHandSuits.includes(startingHandSuits)) {
        raise(gameState, betCallback)
      } else if (callHandRanks.includes(startingHandRanks)) {
        callOrCheck(gameState, betCallback)
      } else {
        fold(gameState, betCallback)
      }
    } else if (gameState.community_cards.length >= 4) {
      if (percentage > 0.6) {
        raiseHigh(gameState, betCallback)
      } else if (percentage > 0.4) {
        callOrCheck(gameState, betCallback)
      } else {
        fold(gameState, betCallback)
      }
    } else {
      if (percentage > 0.77) {
        allIn(gameState, betCallback)
      } else if (percentage > 0.65) {
        raiseHigh(gameState, betCallback)
      } else if (percentage > 0.55) {
        raise(gameState, betCallback)
      } else if (percentage > 0.4) {
        callOrCheck(gameState, betCallback)
      } else {
        fold(gameState, betCallback)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public showdown(_gameState: GameState): void {
    // for implementing learning algorithms only
    // console.log('showdown', gameState)
  }
}

export default Player
