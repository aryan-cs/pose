import {
    CameraMode,
    CameraType,
    CameraView,
} from "expo-camera";
import { StyleSheet, View, Text } from "react-native";
import { Pressable } from "react-native";
import StyledOption from "./StyledOption";

const SETTING_ICON_SIZE = 45;

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
    
        <Pressable onPress={onToggleFacing}>
            <StyledOption 
                name="brightness" 
                size={SETTING_ICON_SIZE} />
        </Pressable>

        <Pressable onPress={onToggleFacing}>
            <StyledOption 
                name="exposure" 
                size={SETTING_ICON_SIZE} />
        </Pressable>

        <Pressable onPress={onToggleFacing}>
            <StyledOption 
                name="contrast" 
                size={SETTING_ICON_SIZE} />
        </Pressable>

        <Pressable onPress={onToggleFacing}>
            <StyledOption 
                name="zoom" 
                size={SETTING_ICON_SIZE} />
        </Pressable>
            
    </View>);
}

const styles = StyleSheet.create({
    settingsContainer: {
        width: "80%",
        height: SETTING_ICON_SIZE,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        borderRadius: SETTING_ICON_SIZE / 2,
    },
});