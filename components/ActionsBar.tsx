import {
    CameraMode,
    CameraType,
    CameraView,
} from "expo-camera";
import { StyleSheet, View } from "react-native";
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
    <View style={styles.shutterContainer}>
    
            <Pressable onPress={onToggleMode}>
            {mode === "picture" ? (
                <AntDesign name="picture" size={32} color="white" />
            ) : (
                <Feather name="video" size={32} color="white" />
            )}
            </Pressable>
    
            <Pressable onPress={mode === "picture" ? onTakePicture : onRecordVideo}>
            {({ pressed }) => (
                <View
                style={[
                    styles.shutterBtn,
                    {
                    opacity: pressed ? 0.75 : 1,
                    },
                ]}
                >
                <View
                    style={[
                    styles.shutterBtnInner,
                    {
                        backgroundColor: mode === "picture" ? "white" : "red",
                    },
                    ]}
                />
                </View>
            )}
            </Pressable>
    
            <Pressable onPress={onToggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
            </Pressable>
        </View>);
}

const GRIDLINE_THICKNESS = 0.2;
const GRIDLINE_COLOR = "rgba(255, 255, 255, 0.5)";
const BUTTON_SIZE = 80;
const BUTTON_OUTLINE = 5;
const BUTTON_SPACING = 15;

const styles = StyleSheet.create({
    shutterContainer: {
        position: "absolute",
        bottom: "8%",
        width: "90%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: BUTTON_OUTLINE,
        borderColor: "white",
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: BUTTON_SIZE - BUTTON_SPACING,
        height: BUTTON_SIZE - BUTTON_SPACING,
        borderRadius: "100%",
    },
});