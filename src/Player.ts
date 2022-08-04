import { GameState } from './GameState'

export class Player {

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    // this will fold all the time
    betCallback(0)

    // phase 1 –––
    // directly go all-in until a better strategy is implemented
    // assuming it’s a sit’n’go and every round is new, this is valid
    // betCallback(gameState.players[gameState.in_action].stack)
  }

  public showdown(_gameState: GameState): void {
    // for implementing learning algorithms only
  }
}

export default Player
