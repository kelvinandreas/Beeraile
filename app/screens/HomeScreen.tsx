/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
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

function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Welcome')}
          soundName="training.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>
          {
            'pilih mode. untuk pemula, mode latihan adalah opsi yang disarankan.\n'
          }
        </Text>
        <Text style={styles.text}>tombol atas: keluar</Text>
        <Text style={styles.text}>tombol bawah kiri: latihan</Text>
        <Text style={styles.text}>tombol bawah KANAN: SUARA</Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="latihan"
          Navigate={() => navigation.navigate('Training')}
          soundName="quiz.mp3"
        />
        <ButtonCustom
          text="suara"
          Navigate={() => navigation.navigate('Training')}
          soundName="quiz.mp3"
        />
      </View>
    </View>
  );
}

export default HomeScreen;
