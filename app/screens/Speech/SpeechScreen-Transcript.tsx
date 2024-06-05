/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid, {brailleMap} from '../../components/Braille';
// import Sound from 'react-native-sound';
import {SafeAreaView} from 'react-native-safe-area-context';
// import axios from 'axios';
// import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

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
  },
});
function preProccess(str: string): string {
  let temp = str;
  temp = temp.toUpperCase();
  temp = temp.replace(/[^A-Z\s]/gm, ''); // buang selain A-Z

  return temp;
}

function Transcript({route, navigation}: any) {
  const {transcript: initialTranscript} = route.params;
  const [step, setStep] = useState(0);
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

      // try {
      //   const response = await axios.post(
      //     'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1',
      //     xmlBody,
      //     {
      //       headers: {
      //         'Ocp-Apim-Subscription-Key': '{subscription-key}',
      //         'Content-Type': 'application/ssml+xml',
      //         'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3',
      //       },
      //       responseType: 'arraybuffer',
      //     },
      //   );

      //   if (response.status === 200) {
      //     const audioPath = `${RNFS.DownloadDirectoryPath}/output.mp3`;
      //     const buffer = Buffer.from(response.data, 'binary').toString(
      //       'base64',
      //     );
      //     await RNFS.writeFile(audioPath, buffer, 'base64');

      //     const sound = new Sound(audioPath, '', error => {
      //       if (error) {
      //         console.log('Failed to load the sound', error);
      //         return;
      //       }
      //       sound.play(() => {
      //         sound.release();
      //       });
      //     });
      //   } else {
      //     throw new Error('Failed to fetch transcript');
      //   }
      // } catch (error) {
      //   console.error('Error fetching audio:', error);
      // }
    };

    fetchAudio();
  }, [transcript]);

  const handlePress = (param: string) => {
    // const soundName = param.toLowerCase() + '.mp3';
    // const sound = new Sound(soundName, Sound.MAIN_BUNDLE, error => {
    //   if (error) {
    //     console.log('Failed to load the sound', error);
    //     return;
    //   }
    //   sound.setVolume(1);
    //   sound.play(success => {
    //     if (success) {
    //       console.log('successfully finished playing');
    //       sound.reset();
    //       return;
    //     } else {
    //       console.log('playback failed due to audio decoding errors');
    //     }
    //   });
    // });
  };

  const playAudioTranscriptAudio = async () => {
    // const audioPath = `${RNFS.DownloadDirectoryPath}/output.mp3`;
    // const sound = new Sound(audioPath, '', error => {
    //   if (error) {
    //     console.log('Failed to load the sound', error);
    //     return;
    //   }
    //   sound.play(() => {
    //     sound.release();
    //   });
    // });
  };
  const deleteTranscriptAudio = async () => {
    // const audioPath = `${RNFS.DownloadDirectoryPath}/output.mp3`;
    // try {
    //   await RNFS.unlink(audioPath);
    //   console.log('File deleted:', audioPath);
    // } catch (error) {
    //   console.error('Failed to delete the file:', error);
    // }
  };

  // Kalo diawal
  if (step === 0) {
    playAudioTranscriptAudio();
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
    handlePress(brailleMap[transcript.charAt(step - 1)].name);
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
            handlePress(brailleMap[transcript.charAt(step - 1)].name)
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
