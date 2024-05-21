import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizScreen from './app/screens/QuizScreen';
import TrainingScreen from './app/screens/Training/TrainingScreen';
<<<<<<< Updated upstream
import Tutorial1 from './app/screens/Training/Tutorial1';
import Tutorial2 from './app/screens/Training/Tutorial2';
=======
import NumRep from './app/screens/Training/TrainingScreen-NumRep';
import Tutorial from './app/screens/Training/TrainingScreen-Tutorial';
import TutorialEnd from './app/screens/Training/TrainingScreen-End';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <Stack.Screen name="Tutorial1" component={Tutorial1} />
        <Stack.Screen name="Tutorial2" component={Tutorial2} />
=======
        <Stack.Screen name="Number Representation" component={NumRep} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="Tutorial End" component={TutorialEnd} />
>>>>>>> Stashed changes
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
