import { GameState, Card as GameCard } from './GameState'
import { Card, Evaluator } from 'deuces.js'
import { allIn, check, fold } from './actions'

export class Player {

  private encodeCard(card: GameCard): string {
    const rank = card.rank === '10' ? 'T' : card.rank
    return `${rank}${card.suit[0]}`
  }

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    console.log('betRequest', gameState)
        // encode hole cards
        const hand =
        gameState.players[gameState.in_action].hole_cards
          .map(c => Card.newCard(this.encodeCard(c)))
  
      // encode community cards
      const board =
        gameState.community_cards
          .map(c => Card.newCard(this.encodeCard(c)))
      
        const evaluator = new Evaluator()

          
    console.log('Hole cards')
      Card.print_pretty_cards(hand, true)
  


    // this will fold all the time
    // betCallback(0)

    // phase 1 –––
    // directly go all-in until a better strategy is implemented
    // assuming it’s a sit’n’go and every round is new, this is valid
    if (gameState.community_cards.length === 0) {
      check(gameState, betCallback)
    } else {
              // evaluate rank
      // Hand strength is valued on a scale of 1 to 7462,
      // where 1 is a Royal Flush and 7462 is unsuited 7-5-4-3-2,
      // as there are only 7642 distinctly ranked hands in poker.
 
      let rank = evaluator.evaluate(board, hand)
      let rankClass = evaluator.get_rank_class(rank)
      let percentage = 1.0 - evaluator.get_five_card_rank_percentage(rank)
      Card.print_pretty_cards(board, true)
      console.log(`Rank for your hand is: ${rank} (${evaluator.class_to_string(rankClass)})`)
      console.log(percentage)

      if (percentage < 0.3) {
        fold(gameState, betCallback)
      } else  if (percentage > 0.6) {
        allIn(gameState, betCallback)
      } else {
        check(gameState, betCallback)
      }

  

    }


    // TODO: add turn and river
  }

  public showdown(gameState: GameState): void {
    // for implementing learning algorithms only
    console.log('showdown', gameState)
  }
}

export default Player
