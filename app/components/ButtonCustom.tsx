/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Vibration} from 'react-native';
import { Audio } from 'expo-av';
import sounds from '../data/Sounds';

type SoundName = keyof typeof sounds;

interface ButtonProps {
  text: string;
  Navigate: () => void;
  soundName: SoundName;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export function ButtonCustom({text, Navigate, soundName, onPressIn, onPressOut}: ButtonProps) {
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);

  const handlePress = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(sounds[soundName]);
      sound.setVolumeAsync(1.0);
      sound.playAsync();
      Vibration.vibrate(100);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleHold = () => {
    setHoldTimeout(
      setTimeout(() => {
        Navigate();
      }, 1000),
    );

    console.log('Vibrate');
    Vibration.vibrate(100);
  };

  const handleRelease = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={handlePress}
      onPressIn={() => {
        handleHold();
        if (onPressIn) onPressIn();
      }}
      onPressOut={() => {
        handleRelease();
        if (onPressOut) onPressOut();
      }}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 30,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
