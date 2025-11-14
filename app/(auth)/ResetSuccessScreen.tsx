import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/colors";
// 💡 PERBAIKAN: Import Button yang hilang
import { FontAwesome } from "@expo/vector-icons";

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");
const REDIRECT_TIME = 5;

const ResetSuccessScreen = () => {
    const [countdown, setCountdown] = useState(REDIRECT_TIME);

    const navigateToLogin = () => {
        router.replace("/(auth)/LoginScreen");
    };

    // LOGIC TIMER
    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else if (countdown === 0) {
            navigateToLogin();
        }
    }, [countdown]);

    const handleHelpCenter = () => {
        console.log("Mengunjungi Help Center...");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Logo */}
                <Image source={LOGO_IMAGE} style={styles.logo} />

                {/* Ikon Jempol (Menggunakan FontAwesome: thumbs-up) */}
                <FontAwesome
                    name="thumbs-up"
                    size={100}
                    color={COLORS.textSecondary}
                    style={styles.icon}
                />

                <Text style={styles.thankYou}>Thank you.</Text>

                {/* Deskripsi & Hitung Mundur */}
                <Text style={styles.subtitle}>
                    You will be redirected to the
                    <Text style={styles.countdownText}> login page </Text>
                    in <Text style={styles.countdownText}>
                        {countdown}
                    </Text>{" "}
                    seconds...
                </Text>

                {/* Tombol Manual Redirect */}
                <TouchableOpacity
                    onPress={navigateToLogin}
                    style={styles.manualLink}
                >
                    <Text style={styles.manualLinkText}>
                        Click <Text style={{ fontWeight: "bold" }}>here</Text>{" "}
                        if you are not redirected automatically
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 80,
        tintColor: COLORS.primary,
    },
    icon: {
        marginBottom: 30,
    },
    thankYou: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textSecondary,
        marginBottom: 15,
        marginTop: 30,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 40,
        lineHeight: 25,
    },
    countdownText: {
        fontWeight: "bold",
        color: COLORS.textSecondary,
    },
    manualLink: {
        marginBottom: 100,
        paddingHorizontal: 20,
    },
    manualLinkText: {
        color: COLORS.textSecondary,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 28,
    },
    helpContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 50,
        justifyContent: "center",
    },
    helpText: {
        fontSize: 16,
        color: "#888",
    },
    helpLink: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
});

export default ResetSuccessScreen;
