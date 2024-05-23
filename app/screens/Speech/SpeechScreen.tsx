/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonCustom} from '../../components/ButtonCustom';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';

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
    textAlign: 'center',
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
    alignItems: 'center',
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

function SpeechScreen({navigation}) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AudioRecord.init({
      sampleRate: 16000,
      channels: 1, 
      bitsPerSample: 16, 
      wavFile: 'input.wav', 
    });

    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const audioPermission = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (audioPermission !== RESULTS.GRANTED) {
      const audioPermissionRequest = await request(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      if (audioPermissionRequest !== RESULTS.GRANTED) {
        console.warn('Audio permission not granted');
      }
    }

    const writePermission = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    if (writePermission !== RESULTS.GRANTED) {
      const writePermissionRequest = await request(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      if (writePermissionRequest !== RESULTS.GRANTED) {
        console.warn('Write permission not granted');
      }
    }

    const readPermission = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    if (readPermission !== RESULTS.GRANTED) {
      const readPermissionRequest = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (readPermissionRequest !== RESULTS.GRANTED) {
        console.warn('Read permission not granted');
      }
    }

    const managePermission = await check(
      PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE,
    );
    if (managePermission !== RESULTS.GRANTED) {
      const managePermissionRequest = await request(
        PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE,
      );
      if (managePermissionRequest !== RESULTS.GRANTED) {
        console.warn('Manage external storage permission not granted');
      }
    }
  };

  const startRecording = async () => {
    const permission = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (permission !== RESULTS.GRANTED) {
      console.warn('Audio permission not granted');
      return;
    }

    setRecording(true);
    console.log('Starting recording...');
    AudioRecord.start();
  };

  const stopRecording = async () => {
    if (!recording) return;

    setLoading(true);
    console.log('Stopping recording...');
    let audioFile = await AudioRecord.stop();
    setRecording(false);
    console.log('Recorded audio file path:', audioFile);

    // Save the file to the Downloads directory
    const newFilePath = `${RNFS.DownloadDirectoryPath}/input.wav`;
    RNFS.copyFile(audioFile, newFilePath)
      .then(() => {
        console.log('File copied to:', newFilePath);

        // Check if the file exists and has content
        RNFS.stat(newFilePath)
          .then(stats => {
            if (stats.size > 0) {
              console.log('Recorded file size:', stats.size);
              // Navigate to the Transcript screen after recording
              navigation.navigate('Transcript', {filePath: newFilePath});
            } else {
              console.error('Recorded file is empty');
              Alert.alert('Recording Error', 'The recorded file is empty.');
            }
          })
          .catch(err => {
            console.error('Failed to get file stats:', err);
          });
      })
      .catch(error => {
        console.error('Failed to copy file:', error);
      });

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
      <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Home')}
          soundName="keluar.mp3"
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
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="Rekam"
          Navigate={() => {}}
          soundName="lanjut.mp3"
          onPressIn={startRecording}
          onPressOut={stopRecording}
        />
      </View>
    </SafeAreaView>
  );
}

export default SpeechScreen;
