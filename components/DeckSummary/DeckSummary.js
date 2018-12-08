import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { materialColors } from 'react-native-typography'
import { material, systemWeights } from 'react-native-typography'

class DeckSummary extends Component {
  render() {
    return (
      <View style={styles.deckInfoContiner}>
        <Text style={[material.subheading, systemWeights.bold, styles.deckTitle]}>{this.props.deck.title}</Text>
        <Text style={{ ...material.body2Object, color: materialColors.blackSecondary }}>{this.props.deck.questions.length} cards</Text>
      </View>)
  }
}

const styles = StyleSheet.create({
  deckInfoContiner: {
    padding: 20,
    alignItems: 'center',
  },
  deckTitle: {
    margin: 5,
  }
});
export default DeckSummary