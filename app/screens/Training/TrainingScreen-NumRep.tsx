import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';
import BrailleGrid from '../../components/Braille';

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
    textAlign: 'justify',
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

function NumRep({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Home')}
          soundName="previous.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>{'representasi nomor'}</Text>
        <BrailleGrid char={' '} numRep={true} />
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="balik"
          Navigate={() => navigation.navigate('Training')}
          soundName="next.mp3"
        />
        <ButtonCustom
          text="lanjut"
          Navigate={() => navigation.navigate('Tutorial')}
          soundName="next.mp3"
        />
      </View>
    </View>
  );
}
export default NumRep;