/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonCustom} from '../../components/ButtonCustom';
import { Audio } from 'expo-av';

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
  keluarButton: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keluarButtonText: {
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

type RecordingData = {
  sound: Audio.Sound;
  duration: string;
  file: string | null;
};

function SpeechScreen({navigation}: any) {
  
  const [recording, setRecording] = React.useState<Audio.Recording | undefined>(undefined);
  const [recordingData, setRecordingData] = React.useState<RecordingData | null>(null);
  
  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        if (recordingData?.sound) {
          await recordingData.sound.unloadAsync();
        }
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }

  async function stopRecording() {
    if (recording) {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      if (status.isLoaded && status.durationMillis !== undefined) {
        console.log("tset")
        setRecordingData({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI()
        });
      }
    }
  }

  function getDurationFormatted(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }
  
    // const handleNavigateToTranscript = async (audioUri: any) => {
  //   setLoading(true);

  //   try {
  //     const response = await RNFetchBlob.fetch(
  //       'POST',
  //       'https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=id-ID',
  //       {
  //         'Ocp-Apim-Subscription-Key': '{subscription-key}',
  //         'Content-Type': 'audio/wav',
  //       },
  //       RNFetchBlob.wrap(audioUri),
  //     );
  //     const responseJson = await response.json();
  //     if (response.info().status === 200) {
  //       let transcript = responseJson.DisplayText;
  //       if (transcript === '') {
  //         transcript = 'Suara Tidak Terdeteksi';
  //       }
  //       navigation.navigate('Transcript', {transcript: transcript});

  //       await RNFS.unlink(audioUri);
  //       console.log('File deleted:', audioUri);
  //     } else {
  //       throw new Error('Failed to fetch transcript');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to fetch transcript', [
  //       {
  //         text: 'OK',
  //         onPress: () => navigation.navigate('Speech'),
  //       },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {

  }, []); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Home')}
          soundName="keluar"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>
          {
            'selamat datang di mode suara. tekan dan tahan tombol bawah untuk mulai merekam.\n'
          }
        </Text>
        <Text style={styles.text}>{'tombol atas: keluar'}</Text>
        <Text style={styles.text}>{'tombol bawah: rekam'}</Text>

        {recordingData && recordingData.file && (
          <View style={styles.contentView}>
            <Text style={styles.text}>
              {'Recorded file path:'}
            </Text>
            <Text style={styles.text}>
              {recordingData.file}
            </Text>
          </View>
        )}

        {/* {loading && <ActivityIndicator size="large" color="#00ff00" />} */}
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="Rekam"
          Navigate={() => {}}
          soundName="a"
          onPressIn={startRecording}
          onPressOut={stopRecording}
        />
      </View>
    </SafeAreaView>
  );
}

export default SpeechScreen;
