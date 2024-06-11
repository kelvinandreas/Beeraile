/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ButtonCustom } from "../components/ButtonCustom";
import { SafeAreaView } from "react-native-safe-area-context";
import sounds from "../data/Sounds";
import { Audio } from "expo-av";


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
    alignItems: "center",
  },
});

type SoundName = keyof typeof sounds;

const handlePress = async (soundName: SoundName) => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync(sounds[soundName]);
    sound.setVolumeAsync(1.0);
    sound.playAsync();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};

function HomeScreen({ navigation }: any) {
  useEffect(() => {
    handlePress("pilihmode");
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => navigation.navigate('Welcome')}
          soundName="keluar"
        />
      </View>

      <TouchableOpacity
        style={styles.contentView}
        onPress={() => handlePress("pilihmode")}
      >
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
      </TouchableOpacity>

      <View style={styles.buttonView}>
        <ButtonCustom
          text="latihan"
          Navigate={() => navigation.navigate('Training')}
          soundName="latihan"
        />
        <ButtonCustom
          text="Suara"
          Navigate={() => navigation.navigate('Speech')}
          soundName="suara"
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
