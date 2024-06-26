import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid, {brailleMap} from '../../components/Braille';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import sounds from '../../data/Sounds';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  text: {
    color: 'white',
    fontSize: 48,
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
    alignItems: "center",
  },
});

type SoundName = keyof typeof sounds;

const handlePress = async (step: number) => {
  const soundName = tutorialList[step].toLowerCase() as SoundName
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync(sounds[soundName]);
    sound.setVolumeAsync(1.0);
    sound.playAsync();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

// Ini buat apa aja yg mo di tutorial
const tutorialList: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
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
  'X',
  'Y',
  'Z',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Home')}
          soundName="keluar"
        />
      </View>

      <TouchableOpacity
        style={styles.contentView}
        onPressIn={() => handlePress(step)}>
        <View style={styles.contentView}>
          <Text style={styles.text}>{brailleMap[tutorialList[step]].name}</Text>
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
          soundName="balik"
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
          soundName="lanjut"
        />
      </View>
    </SafeAreaView>
  );
}
export default Tutorial;
