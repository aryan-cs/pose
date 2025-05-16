import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type StyledOptionProps = {
  name: "brightness" | "exposure" | "contrast" | "zoom" | "media" | "flip";
  size?: number;
};

export default function StyledOption({ name, size = 40 }: StyledOptionProps) {
  const renderIcon = () => {
    const iconSize = size * 0.5;
    switch (name) {
      case "brightness":
        return <MaterialCommunityIcons name="brightness-5" size={iconSize} color="white" />;
      case "exposure":
        return <MaterialCommunityIcons name="asterisk" size={iconSize} color="white" />;
      case "contrast":
        return <MaterialCommunityIcons name="contrast" size={iconSize} color="white" />;
      case "zoom":
        return <MaterialCommunityIcons name="camera-iris" size={iconSize} color="white" />;
      case "media":
        return <MaterialCommunityIcons name="image-multiple" size={iconSize} color="white" />;
      case "flip":
        return <MaterialCommunityIcons name="camera-flip" size={iconSize} color="white" />;
      default:
        return <MaterialCommunityIcons name="asterisk" size={iconSize} color="white" />;
    }
  };

  return (
    <LinearGradient
      colors={[
        'rgba(255, 255, 255, 0.07)', 
        'rgba(255, 255, 255, 0.05)']}
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        }
      ]}>
      <View>
        {renderIcon()}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});