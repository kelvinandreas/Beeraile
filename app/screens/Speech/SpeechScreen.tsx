/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonCustom} from '../../components/ButtonCustom';
import { Audio } from 'expo-av';
import { AndroidAudioEncoder, AndroidOutputFormat, IOSOutputFormat } from 'expo-av/build/Audio';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>("");
  
  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const recordingOptions = {
          android: {
            ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
            extension: '.wav',
            outputFormat: AndroidOutputFormat.DEFAULT,
            audioEncoder: AndroidAudioEncoder.DEFAULT,
          },
          ios: {
            ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
            extension: '.wav',
            outputFormat: IOSOutputFormat.LINEARPCM,
          },
          web: {
            mimeType: 'audio/wav',
            bitsPerSecond: 128000,
          },
        };
        const { recording } = await Audio.Recording.createAsync(recordingOptions);
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
        setRecordingData({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI()
        });
        await sendTranscriptionRequest(recording.getURI());
      }
    }
  }

  function getDurationFormatted(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }
  
  async function sendTranscriptionRequest(audioUri: string | null) {
    if (!audioUri) return;

    setLoading(true);

    try {
      const apiUrl = 'https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=id-ID';
      const subscriptionKey = '28152ac3dfcb48a7b4222c50f6ce2c80'; // DELETE LATER
      const headers = {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'audio/wav',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: {
          uri: audioUri,
          type: 'audio/wav',
          name: 'audio_file.wav',
        }
      });
        
      if (!response.ok) {
        throw new Error('Failed to fetch transcription');
      }

      const data = await response.json();
      const transcript = data.DisplayText || 'Suara Tidak Terdeteksi';
      setTranscription(transcript);
    } catch (error) {
      console.error('Failed to fetch transcription:', error);
      Alert.alert('Error', 'Failed to fetch transcription');
    } finally {
      setLoading(false);
    }
  }

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
        {transcription && (
          <Text style={styles.text}>{transcription}</Text>  
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
