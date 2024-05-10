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

function TrainingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="Previous"
          Navigate={() => navigation.navigate('Home')}
          soundName="previous.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>
          {
            "Braille is a special way for people who can't see well or at all to read and write using their fingers. Instead of letters like A, B, and C, Braille uses small bumps that you can feel with your fingers. These bumps are arranged in patterns that stand for letters, numbers, and even special words!.\n"
          }
        </Text>
        <Text style={styles.text}>
          {
            'each letter is a 3 by 2 grid with bumps that have their own special numbers to show where they are.\n'
          }
        </Text>
        <Text style={styles.text}>{'Top button: previous'}</Text>
        <Text style={styles.text}>{'Bottom button: next\n'}</Text>
        <Text style={styles.text}>
          {'the button will be the same for this session'}
        </Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="Next"
          Navigate={() => navigation.navigate('Welcome')}
          soundName="next.mp3"
        />
      </View>
    </View>
  );
}
export default TrainingScreen;
