import {StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid from '../../components/Braille';
// import Sound from 'react-native-sound';

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

function NumRep({navigation}: any) {
  useEffect(() => {
    handlePress('representasi_nomor.mp3');
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

      <TouchableOpacity
        style={styles.contentView}
        onPress={() => handlePress('representasi_nomor.mp3')}>
        <View style={styles.contentView}>
          <Text style={styles.text}>{'representasi nomor'}</Text>
          <BrailleGrid char={' '} numRep={true} />
        </View>
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="balik"
          Navigate={() => navigation.navigate('Training')}
          soundName="balik"
        />
        <ButtonCustom
          text="lanjut"
          Navigate={() => navigation.navigate('Tutorial')}
          soundName="lanjut"
        />
      </View>
    </SafeAreaView>
  );
}
export default NumRep;
