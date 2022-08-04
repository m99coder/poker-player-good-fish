import { GameState, Card as GameCard } from "./GameState";
import { Card, Evaluator } from "deuces.js";
import { allIn, callOrCheck, fold, raise } from "./actions";
import { logGameStatus } from "./helpers";

export class Player {
  private encodeCard(card: GameCard): string {
    const rank = card.rank === "10" ? "T" : card.rank;
    return `${rank}${card.suit[0]}`;
  }

  public betRequest(
    gameState: GameState,
    betCallback: (bet: number) => void
  ): void {
    // encode hole cards
    const hand = gameState.players[gameState.in_action].hole_cards.map((c) =>
      Card.newCard(this.encodeCard(c))
    );

    // encode community cards
    const board = gameState.community_cards.map((c) =>
      Card.newCard(this.encodeCard(c))
    );

    const evaluator = new Evaluator();
    let rank = evaluator.evaluate(board, hand);
    let percentage = 1.0 - evaluator.get_five_card_rank_percentage(rank);



    // this will fold all the time
    // betCallback(0)

    // phase 1 –––
    // directly go all-in until a better strategy is implemented
    // assuming it’s a sit’n’go and every round is new, this is valid
    logGameStatus(gameState, hand, board, percentage, rank, evaluator);
    if (gameState.community_cards.length === 0) {

      const startingHandRanks =
        gameState.players[gameState.in_action].hole_cards
          .map(c => c.rank === '10' ? 'T' : c.rank).join();
      const startingHandSuits =
        gameState.players[gameState.in_action].hole_cards
          .map(c => c.suit[0]).join();

      const raiseHandRanks = ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AK'];
      const raiseHandSuits = ['cc', 'ss', 'hh', 'dd'];
      const callHandRanks = ['AQ', 'AJ', 'AT', 'A9', 'KQ', 'KJ', 'KT'];

      if (raiseHandRanks.includes(startingHandRanks) || raiseHandSuits.includes(startingHandSuits)) {
        raise(gameState, betCallback);
      } else if (callHandRanks.includes(startingHandRanks)) {
        callOrCheck(gameState, betCallback);
      } else {
        fold(gameState, betCallback);
      }

    } else {

      if (percentage > 0.6) {
        allIn(gameState, betCallback);
      } else if (percentage > 0.4) {
        callOrCheck(gameState, betCallback);
      } else {
        fold(gameState, betCallback);
      }
    }
  }

  public showdown(gameState: GameState): void {
    // for implementing learning algorithms only
    console.log("showdown", gameState);
  }
}

export default Player;
