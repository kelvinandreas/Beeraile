/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonCustom } from "../../components/ButtonCustom";
import { Audio } from "expo-av";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSOutputFormat,
} from "expo-av/build/Audio";
import * as FileSystem from "expo-file-system";
import sounds from "../../data/Sounds";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  text: {
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  keluarButton: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  keluarButtonText: {
    color: "black",
    fontSize: 16,
    textTransform: "uppercase",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

type RecordingData = {
  sound: Audio.Sound;
  duration: string;
  file: string | null;
};

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

function SpeechScreen({ navigation }: any) {
  useEffect(() => {
    handlePress("modesuaratekan");
  }, []);

  const [recording, setRecording] = React.useState<Audio.Recording | undefined>(
    undefined
  );
  const [recordingData, setRecordingData] =
    React.useState<RecordingData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>("");
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading && transcription !== "") {
      navigation.navigate("Transcript", { transcript: transcription });
    }
  }, [loading, transcription, navigation]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const recordingOptions = {
          android: {
            ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
            extension: ".m4a",
            outputFormat: AndroidOutputFormat.MPEG_4,
            audioEncoder: AndroidAudioEncoder.AAC,
          },
          ios: {
            ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
            extension: ".wav",
            outputFormat: IOSOutputFormat.LINEARPCM,
          },
          web: {
            mimeType: "audio/wav",
            bitsPerSecond: 128000,
          },
        };
        const { recording } = await Audio.Recording.createAsync(
          recordingOptions
        );
        if (recordingData?.sound) {
          await recordingData.sound.unloadAsync();
        }
        setRecording(recording);
      }
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  }

  async function stopRecording() {
    if (recording) {
      setLoading(true);
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      if (status.isLoaded && status.durationMillis !== undefined) {
        setRecordingData({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI(),
        });
        await handlePress("sedangmemuat"); // Play "sedangmemuat" sound
        await sendTranscriptionRequest(recording.getURI());
      }
    }
  }

  function getDurationFormatted(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  async function sendTranscriptionRequest(audioUri: string | null) {
    if (!audioUri) return;

    setLoading(true);

    const apiUrl =
      "https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=id-ID";
    const subscriptionKey = "28152ac3dfcb48a7b4222c50f6ce2c80"; // DELETE LATER
    const headers = {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-Type": "audio/wav",
    };

    try {
      const fileExtension = audioUri.split(".").pop();

      if (fileExtension === "m4a") {
        const formData = new FormData();
        formData.append("audio", {
          uri: audioUri,
          type: "audio/m4a",
          name: "audio_file.m4a",
        });

        const conversionResponse = await fetch(
          "https://c4b8-35-194-67-157.ngrok-free.app/convert",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!conversionResponse.ok) {
          throw new Error("Failed to convert audio file");
        }

        const wavBlob = await conversionResponse.blob();
        const wavFileUri = FileSystem.documentDirectory + "converted_audio.wav";

        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(wavBlob);
        fileReaderInstance.onload = async () => {
          const base64data = fileReaderInstance.result as string | null;
          if (base64data) {
            const base64String = base64data.split(",")[1];
            await FileSystem.writeAsStringAsync(wavFileUri, base64String, {
              encoding: FileSystem.EncodingType.Base64,
            });

            audioUri = wavFileUri;

            await sendToTranscriptionAPI(audioUri);
          } else {
            throw new Error("Failed to read the converted audio file");
          }
        };
      } else {
        await sendToTranscriptionAPI(audioUri);
      }
    } catch (error) {
      console.error("Failed to fetch transcription:", error);
      Alert.alert("Error", "Failed to fetch transcription");
    } finally {
      setLoading(false);
    }
  }

  async function sendToTranscriptionAPI(audioUri: string) {
    try {
      const apiUrl =
        "https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=id-ID";
      const subscriptionKey = "28152ac3dfcb48a7b4222c50f6ce2c80"; // DELETE LATER
      const headers = {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "audio/wav",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: {
          uri: audioUri,
          type: "audio/wav",
          name: "audio_file.wav",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transcription");
      }

      const data = await response.json();
      const transcript = data.DisplayText || "Suara Tidak Terdeteksi";
      setTranscription(transcript);
      navigation.navigate("Transcript", { transcript: transcript });
    } catch (error) {
      console.error("Failed to send to transcription API:", error);
      Alert.alert("Error", "Failed to send to transcription API");
    } finally {
      setLoading(false);
    }
  }

  function handlePressIn() {
    handlePress("rekam");
    const timeout = setTimeout(() => {
      startRecording();
    }, 1000);
    setHoldTimeout(timeout);
  }

  function handlePressOut() {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
    stopRecording();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="keluar"
          Navigate={() => {
            const timeout = setTimeout(() => {
              navigation.navigate("Home");
            }, 1000); // 1 second delay before navigating home
            setHoldTimeout(timeout);
          }}
          soundName="keluar"
        />
      </View>

      <TouchableOpacity
        style={styles.contentView}
        onPress={() => handlePress("modesuaratekan")}
      >
        <View style={styles.contentView}>
          <Text style={styles.text}>
            {
              "selamat datang di mode suara. tekan dan tahan tombol bawah untuk mulai merekam.\n"
            }
          </Text>
          <Text style={styles.text}>{"tombol atas: keluar"}</Text>
          <Text style={styles.text}>{"tombol bawah: rekam"}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonView}>
        <ButtonCustom
          text="Rekam"
          Navigate={() => {}}
          soundName="empty"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default SpeechScreen;
