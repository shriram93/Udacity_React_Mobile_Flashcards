import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-material-ui';
import DeckSummary from '../DeckSummary/DeckSummary'
import { handleRemoveDeck } from '../../store/actions';
import { connect } from 'react-redux'
import { material } from 'react-native-typography'
import { setLocalNotification, clearLocalNotification } from '../../utils/helpers'
class DeckInfo extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={material.titleWhite}>{navigation.state.params.pageTitle}</Text>
  });

  render() {
    const { deck } = this.props;
    const onDeleteDeck = () => {
      this.props.dispatch(handleRemoveDeck(deck.deckId)).then(() => {
        this.props.navigation.goBack();
      })
    }

    const startQuiz = () => {
      clearLocalNotification()
        .then(setLocalNotification())
      this.props.navigation.navigate('Quiz', { deck, pageTitle: deck.title })
    }

    return (
      <View style={styles.deckInfoContainer}>
        <View style={styles.deckSummaryContainer}>
          {deck && <DeckSummary deck={deck} />}
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.props.navigation.navigate('AddCard', { deckId: deck.deckId, pageTitle: deck.title })} style={buttonStyle} primary raised text="Add Card" />
          <Button style={buttonStyle} onPress={startQuiz} raised text="Start Quiz" />
          <Button onPress={onDeleteDeck} style={
            Object.assign({}, buttonStyle, {
              text: { color: 'red' }
            })} text="Delete Deck" />
        </View>
      </View>)
  }
}

const buttonStyle = {
  container: {
    width: 200,
    margin: 20
  }
};
const styles = StyleSheet.create({
  deckInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckSummaryContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStatetoProps = (decks, props) => {
  const decksArray = Object.keys(decks).map(i => Object.assign({}, { deckId: i }, decks[i]))
  const { navigation } = props;
  const deckId = navigation.getParam('deckId', {});
  const deck = decksArray.filter(deck => deck.deckId === deckId)[0]
  return {
    deck
  }
}

export default connect(mapStatetoProps)(DeckInfo)