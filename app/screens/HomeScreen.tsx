/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../components/ButtonCustom';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  text: {
    color: 'white',
    fontSize: 14,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    flex: 10,
    justifyContent: 'center',
  },
});

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="Training"
          Navigate={() => navigation.navigate('Training')}
          soundName="training.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>
          {
            'Choose your preferred mode. For beginners and first-time app users, starting with training is recommended. Advanced users can opt for the quiz mode.\n'
          }
        </Text>
        <Text style={styles.text}>Top button: training</Text>
        <Text style={styles.text}>Bottom button: quiz</Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="Quiz"
          Navigate={() => navigation.navigate('Quiz')}
          soundName="quiz.mp3"
        />
      </View>
    </View>
  );
}

export default HomeScreen;
