import Utils, { Action } from '../src/Utils'
import { Card as GameCard } from '../src/GameState'
import { gameState } from './fixtures'
import { Card } from 'deuces.js'

describe('Utils', () => {
  it('encodes cards', () => {
    let card: GameCard = {
      rank: '10',
      suit: 'clubs',
    }
    expect(Utils.encodeCard(card)).toBe('Tc')

    card = {
      rank: 'K',
      suit: 'spades',
    }
    expect(Utils.encodeCard(card)).toBe('Ks')

    card = {
      rank: '4',
      suit: 'hearts',
    }
    expect(Utils.encodeCard(card)).toBe('4h')

    card = {
      rank: 'J',
      suit: 'diamonds',
    }
    expect(Utils.encodeCard(card)).toBe('Jd')
  })

  it('encodes hand', () => {
    const hand = Utils.encodeHand(gameState)
    expect(hand.map((c) => Card.int_to_pretty_str(c))).toEqual([' [ 6 ❤ ] ', ' [ K ♠ ] '])
  })

  it('encodes board', () => {
    const board = Utils.encodeBoard(gameState)
    expect(board.map((c) => Card.int_to_pretty_str(c))).toEqual([' [ 4 ♠ ] ', ' [ A ❤ ] ', ' [ 6 ♣ ] '])
  })

  it('ranks a hand', () => {
    const hand = Utils.encodeHand(gameState)
    const board = Utils.encodeBoard(gameState)
    expect(Utils.getRank(board, hand)).toBe(5093)
  })

  it('returns win probability', () => {
    // one pair
    const hand = Utils.encodeHand(gameState)
    const board = Utils.encodeBoard(gameState)
    expect(Utils.getWinProbability(board, hand)).toBe(0.3174752077191102)

    // two pairs
    board.push(Card.newCard('6d'))
    expect(Utils.getWinProbability(board, hand)).toBe(0.7134816403109085)

    // full house
    board.push(Card.newCard('Kh'))
    expect(Utils.getWinProbability(board, hand)).toBe(0.96462074510855)
  })

  it('returns action for starting hands', () => {
    // raise
    let hand = [Card.newCard('As'), Card.newCard('Ah')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('Ks'), Card.newCard('Kh')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('Qs'), Card.newCard('Qh')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('Js'), Card.newCard('Jh')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('Ts'), Card.newCard('Th')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('As'), Card.newCard('Kh')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('2c'), Card.newCard('3c')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('4s'), Card.newCard('5s')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('6h'), Card.newCard('7h')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    hand = [Card.newCard('8d'), Card.newCard('9d')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Raise)

    // call
    hand = [Card.newCard('Ad'), Card.newCard('Qc')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    hand = [Card.newCard('Ad'), Card.newCard('Jc')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    hand = [Card.newCard('Ad'), Card.newCard('Tc')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    hand = [Card.newCard('Ad'), Card.newCard('9c')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    hand = [Card.newCard('Kd'), Card.newCard('Qc')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    hand = [Card.newCard('Kd'), Card.newCard('Jc')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    hand = [Card.newCard('Kd'), Card.newCard('Tc')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Call)

    // fold
    hand = [Card.newCard('2d'), Card.newCard('7c')]
    expect(Utils.getActionForStartingHand(hand)).toBe(Action.Fold)
  })
})
