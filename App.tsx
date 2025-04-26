import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import CameraFeed from "./components/CameraFeed";
import ActionsBar from "./components/ActionsBar"
import SettingsBar from "./components/SettingsBar"

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          to begin, enable camera access.
        </Text>
        <Button onPress={requestPermission} title="grant access" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    setUri(photo?.uri);
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      cameraRef.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await cameraRef.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={styles.imagePreview}
        />
        <Button 
          onPress={() => setUri(null)} 
          title="retake" />

      </View>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? (renderPicture()) : (
        <>
          <CameraFeed
            cameraRef={cameraRef}
            mode={mode}
            facing={facing}
            enableGrid={true}
          />

          <SettingsBar 
            mode={mode}
            onTakePicture={takePicture}
            onRecordVideo={recordVideo}
            onToggleMode={toggleMode}
            onToggleFacing={toggleFacing}
          />
          
          <ActionsBar 
            mode={mode}
            onTakePicture={takePicture}
            onRecordVideo={recordVideo}
            onToggleMode={toggleMode}
            onToggleFacing={toggleFacing}
          />
        </>
      )}
    </View>
  );
}

const BACKGROUND_COLOR = "#0d0d0d";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "95%",
    aspectRatio: 4 / 5,
    borderRadius: 20,
    overflow: "hidden",
  }
});