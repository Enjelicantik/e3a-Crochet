// project-ppm/components/common/InputField.tsx

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../styles/colors"; // Perbaiki path relatif

interface InputFieldProps extends TextInputProps {
    label: string;
    placeholder: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    icon,
    isPassword = false,
    secureTextEntry,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = isPassword || secureTextEntry;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={COLORS.background}
                        style={styles.leftIcon}
                    />
                )}
                <TextInput
                    style={[styles.input, icon && styles.inputWithIcon]}
                    placeholder={placeholder}
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry={isPasswordField && !showPassword}
                    {...rest}
                />
                {isPasswordField && (
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <MaterialCommunityIcons
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color={COLORS.background}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "bold",
        marginBottom: 8,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    leftIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: "#333",
        fontSize: 14,
        padding: 0,
    },
    inputWithIcon: {
        paddingLeft: 0,
    },
    eyeButton: {
        padding: 5,
        marginLeft: 10,
    },
});

export default InputField;
