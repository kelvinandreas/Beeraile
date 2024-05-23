/* eslint-disable prettier/prettier */
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
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
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

function preProccess(str: string): string {
  let temp = str;
  temp = temp.toUpperCase();
  temp = temp.replace(/[^A-Z\s]/gm, ''); // buang selain A-Z

  return temp;
}

function Transcript({navigation}: any) {
  const [step, setStep] = useState(0);

  let transcript: string = '123aB cD.';
  transcript = preProccess(transcript);

  const handlePress = () => {
    const soundName = transcript.charAt(step - 1).toLowerCase() + '.mp3';
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

  // Kalo diawal
  if (step === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="Keluar"
            Navigate={() => navigation.navigate('Home')}
            soundName="keluar.mp3"
          />
        </View>

        <View style={styles.contentView}>
          <Text style={styles.text}>{'transkripsi:'}</Text>
          <Text style={styles.text}>{transcript + '\n'}</Text>
          <Text style={styles.text}>{'tombol atas: keluar'}</Text>
          <Text style={styles.text}>{'tombol bawah kiri: balik'}</Text>
          <Text style={styles.text}>{'tombol bawah kanan: lanjut\n'}</Text>
          <Text style={styles.text}>
            {'navigasi tombol akan sama untuk sesi ini.'}
          </Text>
        </View>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="balik"
            Navigate={() => {
              navigation.navigate('Speech');
            }}
            soundName="balik.mp3"
          />
          <ButtonCustom
            text="lanjut"
            Navigate={() => {
              setStep(prevStep => prevStep + 1);
            }}
            soundName="lanjut.mp3"
          />
        </View>
      </SafeAreaView>
    );
  } else if (step === transcript.length + 1) {
    // Kalo diakhir
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="Keluar"
            Navigate={() => navigation.navigate('Home')}
            soundName="keluar.mp3"
          />
        </View>

        <View style={styles.contentView}>
          <Text style={styles.text}>{'transkripsi sudah selesai\n'}</Text>
          <Text style={styles.text}>{'tombol atas: keluar'}</Text>
          <Text style={styles.text}>{'tombol bawah: balik'}</Text>
        </View>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="balik"
            Navigate={() => {
              if (step > 0) {
                setStep(prevStep => prevStep - 1);
              } else {
                navigation.navigate('Speech');
              }
            }}
            soundName="balik.mp3"
          />
        </View>
      </SafeAreaView>
    );
  } else {
    // Kalo di tengah (braille transkripsi)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="keluar"
            Navigate={() => navigation.navigate('Home')}
            soundName="keluar.mp3"
          />
        </View>

        <TouchableOpacity
          style={styles.contentView}
          onPressIn={() => handlePress()}>
          <View style={styles.contentView}>
            <Text style={styles.text}>
              {brailleMap[transcript.charAt(step - 1)].name}
            </Text>
            <BrailleGrid char={transcript.charAt(step - 1)} numRep={false} />
          </View>
        </TouchableOpacity>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="balik"
            Navigate={() => {
              setStep(prevStep => prevStep - 1);
            }}
            soundName="balik.mp3"
          />
          <ButtonCustom
            text="lanjut"
            Navigate={() => {
              setStep(prevStep => prevStep + 1);
            }}
            soundName="lanjut.mp3"
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default Transcript;
