import Player from '../src/Player'
import { Card as GameCard } from '../src/GameState'

describe('Player', () => {
  it('encodes cards', () => {
    const card: GameCard = {
      rank: '10',
      suit: 'clubs'
    }
    expect(Player.encodeCard(card)).toBe('Tc')
  })
})
