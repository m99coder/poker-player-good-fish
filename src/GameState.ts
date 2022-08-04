export type CardRank =
  '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

export type CardSuit =
  'clubs' | 'spades' | 'hearts' | 'diamonds'

export type Card = {
  // Rank of the card
  rank: CardRank
  // Suit of the card
  suit: CardSuit
}

export type Player = {
  // Id of the player (same as the index)
  id: number
  // Name specified in the tournament config
  name: string
  // Status of the player
  status: 'active' | 'folded' | 'out'
  // Version identifier returned by the player
  version: string
  // Amount of chips still available for the player (bet excluded)
  stack: number
  // The amount of chips the player put into the pot
  bet: number
  // The cards of the player
  hole_cards?: Array<Card>
}

export type GameState = {
  // Id of the current tournament
  tournament_id: string
  // Id of the current sit’n’go game
  game_id: string
  // Index of the current round within a sit’n’go
  round: number
  // Index of the betting opportunity within a round
  bet_index: number
  // The small blind in the current round. The big blind is twice the small blind
  small_blind: number
  // The amount of the largest current bet from any one player
  current_buy_in: number
  // The size of the pot (sum of the player bets)
  pot: number
  // Minimum raise amount
  minimum_raise: number
  // The index of the player on the dealer button in this round
  dealer: number
  // Number of orbits completed
  orbits: number
  // The index of your player, in the players array
  in_action: number
  // An array of the players
  players: Array<Player>
  // An array of community cards
  community_cards: Array<Card>
}
