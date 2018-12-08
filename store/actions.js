export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

import { fetchDecks, saveNewDeck, deleteDeck, saveNewQuestion } from '../utils/api'

export function handleInitialDecks() {
  return (dispatch) => {
    fetchDecks().then((decks) => {
      dispatch(loadDecks(decks))
    })
  }
}

export function handleAddDeck(deckName) {
  return (dispatch) => {
    return new Promise((resolve) => {
      saveNewDeck(deckName).then((newDeck) => {
        resolve(dispatch(addDeck(newDeck)))
      })
    })

  }
}

export function handleRemoveDeck(deckId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      deleteDeck(deckId).then(() => {
        resolve(dispatch(removeDeck(deckId)))
      })
    })

  }
}

export function handleAddQuestion(deckId,newQuestion) {
  return (dispatch) => {
    return new Promise((resolve) => {
      saveNewQuestion(deckId, newQuestion).then(() => {
        resolve(dispatch(addQuestion(deckId, newQuestion)))
      })
    })

  }
}

export function loadDecks(decks) {
  return {
    type: LOAD_DECKS,
    decks
  }
}

export function addDeck(newDeck) {
  return {
    type: ADD_DECK,
    newDeck
  }
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId
  }
}

export function addQuestion(deckId, newQuestion) {
  return {
    type: ADD_QUESTION,
    deckId,
    newQuestion
  }
}