import { AsyncStorage } from 'react-native'
import { dummyDecks, DECKS_STORAGE_KEY } from './_DATA'
import { toTitleCase } from './helpers'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => results === null || results === '{}' ?
      (() => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyDecks));
        return dummyDecks;
      })()
      : JSON.parse(results)
    );
}

export function saveNewDeck(deckName) {
  const newDeck = {
    [toTitleCase(deckName)]: {
      title: deckName,
      questions: []
    }
  };
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck)).then(() => newDeck);
}

export function deleteDeck(deckId) {
  return fetchDecks().then(decks => {
    delete decks[deckId];
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function saveNewQuestion(deckId, newQuestion) {
  return fetchDecks().then(decks => {
    decks[deckId].questions.concat(newQuestion)
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  })
}