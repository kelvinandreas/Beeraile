import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCustom} from '../../components/ButtonCustom';

const BrailleGrid = () => {
  const circles = [1, 2, 3, 4, 5, 6];
  return (
    <View style={styles.gridContainer}>
      {circles.map(num => (
        <View key={num} style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{num}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    flex: 10,
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
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
  circle: {
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

function Tutorial1({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="Previous"
          Navigate={() => navigation.navigate('Home')}
          soundName="previous.mp3"
        />
      </View>

      <View style={styles.contentView}>
        <Text style={styles.text}>
          {
            'Touch the middle part of your phone screen. for each grid section, it will speak the number representation of each bump. To navigate, press and hold either the Next or Previous button.'
          }
        </Text>
        <BrailleGrid />
      </View>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="Next"
          Navigate={() => navigation.navigate('Tutorial2')}
          soundName="next.mp3"
        />
      </View>
    </View>
  );
}
export default Tutorial1;
