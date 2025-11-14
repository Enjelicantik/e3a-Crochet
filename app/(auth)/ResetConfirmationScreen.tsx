import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";
import { COLORS } from "../../styles/colors";

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");

const ResetConfirmationScreen = () => {
    const params = useLocalSearchParams();

    const rawMethod = params.method as string | undefined;
    const method: "email" | "phone" =
        rawMethod === "email" || rawMethod === "phone"
            ? (rawMethod as "email" | "phone")
            : "email";

    const isEmail = method === "email";

    // Teks dinamis berdasarkan metode
    const confirmationText = isEmail
        ? "Please check your email for further instructions."
        : "Please check your sms for further instructions.";

    const resendPrompt = isEmail
        ? "Didn't get the reset email?"
        : "Didn't get the reset phone number?";

    const handleResend = () => {
        console.log(`Resending reset instructions via ${method}...`);
        alert(`Instructions re-sent via ${method}!`);
    };

    const handleCancel = () => {
        router.replace("/(auth)/LoginScreen");
    };

    const handleLinkVerification = () => {
        console.log(
            "Simulasi: Link/Kode diverifikasi, mengarahkan ke New Password Screen..."
        );
        router.replace("/(auth)/NewPasswordScreen");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Logo */}
                <Image source={LOGO_IMAGE} style={styles.logo} />

                <Text style={styles.title}>Reset Password</Text>

                <Text style={styles.thankYou}>Thank you!</Text>

                {/* Pesan Konfirmasi Dinamis */}
                <Text style={styles.subtitle}>{confirmationText}</Text>

                {/* Resend Prompt */}
                <Text style={styles.resendPrompt}>{resendPrompt}</Text>

                {/* Tombol Resend dan Cancel (Bersebelahan) */}
                <View style={styles.actionRow}>
                    <Button
                        title="Resend"
                        onPress={handleResend}
                        style={styles.resendButton}
                    />
                    <Button
                        title="Cancel"
                        onPress={handleCancel}
                        variant="outline"
                        style={styles.cancelButton}
                    />
                </View>

                {/* Tombol Simulasi Link Verifikasi (Hapus ini di produksi) */}
                <TouchableOpacity
                    onPress={handleLinkVerification}
                    style={styles.simulationLink}
                >
                    <Text style={styles.simulationText}>
                        [Simulasi: Klik di sini setelah menerima link/kode]
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
        marginBottom: 20,
        tintColor: COLORS.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.textSecondary,
        marginBottom: 50,
        textAlign: "center",
    },
    thankYou: {
        fontSize: 16,
        color: COLORS.textSecondary,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 50,
        lineHeight: 25,
    },
    resendPrompt: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: 20,
        textAlign: "center",
    },

    // Gaya untuk Tombol Resend dan Cancel
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 20,
    },
    resendButton: {
        flex: 1,
        marginRight: 10,
        marginTop: 0,
    },
    cancelButton: {
        flex: 1,
        marginLeft: 10,
        marginTop: 0,
    },
    simulationLink: {
        marginTop: 30,
    },
    simulationText: {
        color: COLORS.primary,
        textDecorationLine: "underline",
        fontSize: 14,
    },

    helpContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 50,
        justifyContent: "center",
    },
});

export default ResetConfirmationScreen;
