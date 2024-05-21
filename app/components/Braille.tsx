/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Vibration, View} from 'react-native';
import Sound from 'react-native-sound';

// tambah suara sama geter buat braillenya logicnya disini yak

type CircleProps = {
  num: number;
  isFilled: boolean;
  numRep: boolean;
};

function Circle({ num, isFilled, numRep }: CircleProps) {
  if (numRep) {
    return (
      <View style={styles.filledCircle}>
        <Text style={styles.circleText}>{num}</Text>
      </View>
    );
  }

  if (isFilled) {
    return <View style={styles.filledCircle} />;
  }

  return <View style={styles.unfilledCircle} />;
}

type brailleMapValueProps = {
    name: string,
    dots: string
};

export const brailleMap: {
  [key: string]: brailleMapValueProps } = {
  ' ': {name: 'space', dots: '000000'},
  '#': {name: 'awalan angka', dots: '001111'},
  ',': {name: 'koma', dots: '010000'},
  ';': {name: 'titik koma', dots: '011000'},
  ':': {name: 'titik dua', dots: '010010'},
  '.': {name: 'titik', dots: '010011'},
  'A': {name: 'a', dots: '100000'},
  'B': {name: 'b', dots: '110000'},
  'C': {name: 'c', dots: '100100'},
  'D': {name: 'd', dots: '100110'},
  'E': {name: 'e', dots: '100010'},
  'F': {name: 'f', dots: '110100'},
  'G': {name: 'g', dots: '110110'},
  'H': {name: 'h', dots: '110010'},
  'I': {name: 'i', dots: '010100'},
  'J': {name: 'j', dots: '010110'},
  'K': {name: 'k', dots: '101000'},
  'L': {name: 'l', dots: '111000'},
  'M': {name: 'm', dots: '101100'},
  'N': {name: 'n', dots: '101110'},
  'O': {name: 'o', dots: '101010'},
  'P': {name: 'p', dots: '111100'},
  'Q': {name: 'q', dots: '111110'},
  'R': {name: 'r', dots: '111010'},
  'S': {name: 's', dots: '011100'},
  'T': {name: 't', dots: '011110'},
  'U': {name: 'u', dots: '101001'},
  'V': {name: 'v', dots: '111001'},
  'W': {name: 'w', dots: '010111'},
  'X': {name: 'x', dots: '101101'},
  'Y': {name: 'y', dots: '101111'},
  'Z': {name: 'z', dots: '101011'},
  '^': {name: 'awalan mata uang', dots: '000110'},
};

type BrailleGridProps = {
  char: string;
  numRep: boolean;
};

export default function BrailleGrid ({char, numRep}: BrailleGridProps) {
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

  return (
    <View style={styles.gridContainer}>
      {circles.map(num => (
        <View key={num} style={styles.circleContainer}>
          <Circle num={num} isFilled={(brailleMap[char].dots.charAt(num - 1) === '1')} numRep={false} />
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
