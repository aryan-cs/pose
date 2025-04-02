import {
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [imagePickerPermission, setImagePickerPermission] = useState<boolean>(false);

  const requestImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setImagePickerPermission(status === "granted");
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Please enable camera permissions.
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri);
  };

  const pickImage = async () => {
    if (!imagePickerPermission) {
      await requestImagePickerPermission();
      if (!imagePickerPermission) {
        alert("Please enable media library permissions.");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUri(result.uri);
    }
  };

  const renderPicture = () => {
    return (
      <View style={styles.pictureContainer}>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={styles.image}
        />
        <Pressable onPress={() => setUri(null)} style={styles.pictureButton}>
          <Text style={styles.pictureButtonText}>Take another picture</Text>
        </Pressable>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode="picture"
        facing="back"
      >
        <View style={styles.shutterContainer}>
        <Pressable>
          </Pressable>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View style={styles.shutterBtnInner} />
              </View>
            )}
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
      <Pressable onPress={pickImage} style={styles.imagePickerButton}>
        <AntDesign name="plus" size={32} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 7,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imagePickerButton: {
    position: "absolute",
    bottom: 44,
    width: 70,
    height: 70,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
});
