import Utils from '../src/Utils'
import { Card as GameCard } from '../src/GameState'

describe('Player', () => {
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
})
