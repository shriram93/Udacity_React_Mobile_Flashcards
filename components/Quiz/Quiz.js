import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { material, systemWeights } from 'react-native-typography'
import { Button } from 'react-native-material-ui';
import FlipCard from './FlipCard'

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    score: 0
  };

  componentDidMount() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck', {});
  }


  static navigationOptions = ({ navigation }) => ({
    headerTitle:
      <View style={{ width: '80%', height: '100%' }}>
        <View style={{ zIndex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 0, top: 0, bottom: 0 }} >
          <Text style={material.subheadingWhite}>{navigation.state.params.pageTitle}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Text style={material.titleWhite}>Quiz</Text>
        </View>
      </View>
  });

  addScore() {
    this.setState((prevState) => (
      {
        score: prevState.score + 1
      }))
    this.incrementQuestions()
  }



  incrementQuestions() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck', {});
    if (this.state.currentQuestion < deck.questions.length) {
      this.setState((prevState) => (
        {
          currentQuestion: prevState.currentQuestion + 1
        }))
    }
  }

  resetQuiz() {
    this.setState(
      {
        currentQuestion: 0,
        score: 0
      })
  }

  render() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck', {});

    const { currentQuestion, score } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {deck.questions.length === 0 &&
          <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ ...material.subheadingObject, textAlign: 'center' }}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
          </View>}
        {deck.questions.length > 0 &&
          <View style={styles.quizContainer}>
            {this.state.currentQuestion < deck.questions.length && <View style={[{ flex: 1, width: '100%' }]}>
              <View style={[{ width: '100%' }]}>
                <Text style={[material.subheading, systemWeights.semibold, { textAlign: 'left' }]}>{currentQuestion + 1}/{deck.questions.length}</Text>
              </View>
              <View style={styles.questionContainer}>
                <FlipCard question={deck.questions[currentQuestion]} />
              </View>
            </View>}
            {deck.questions.length > 0 && this.state.currentQuestion === deck.questions.length && <View style={[{ flex: 1, width: '100%' }]}>
              <View style={styles.scoreContainer}>
                <Text style={[material.subheading, systemWeights.semibold]}>Score</Text>
                <Text style={material.subheading}>{score}</Text>
              </View>
            </View>}
            <View style={styles.buttonContainer}>
              {this.state.currentQuestion < deck.questions.length && <View>
                <Button onPress={this.addScore.bind(this).bind(this)} style={correctButtonStyle} raised primary text="Correct" />
                <Button onPress={this.incrementQuestions.bind(this)} style={incorrectButtonStyle} raised primary text="Incorrect" />
              </View>}
              {deck.questions.length > 0 && this.state.currentQuestion === deck.questions.length && <View>
                <Button onPress={this.resetQuiz.bind(this)} style={buttonStyle} raised primary text="Restart Quiz" />
                <Button onPress={() => navigation.goBack()} style={buttonStyle} raised text="Back to Deck" />
              </View>}
            </View>
          </View>}
      </View>
    );
  }
}

const buttonStyle = {
  container: {
    width: 200,
    margin: 20
  }
}

const correctButtonStyle = {
  container: {
    ...buttonStyle.container,
    backgroundColor: '#4CAF50'
  }
};

const incorrectButtonStyle = {
  container: {
    ...correctButtonStyle.container,
    backgroundColor: '#F44336',
  }
};

const styles = StyleSheet.create({
  quizContainer: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionContainer: {
    flex: 1,
    width: '100%',
    padding: 20
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Quiz