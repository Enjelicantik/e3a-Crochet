import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../../styles/colors';

interface SuccessCheckmarkProps {
  style?: ViewStyle;
}

const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({ style }) => {
  return (
    <View style={style}>
      <Svg height="120" width="120" viewBox="0 0 120 120">
        {/* Lingkaran Luar */}
        <Circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke={COLORS.textPrimary} // Menggunakan warna gelap (seperti di gambar)
          strokeWidth="4"
        />
        
        {/* Tanda Centang (Checkmark) */}
        <Path
          d="M37 60 L54 77 L87 47" // Koordinat untuk tanda centang
          fill="none"
          stroke={COLORS.textPrimary} // Menggunakan warna gelap (seperti di gambar)
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default SuccessCheckmark;