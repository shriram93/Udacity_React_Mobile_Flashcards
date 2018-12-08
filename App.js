import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import DeckView from './components/DeckView/DeckView';
import { Constants } from 'expo'
import DeckInfo from './components/DeckInfo/DeckInfo'
import AddCard from './components/AddCard/AddCard'
import AddDeck from './components/AddDeck/AddDeck'
import Quiz from './components/Quiz/Quiz'
import { material } from 'react-native-typography'
import { systemWeights } from 'react-native-typography'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { blueColor } from './utils/colors'
import { setLocalNotification,clearLocalNotification } from './utils/helpers'

function DecksStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const defaultTabStyle = {
  headerStyle: { backgroundColor: blueColor },
  headerTintColor: 'white',
}

const StackForDecks = createStackNavigator({
  DeckListView: {
    screen: DeckView,
    navigationOptions: { header: null }
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: () => (defaultTabStyle)
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: () => (defaultTabStyle)
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => (defaultTabStyle)
  }
}, {
    initialRouteName: 'DeckListView',
    transitionConfig: () => ({
      containerStyle: {
        marginTop: Constants.statusBarHeight * -1,
      }
    }),
  });

const HomeTab = createMaterialTopTabNavigator({
  Home: {
    screen: StackForDecks,
    navigationOptions: () => ({
      tabBarLabel: <Text style={[material.body1White, systemWeights.bold, { padding: 10 }]}>DECKS</Text>
    })

  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: () => ({
      tabBarLabel: <Text style={[material.body1White, systemWeights.bold, { padding: 10 }]}>ADD DECK</Text>
    })
  }
});


StackForDecks.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const AppContainer = createAppContainer(HomeTab);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }}>
          <DecksStatusBar backgroundColor={blueColor} barStyle="light-content" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

