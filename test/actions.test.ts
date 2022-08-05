import { allIn, callOrCheck, fold, raise, raiseHigh } from '../src/actions'
import { gameState } from './fixtures'

// silence `console.log` statements
global.console = {
  ...console,
  log: jest.fn(),
}

describe('actions', () => {
  it('raises the minimum', () => {
    const mockBetCallback = jest.fn()
    raise(gameState, mockBetCallback)
    expect(mockBetCallback).toBeCalledWith(gameState.minimum_raise)
  })

  it('raises third of stack', () => {
    const mockBetCallback = jest.fn()
    const ownPlayer = gameState.players[gameState.in_action]
    ownPlayer.stack = 900

    raiseHigh(gameState, mockBetCallback)
    expect(mockBetCallback).toBeCalledWith(300)
  })

  it('checks', () => {
    const mockBetCallback = jest.fn()
    const ownPlayer = gameState.players[gameState.in_action]
    ownPlayer.bet = gameState.current_buy_in

    callOrCheck(gameState, mockBetCallback)
    expect(mockBetCallback).toBeCalledWith(0)
  })

  it('calls', () => {
    const mockBetCallback = jest.fn()
    const ownPlayer = gameState.players[gameState.in_action]

    callOrCheck(gameState, mockBetCallback)
    expect(mockBetCallback).toBeCalledWith(gameState.current_buy_in - ownPlayer.bet)
  })

  it('folds', () => {
    const mockBetCallback = jest.fn()
    fold(gameState, mockBetCallback)
    expect(mockBetCallback).toBeCalledWith(0)
  })

  it('goes all-in', () => {
    const mockBetCallback = jest.fn()
    const ownPlayer = gameState.players[gameState.in_action]

    allIn(gameState, mockBetCallback)
    expect(mockBetCallback).toBeCalledWith(ownPlayer.stack)
  })
})
