import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid, {brailleMap} from '../../components/Braille';

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
    textAlign: 'justify',
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

// Ini buat apa aja yg mo di tutorial
const tutorialList: string[] = [
  'A',
  'B',
  'C',
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

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Home')}
          soundName="previous.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>{brailleMap[tutorialList[step]].name}</Text>
        <BrailleGrid char={tutorialList[step]} numRep={false} />
      </View>

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
          soundName="next.mp3"
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
          soundName="next.mp3"
        />
      </View>
    </View>
  );
}
export default Tutorial;
