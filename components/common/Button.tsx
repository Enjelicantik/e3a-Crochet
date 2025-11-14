import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import { COLORS } from "../../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: "primary" | "outline";
    style?: ViewStyle;
    // Prop 'disabled' sudah ada melalui extends TouchableOpacityProps
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = "primary",
    style,
    disabled = false, // Ambil prop disabled
    ...rest
}) => {
    const isPrimary = variant === "primary";

    const buttonStyle = [
        styles.base,
        isPrimary ? styles.primaryButton : styles.outlineButton,
        disabled && isPrimary && styles.disabledPrimaryButton,
        style,
    ];

    const textStyle = [
        isPrimary ? styles.primaryText : styles.outlineText,
        disabled && styles.disabledText,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle} // Gunakan style dinamis
            onPress={onPress}
            activeOpacity={disabled ? 1 : 0.8} // Kurangi activeOpacity jika disabled
            disabled={disabled} // Meneruskan prop disabled ke TouchableOpacity
            {...rest}
        >
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        width: "100%",
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    // --- Style Primary (Aktif) ---
    primaryButton: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    primaryText: {
        color: COLORS.background,
        fontSize: 18,
        fontWeight: "600",
    },

    // --- Style Outline (Aktif) ---
    outlineButton: {
        borderColor: "#fff",
        borderWidth: 2,
        backgroundColor: "transparent",
    },
    outlineText: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "600",
    },

    // --- Style Disabled (Non-Aktif) ---
    disabledPrimaryButton: {
        backgroundColor: COLORS.secondary,
        shadowOpacity: 0,
        elevation: 0,
    },
    disabledText: {
        color: "#ffffff",
    },
});

export default Button;
