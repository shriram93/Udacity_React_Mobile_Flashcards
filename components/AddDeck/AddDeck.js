import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import { withNavigation } from 'react-navigation';
import { handleAddDeck } from '../../store/actions'
import { connect } from 'react-redux'

class AddDeck extends Component {
  state = {
    deckName: '',
    deckNameErrorMsg: ''
  };
  render() {
    let { deckName, deckNameErrorMsg } = this.state;
    const onSubmit = () => {
      if (deckName === '') {
        this.setState({
          deckNameErrorMsg: 'Should not be empty'
        })
      }
      if (deckName !== '') {
        this.props.dispatch(handleAddDeck(deckName)).then( () => {
          this.setState({
            deckName: ''
          });
          this.props.navigation.goBack();
        })

      }
    }
    return (
      <View style={styles.addDeckContainer} >
        <View style={styles.inputGroupContainer}>
          <View >
            <TextField
              label='Name'
              value={deckName}
              error={deckNameErrorMsg}
              onFocus={() => this.setState(
                {
                  deckNameErrorMsg: ''
                }
              )}
              lineWidth={1} onChangeText={(deckName) => this.setState({ deckName, deckNameErrorMsg: '' })}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={buttonStyle} onPress={onSubmit} raised primary text="Create Deck" />
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
  addDeckContainer: {
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

export default withNavigation(connect()(AddDeck))