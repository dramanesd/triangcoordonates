import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

import Home from './App/Components/Home';
import AddForm from './App/Components/AddForm';
import About from './App/Components/About';

const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: {screen: Home},
    Add: {screen: AddForm},
    Me: {screen: About},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      // //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#7B1FA2',
      },
      headerTintColor: '#FFFFFF',
      title: 'Coordonnées',
      headerRight: () => (
        <Icon.Button
          type={'MaterialIcons'}
          name={'add-circle'}
          size={30}
          underlayColor={'transparent'}
          backgroundColor={'transparent'}
          onPress={() => navigation.navigate('Add')}
        />
      ),
    }),
  },
);

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeStack},
    Add: {screen: AddForm},
    Me: {screen: About},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : ''}`;
        } else if (routeName === 'Add') {
          iconName = `add-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Me') {
          iconName = `info${focused ? '' : '-outline'}`;
        }
        return (
          <IconComponent
            type={'MaterialIcons'}
            name={iconName}
            size={25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FFF',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#7B1FA2',
        borderColor: 'transparent',
      },
      showLabel: false,
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);

class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppContainer />;
  }
}

export default App;
