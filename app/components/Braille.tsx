/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Vibration, View} from 'react-native';
import Sound from 'react-native-sound';

type CircleProps = {
  num: number;
  isFilled: boolean;
  numRep: boolean;
};

function Circle({ num, isFilled, numRep }: CircleProps) {
  let circleStyle = styles.unfilledCircle;

  if (isFilled || numRep) {
    circleStyle = styles.filledCircle;
  }

  if (numRep) {
    return (
      <View style={circleStyle}>
        <Text style={styles.circleText}>{num}</Text>
      </View>
    );
  }

  return <View style={circleStyle} />;
}

type BrailleGridProps = {
  ascii: number;
  numRep: boolean;
};

export default function BrailleGrid ({ascii, numRep}: BrailleGridProps) {
  const circles = [1, 2, 3, 4, 5, 6];

  if (numRep) {
    return (
      <View style={styles.gridContainer}>
        {circles.map(num => (
          <View key={num} style={styles.circleContainer}>
            <Circle num={num} isFilled={true} numRep={true} />
          </View>
        ))}
      </View>
    );
  }

  const brailleMap: { [key: number]: boolean[] } = {
    65: [true, false, false, false, false, false],
    66: [true, true, false, false, false, false],
    67: [true, false, false, true, false, false],
    // ...rest of the Braille alphabet
  };

  return (
    <View style={styles.gridContainer}>
      {circles.map(num => (
        <View key={num} style={styles.circleContainer}>
          <Circle num={num} isFilled={brailleMap[ascii][num - 1]} numRep={false} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  circleContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  unfilledCircle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  filledCircle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'black',
    fontSize: 46,
    fontWeight: 'bold',
  },
});
