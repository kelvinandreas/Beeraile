import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid from '../../components/Braille';
import { Audio } from 'expo-av';
import sounds from '../../data/Sounds';

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

type SoundName = keyof typeof sounds;

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

function NumRep({navigation}: any) {
  useEffect(() => {
    handlePress('representasi_nomor');
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
        onPress={() => handlePress('representasi_nomor')}>
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
