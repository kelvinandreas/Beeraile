import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpeechScreen from './app/screens/Speech/SpeechScreen';
import TrainingScreen from './app/screens/Training/TrainingScreen';
import NumRep from './app/screens/Training/TrainingScreen-NumRep';
import Tutorial from './app/screens/Training/TrainingScreen-Tutorial';
import TutorialEnd from './app/screens/Training/TrainingScreen-End';
import Transcript from './app/screens/Speech/SpeechScreen-Transcript';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Training" component={TrainingScreen} />
        <Stack.Screen name="Number Representation" component={NumRep} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="Tutorial End" component={TutorialEnd} />
        <Stack.Screen name="Speech" component={SpeechScreen} />
        <Stack.Screen name="Transcript" component={Transcript} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
