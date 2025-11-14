// project-ppm/app/(auth)/NewPasswordScreen.tsx

import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/colors";

// Komponen yang sudah kita buat
import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");

const NewPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        if (!newPassword || !confirmPassword) {
            alert("Password fields cannot be empty.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match!");
            return;
        }

        console.log(
            "Password has been successfully reset. Redirecting to success screen..."
        );

        // Jika sukses, arahkan ke layar sukses reset password
        router.replace("/(auth)/ResetSuccessScreen");
    };

    const handleHelpCenter = () => {
        console.log("Mengunjungi Help Center...");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <View style={styles.scrollContainer}>
                    <View style={styles.container}>
                        {/* Logo */}
                        <Image source={LOGO_IMAGE} style={styles.logo} />

                        <Text style={styles.title}>Reset Password</Text>

                        {/* 1. Input Kata Sandi Baru */}
                        <InputField
                            label="New Password:"
                            placeholder="Enter New Password"
                            icon="lock"
                            isPassword={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        {/* 2. Input Konfirmasi Kata Sandi */}
                        <InputField
                            label="Confirm New Password:"
                            placeholder="Enter Confirm New Password"
                            icon="lock-check"
                            isPassword={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        {/* Tombol Submit */}
                        <Button
                            title="Submit"
                            onPress={handleSubmit}
                            style={styles.submitButton}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    container: {
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        tintColor: COLORS.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.textSecondary,
        marginBottom: 40,
        marginTop: 50,
    },
    confirmInput: {
        marginBottom: 0,
    },
    submitButton: {
        marginTop: 40,
    },
    helpContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: -30,
        justifyContent: "center",
    },
    helpText: {
        fontSize: 16,
        color: "#888",
    },
    helpLink: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },
});

export default NewPasswordScreen;
