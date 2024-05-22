/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../components/ButtonCustom';
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

function HomeScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Welcome')}
          soundName="keluar.mp3"
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
        <Text style={styles.text}>tombol bawah kanan: suara</Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="latihan"
          Navigate={() => navigation.navigate('Training')}
          soundName="latihan.mp3"
        />
        <ButtonCustom
          text="Suara"
          Navigate={() => navigation.navigate('Speech')}
          soundName="suara.mp3"
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
