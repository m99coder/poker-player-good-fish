import { GameState } from './GameState'
import { allIn, callOrCheck, fold, raise, raiseHigh } from './actions'
// import { logGameStatus } from './helpers'
import { Utils, Action } from './Utils'

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    // encode hole cards and community cards
    const hand = Utils.encodeHand(gameState)
    const board = Utils.encodeBoard(gameState)

    // get win probability
    const percentage = Utils.getWinProbability(board, hand)

    // this will fold all the time
    // betCallback(0)

    // phase 1 –––
    // directly go all-in until a better strategy is implemented
    // assuming it’s a sit’n’go and every round is new, this is valid

    // logGameStatus(gameState, hand, board, percentage, rank, evaluator)

    if (gameState.community_cards.length === 0) {
      // determine action for starting hand
      switch (Utils.getActionForStartingHand(hand)) {
        case Action.Fold:
          fold(gameState, betCallback)
          return
        case Action.Call:
          callOrCheck(gameState, betCallback)
          return
        case Action.Raise:
          raise(gameState, betCallback)
          return
        default:
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
