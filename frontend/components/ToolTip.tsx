import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function ToolTip({
  text,
  top,
  left,
  right,
  bottom,
  position,
}: {
  text: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  position?: 'relative' | 'absolute';
}) {
  const positions = {
    top: top ? RFValue(top) : undefined,
    left: left ? RFValue(left) : undefined,
    right: right ? RFValue(right) : undefined,
    bottom: bottom ? RFValue(bottom) : undefined,
  };

  return (
    <View style={[styles.tooltipContainer, positions, { position: position || 'absolute' }]}>
      <Text style={styles.tooltipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tooltipContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: RFValue(5),
    padding: RFValue(7),
    zIndex: 15,
    // display: 'none',
  },
  tooltipText: {
    color: 'white',
    fontSize: RFValue(10),
    fontWeight: 'bold',
  },
});
