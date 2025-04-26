import {
    CameraMode,
    CameraType,
    CameraView,
} from "expo-camera";
import { StyleSheet, View, Text } from "react-native";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type CameraFeedProps = {
    mode: CameraMode;
    onTakePicture: () => void;
    onRecordVideo: () => void;
    onToggleMode: () => void;
    onToggleFacing: () => void;
};

export default function ButtonsBar({
    mode,
    onTakePicture,
    onRecordVideo,
    onToggleMode,
    onToggleFacing,
}: CameraFeedProps) {
    return (
    <View style={styles.settingsContainer}>
    
        <Text>brightness</Text>
        <Text>contrast</Text>
        <Text>exposure</Text>
            
    </View>);
}

const GRIDLINE_THICKNESS = 0.2;
const GRIDLINE_COLOR = "rgba(255, 255, 255, 0.5)";
const BUTTON_SIZE = 80;
const BUTTON_OUTLINE = 5;
const BUTTON_SPACING = 15;

const styles = StyleSheet.create({
    settingsContainer: {
        backgroundColor: "red",
        width: "80%",
        height: "5%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});