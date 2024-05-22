/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect } from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import {SafeAreaView} from 'react-native-safe-area-context';

import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

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
});

function SpeechScreen({navigation}: any) {
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
        <Text style={styles.text}>
          {
            'selamat datang di mode suara. tekan dan tahan tombol bawah untuk mulai merekam.\n'
          }
        </Text>
        <Text style={styles.text}>{'tombol atas: keluar'}</Text>
        <Text style={styles.text}>{'tombol bawah: rekam'}</Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="rekam"
          Navigate={() => navigation.navigate('Transcript')}
          soundName="lanjut.mp3"
        />
      </View>
    </SafeAreaView>
  );
}
export default SpeechScreen;
