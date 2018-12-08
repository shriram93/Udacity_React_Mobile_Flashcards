import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux'
import { handleAddQuestion } from '../../store/actions';
import { material } from 'react-native-typography'

class AddCard extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle:
      <View style={{ width: '80%', height: '100%' }}>
        <View style={{ zIndex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, top: 0, top: 0, bottom: 0 }} >
          <Text style={material.subheadingWhite}>{navigation.state.params.pageTitle}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Text style={material.titleWhite}>Add card</Text>
        </View>
      </View>
  });


  state = {
    question: '',
    answer: '',
    questionErrorMsg: '',
    answerErrorMsg: ''
  };
  render() {
    const { navigation } = this.props;
    const deckId = navigation.getParam('deckId', {});

    const { question, answer, questionErrorMsg, answerErrorMsg } = this.state;

    const onSubmit = () => {
      if (question === '') {
        this.setState({
          questionErrorMsg: 'Should not be empty'
        })
      }
      if (answer === '') {
        this.setState({
          answerErrorMsg: 'Should not be empty'
        })
      }
      if (question !== '' && answer !== '') {
        this.props.dispatch(handleAddQuestion(deckId, { question, answer })).then(() => {
          this.props.navigation.goBack();
        })
      }
    }
    return (
      <View style={styles.addCardContainer} >
        <View style={styles.inputGroupContainer}>
          <View >
            <TextField
              label='Question'
              value={question}
              error={questionErrorMsg}
              onFocus={() => this.setState(
                {
                  questionErrorMsg: ''
                }
              )}
              lineWidth={1} onChangeText={(question) => this.setState({ question, questionErrorMsg: '' })}
            />
          </View>
          <View>
            <TextField
              label='Answer'
              value={answer}
              lineWidth={1}
              error={answerErrorMsg}
              onFocus={() => this.setState(
                {
                  answerErrorMsg: ''
                }
              )}
              onChangeText={(answer) => this.setState({ answer, answerErrorMsg: '' })}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={buttonStyle} onPress={onSubmit} raised primary text="Submit" />
        </View>
      </View >
    );
  }
}

const buttonStyle = {
  container: {
    width: 200
  }
};

const styles = StyleSheet.create({
  addCardContainer: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputGroupContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect()(AddCard)