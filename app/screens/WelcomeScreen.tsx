/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../components/ButtonCustom';

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

function WelcomeScreen({navigation}: any) {
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
          <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>Selamat datang di</Text>
            <Image source={require('../assets/logo_horizontal.png')} />
          </View>
          <Text style={styles.text}>{'tempat anda belajar Braille!\n'}</Text>
          <Text style={styles.text}>
            {
              'untuk mulai, tekan dan tahan tombol yang ada diatas dan dibawah. lokasi tombol akan selalu berada di tempat yang sama. marilah kita memulai petualangan ini bersama!\n'
            }
          </Text>
          <Text style={styles.text}>tombol atas: keluar</Text>
          <Text style={styles.text}>tombol bawah: mulai</Text>
        </View>

        <View style={styles.buttonView}>
          <ButtonCustom
            text="mulai"
            Navigate={() => navigation.navigate('Home')}
            soundName="mulai"
          />
        </View>
      </SafeAreaView>
  );
}

export default WelcomeScreen;
