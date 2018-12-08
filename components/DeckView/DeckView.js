import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import DeckSummary from '../DeckSummary/DeckSummary'
import { Card } from 'react-native-material-ui';
import { connect } from 'react-redux'
import { handleInitialDecks } from '../../store/actions'

class DeckView extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialDecks())
  }
  render() {
    return (<ScrollView style={styles.deckView}>
      {this.props.decks.map((deck) => (
        <View key={deck.deckId} style={styles.cardContiner}>
          <Card>
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('DeckInfo',
              { deckId: deck.deckId, pageTitle: deck.title })}>
              <View>
                <DeckSummary deck={deck} />
              </View>
            </TouchableNativeFeedback>
          </Card>
        </View>
      ))}
    </ScrollView>)
  }
}

const styles = StyleSheet.create({
  deckView: {
    alignSelf: 'stretch',
    marginTop: 30
  },
  cardContiner: {
    margin: 10
  }
});

const mapStatetoProps = (decks) => {
  const decksArray = Object.keys(decks).map(i => Object.assign({},{deckId:i},decks[i]))
  return {
    decks: decksArray
  }
}

export default connect(mapStatetoProps)(DeckView)