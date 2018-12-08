import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'
import { material } from 'react-native-typography'
import { Button } from 'react-native-material-ui';
import { systemWeights } from 'react-native-typography'
import { Card } from 'react-native-material-ui';

class FlipCard extends Component {
  // Flip card variables
  animatedValue = new Animated.Value(0);
  value = 0;

  componentDidMount() {
    // Intitializing flip card
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    const { question } = this.props
    const backAnimatedStyle = {
      transform: [{
        rotateY: this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg']
        })
      }]
    }

    const frontAnimatedStyle = {
      transform: [{
        rotateY: this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg']
        })
      }]
    }

    const frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })

    const backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[{ position: "absolute", width: '100%', height: '100%', top: 0 }, frontAnimatedStyle, { opacity: frontOpacity }]}>
          <Card style={cardStyle} >
            <View style={{ flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center', padding: 10 }}>
              <Text style={[material.subheading, systemWeights.semibold, { textAlign: 'center' }]}>{question.question}</Text>
            </View>
            <Button onPress={() => this.flipCard()} style={flipCardButtonStyle} raised primary text="Answer" />
          </Card>
        </Animated.View>
        <Animated.View style={[{ position: "absolute", width: '100%', height: '100%', top: 0 }, { position: "absolute" }, backAnimatedStyle, { opacity: backOpacity }]}>
          <Card style={cardStyle} >
            <View style={{ flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center', padding: 10 }}>
              <Text style={[material.subheading, { textAlign: 'center' }]}>{question.answer}</Text>
            </View>
            <Button onPress={() => this.flipCard()} style={flipCardButtonStyle} raised primary text="Question" />
          </Card>
        </Animated.View>
      </View>
    )
  }
}

const cardStyle = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const flipCardButtonStyle = {
  container: {
    margin: 10,
  }
}

export default FlipCard