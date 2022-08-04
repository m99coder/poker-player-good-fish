import Player from '../src/Player'
import { Card as GameCard } from '../src/GameState'

describe('Player', () => {
  it('encodes cards', () => {
    let card: GameCard = {
      rank: '10',
      suit: 'clubs'
    }
    expect(Player.encodeCard(card)).toBe('Tc')

    card = {
      rank: 'K',
      suit: 'spades'
    }
    expect(Player.encodeCard(card)).toBe('Ks')

    card = {
      rank: '4',
      suit: 'hearts'
    }
    expect(Player.encodeCard(card)).toBe('4h')

    card = {
      rank: 'J',
      suit: 'diamonds'
    }
    expect(Player.encodeCard(card)).toBe('Jd')
  })
})
