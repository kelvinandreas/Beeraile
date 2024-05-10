/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    flex: 10,
    justifyContent: 'center',
  },
});

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="Quit"
          Navigate={() => navigation.navigate('Home')}
          soundName="quit.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text}>Welcome to</Text>
          <Image source={require('../assets/logo_horizontal.png')} />
        </View>
        <Text style={styles.text}>
          {'your gateway to learning the basics of Braille!\n'}
        </Text>
        <Text style={styles.text}>
          {'To begin your journey, simply press and hold either the top or bottom ' +
            'of the screen to Access the controls. The buttons will always be in ' +
            "the same location for easy navigation. Let's embark on this exciting " +
            'learning experience together\n'}
        </Text>
        <Text style={styles.text}>Top button: Quit</Text>
        <Text style={styles.text}>Bottom button: Start</Text>
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="Start"
          Navigate={() => navigation.navigate('Home')}
          soundName="start.mp3"
        />
      </View>
    </View>
  );
}

export default WelcomeScreen;
