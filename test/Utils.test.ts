import Utils from '../src/Utils'
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
})
