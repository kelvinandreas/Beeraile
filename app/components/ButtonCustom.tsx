/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Vibration} from 'react-native';
import Sound from 'react-native-sound';

interface ButtonProps {
  text: string;
  Navigate: () => void;
  soundName: string;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export function ButtonCustom({text, Navigate, soundName, onPressIn, onPressOut}: ButtonProps) {
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);

  const handlePress = () => {
    const sound = new Sound(soundName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.setVolume(1);
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
          sound.reset();
          return;
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    console.log('Vibrate');
    Vibration.vibrate(100);
  };

  const handleHold = () => {
    setHoldTimeout(
      setTimeout(() => {
        Navigate();
      }, 1000),
    );

    const sound = new Sound(soundName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.setVolume(1);
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
          sound.reset();
          return;
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

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
