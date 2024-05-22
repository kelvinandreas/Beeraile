/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../components/ButtonCustom';
import {SafeAreaView} from 'react-native-safe-area-context';

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

function QuizScreen({navigation}: any) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="Keluar"
            Navigate={() => navigation.navigate('Home')}
            soundName="keluar.mp3"
          />
        </View>

        <View style={styles.contentView}>
          <Text style={styles.text}>
            {
              "Welcome to Quiz Mode! Get ready to decode Braille patterns and speak out their translations to answer. Remember, you'll be timed, indicated by sound, so think fast! the success sound will be played if you answer correctly, you'll hear a different sound if you don't.\n"
            }
          </Text>
          <Text style={styles.text}>{'Top button: exit quiz mode'}</Text>
          <Text style={styles.text}>{'Bottom button: next\n'}</Text>
          <Text style={styles.text}>
            {
              'the button will be the same for this session. Please note that the NEXT button will only be available if you guessed the answer correctly or the timer runs out. Good luck!'
            }
          </Text>
        </View>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="Lanjut"
            Navigate={() => navigation.navigate('Welcome')}
            soundName="lanjut.mp3"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default QuizScreen;
