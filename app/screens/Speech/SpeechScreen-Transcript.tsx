/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid, {brailleMap} from '../../components/Braille';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import { Audio } from 'expo-av';
import sounds from '../../data/Sounds';
import * as FileSystem from 'expo-file-system';

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
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 10,
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
    alignItems: 'center',
  },
});

type SoundName = keyof typeof sounds;

function preProccess(str: string): string {
  let temp = str;
  temp = temp.toUpperCase();
  temp = temp.replace(/[^A-Z\s]/gm, ''); // buang selain A-Z

  return temp;
}

const arrayBufferToBase64 = (buffer: Buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

function Transcript({route, navigation}: any) {
  const {transcript: initialTranscript} = route.params;
  const [step, setStep] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const transcript = preProccess(initialTranscript);

  useEffect(() => {
    const fetchAudio = async () => {
      const xmlBody = `
        <speak version='1.0' xml:lang='id-ID'>
          <voice xml:lang='id-ID' xml:gender='Male' name='id-ID-ArdiNeural'>
            Transkripsi: ${transcript}
          </voice>
        </speak>
      `;

      try {
        const response = await axios.post(
          'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1',
          xmlBody,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': '28152ac3dfcb48a7b4222c50f6ce2c80',
              'Content-Type': 'application/ssml+xml',
              'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3',
            },
            responseType: 'arraybuffer',
          },
        );

        if (response.status === 200) {
          const audioPath = `${FileSystem.documentDirectory}output.mp3`;
          const base64Audio = arrayBufferToBase64(response.data);
          await FileSystem.writeAsStringAsync(audioPath, base64Audio, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setAudioReady(true);
        } else {
          throw new Error('Failed to fetch transcript');
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    };

    fetchAudio();
  }, [transcript]);

  const handlePress = async (soundName: SoundName) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(sounds[soundName]);
      sound.setVolumeAsync(1.0);
      sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playAudioTranscriptAudio = async (initial = false) => {
    const audioPath = `${FileSystem.documentDirectory}output.mp3`;
    try {
      const fileInfo = await FileSystem.getInfoAsync(audioPath);
      if (!fileInfo.exists) {
        console.error('Audio file does not exist');
        return;
      }

      if (initial) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      
      const { sound } = await Audio.Sound.createAsync({ uri: audioPath });
      await sound.playAsync();
    } catch (error) {
      console.error('Failed to load the sound', error);
    }
  };
  const deleteTranscriptAudio = async () => {
    const audioPath = `${FileSystem.documentDirectory}output.mp3`;
    try {
      await FileSystem.deleteAsync(audioPath);
      console.log('File deleted:', audioPath);
      setAudioReady(false);
    } catch (error) {
      console.error('Failed to delete the file:', error);
    }
  };

  useEffect(() => {
    if (step === 0 && audioReady) {
      playAudioTranscriptAudio(true);
    }
  }, [audioReady]);

  // Kalo diawal
  if (step === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="Keluar"
            Navigate={() => {
              deleteTranscriptAudio();
              navigation.navigate('Home');
            }}
            soundName="keluar"
          />
        </View>
        <TouchableOpacity
          style={styles.contentView}
          onPressIn={() => playAudioTranscriptAudio()}>
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
        </TouchableOpacity>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="balik"
            Navigate={() => {
              deleteTranscriptAudio();
              navigation.navigate('Speech');
            }}
            soundName="balik"
          />
          <ButtonCustom
            text="lanjut"
            Navigate={() => {
              setStep(prevStep => prevStep + 1);
            }}
            soundName="lanjut"
          />
        </View>
      </SafeAreaView>
    );
  } else if (step === transcript.length + 1) {
    // Kalo diakhir
    handlePress('speech_ending');
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="Keluar"
            Navigate={() => {
              deleteTranscriptAudio();
              navigation.navigate('Home');
            }}
            soundName="keluar"
          />
        </View>

        <TouchableOpacity
          style={styles.contentView}
          onPressIn={() => handlePress('speech_ending')}>
          <View style={styles.contentView}>
            <Text style={styles.text}>{'transkripsi sudah selesai\n'}</Text>
            <Text style={styles.text}>{'tombol atas: keluar'}</Text>
            <Text style={styles.text}>{'tombol bawah: balik'}</Text>
          </View>
        </TouchableOpacity>

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
            soundName="balik"
          />
        </View>
      </SafeAreaView>
    );
  } else {
    // Kalo di tengah (braille transkripsi)
    handlePress(brailleMap[transcript.charAt(step - 1)].name as SoundName);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          <ButtonCustom
            text="keluar"
            Navigate={() => {
              deleteTranscriptAudio();
              navigation.navigate('Home');
            }}
            soundName="keluar"
          />
        </View>

        <TouchableOpacity
          style={styles.contentView}
          onPressIn={() =>
            handlePress(brailleMap[transcript.charAt(step - 1)].name as SoundName)
          }>
          <View style={styles.contentView}>
            <Text style={styles.title}>
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
            soundName="balik"
          />
          <ButtonCustom
            text="lanjut"
            Navigate={() => {
              setStep(prevStep => prevStep + 1);
            }}
            soundName="lanjut"
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default Transcript;
