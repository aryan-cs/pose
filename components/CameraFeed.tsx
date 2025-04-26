import {
    CameraMode,
    CameraType,
    CameraView,
} from "expo-camera";
import { StyleSheet, View } from "react-native";

type CameraFeedProps = {
    cameraRef: React.RefObject<CameraView>;
    mode: CameraMode;
    facing: CameraType;
    enableGrid: boolean;
};

export default function CameraFeed({
    cameraRef,
    mode,
    facing,
    enableGrid
}: CameraFeedProps) {
    return (
        <CameraView
            style={styles.camera}
            ref={cameraRef}
            mode={mode}
            facing={facing}
            mute={false}
            responsiveOrientationWhenOrientationLocked
        >
            {enableGrid && (
                <>
                    <View style={styles.gridColumn} />
                    <View style={styles.gridRow} />
                </>
            )}
        </CameraView>
    );
}

const GRIDLINE_THICKNESS = 0.2;
const GRIDLINE_COLOR = "rgba(255, 255, 255, 0.5)";

const styles = StyleSheet.create({
    camera: {
        width: "95%",
        aspectRatio: 4 / 5,
        borderRadius: 20,
        overflow: "hidden",
    },
    gridColumn: {
        width: "33%",
        height: "100%",
        position: "absolute",
        left: "33%",
        borderColor: GRIDLINE_COLOR,
        borderLeftWidth: GRIDLINE_THICKNESS,
        borderRightWidth: GRIDLINE_THICKNESS,
    },
    gridRow: {
        width: "100%",
        height: "33%",
        position: "absolute",
        top: "33%",
        borderColor: GRIDLINE_COLOR,
        borderTopWidth: GRIDLINE_THICKNESS,
        borderBottomWidth: GRIDLINE_THICKNESS,
    },
});