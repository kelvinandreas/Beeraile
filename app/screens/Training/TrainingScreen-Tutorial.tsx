import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid, {brailleMap} from '../../components/Braille';
import Sound from 'react-native-sound';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  contentView: {
    flex: 10,
    justifyContent: 'center',
  },
});

const handlePress = (step: number) => {
  const soundName = tutorialList[step].toLowerCase() + '.mp3';
  console.log('🚀 ~ handlePress ~ soundName:', soundName);
  const sound = new Sound(soundName, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
    sound.setVolume(1);
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
        sound.reset();
        return;
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};

// Ini buat apa aja yg mo di tutorial
const tutorialList: string[] = [
  'A',
  // 'B',
  // 'C',
  // 'D',
  // 'E',
  // 'F',
  // 'G',
  // 'H',
  // 'I',
  // 'J',
  // 'K',
  // 'L',
  // 'M',
  // 'N',
  // 'O',
  // 'P',
  // 'Q',
  // 'R',
  // 'S',
  // 'T',
  // 'U',
  // 'V',
  // 'W',
  // 'X',
  // 'Y',
  // 'Z',
  // ' ',
  // '.',
  // ',',
  // '#',
];

function Tutorial({navigation}: any) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    handlePress(step);
  }, [step]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="keluar"
            Navigate={() => navigation.navigate('Home')}
            soundName="keluar.mp3"
          />
        </View>

        <TouchableOpacity
          style={styles.contentView}
          onPress={() => handlePress(step)}>
          <View style={styles.contentView}>
            <Text style={styles.text}>
              {brailleMap[tutorialList[step]].name}
            </Text>
            <BrailleGrid char={tutorialList[step]} numRep={false} />
          </View>
        </TouchableOpacity>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="balik"
            Navigate={() => {
              if (step > 0) {
                setStep(prevStep => prevStep - 1);
              } else {
                navigation.navigate('Number Representation');
              }
            }}
            soundName="balik.mp3"
          />
          <ButtonCustom
            text="lanjut"
            Navigate={() => {
              if (step < tutorialList.length - 1) {
                setStep(prevStep => prevStep + 1);
              } else {
                navigation.navigate('Tutorial End');
              }
            }}
            soundName="lanjut.mp3"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Tutorial;
