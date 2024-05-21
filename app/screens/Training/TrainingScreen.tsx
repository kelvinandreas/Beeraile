/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';

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

function TrainingScreen({navigation}: any) {
  return (
    <View style={styles.container}>
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
            'Braille adalah metode khusus bagi orang yang memiliki gangguan penglihatan maupun tunanetra untuk membaca dan menulis menggunakan indera peraba. Alih-alih menggunakan huruf seperti A, B, dan C, Braille menggunakan tonjolan-tonjolan kecil yang dapat dirasakan dengan jari. Tonjolan-tonjolan ini diatur dalam pola yang mewakili huruf, angka, dan bahkan kata-kata khusus!\n'
          }
        </Text>
        <Text style={styles.text}>
          {
            'Setiap huruf dalam Braille terdiri dari grid 3 kali 2 dengan tonjolan yang memiliki nomor-nomor khusus untuk menunjukkan posisinya.\n'
          }
        </Text>
        <Text style={styles.text}>{'tombol atas: keluar'}</Text>
        <Text style={styles.text}>{'tombol bawah kiri: balik\n'}</Text>
        <Text style={styles.text}>{'tombol bawah KANAN: lanjut\n'}</Text>
        <Text style={styles.text}>
          {'the navigasi tombol akan sama untuk sesi ini.'}
        </Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="balik"
          Navigate={() => navigation.navigate('Home')}
          soundName="balik.mp3"
        />
        <ButtonCustom
          text="lanjut"
          Navigate={() => navigation.navigate('Number Representation')}
          soundName="lanjut.mp3"
        />
      </View>
    </View>
  );
}
export default TrainingScreen;
