import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { COLORS } from "../styles/colors";

const LOGO_IMAGE = require("../assets/images/Logo Crochet.png");

const WelcomeScreen = () => {
    const handleGetStarted = () => {
        console.log("Pindah ke halaman Login!");
        router.replace("/(auth)/LoginScreen");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image
                    source={LOGO_IMAGE}
                    style={styles.logo}
                    accessibilityLabel="App Logo"
                />

                <Text style={styles.slogan}>
                    The best Crochet app with Unlimited Cuteness!
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started!</Text>
                </TouchableOpacity>

                <View style={styles.paginationContainer}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
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
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 50,
        tintColor: COLORS.primary,
    },
    slogan: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
        marginBottom: 80,
        lineHeight: 38,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        color: COLORS.background,
        fontSize: 18,
        fontWeight: "600",
    },
    paginationContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 50,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        marginHorizontal: 5,
    },
    activeDot: {
        width: 15,
        backgroundColor: COLORS.primary,
    },
});

export default WelcomeScreen;
