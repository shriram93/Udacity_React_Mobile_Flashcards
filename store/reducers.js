import { LOAD_DECKS, ADD_DECK, REMOVE_DECK, ADD_QUESTION } from './actions'

export default function decks(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.newDeck
      }
    case REMOVE_DECK:
      const newDeck = Object.assign({}, state)
      delete newDeck[action.deckId];
      return {
        ...newDeck
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.concat(action.newQuestion)
        }
      }
    default:
      return state
  }
}