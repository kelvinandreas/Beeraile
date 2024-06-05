/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
// import Sound from 'react-native-sound';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const handlePress = (soundName: string) => {
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

function TrainingEnd({navigation}: any) {
  useEffect(() => {
    handlePress('ending.mp3');
  }, []);

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
        onPress={() => handlePress('ending.mp3')}>
        <View style={styles.contentView}>
          <Text style={styles.text}>
            {
              'Selamat! Anda telah mempelajari dasar-dasar Braille! Anda dapat mengulangi pelatihan atau memilih mode lain.\n'
            }
          </Text>
          <Text style={styles.text}>{'tombol atas dan bawah: keluar'}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Home')}
          soundName="keluar.mp3"
        />
      </View>
    </SafeAreaView>
  );
}
export default TrainingEnd;
