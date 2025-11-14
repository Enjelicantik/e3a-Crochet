// project-ppm/app/(auth)/OTPScreen.tsx

import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/colors";

// Komponen yang sudah kita buat
import Button from "../../components/common/Button";
import OTPInput from "../../components/common/OTPInput"; // Import komponen OTP

const OTP_LENGTH = 4; // Tentukan jumlah digit OTP

const OTPScreen = () => {
    const [otpValue, setOtpValue] = useState("");
    const [timer, setTimer] = useState(60); // Timer 60 detik

    // Asumsi: nomor telepon ini didapat dari layar Register/Forgot Password
    const phoneNumber = "+62 8123 5678 9999";

    // LOGIC TIMER
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleOTPChange = (otp: string) => {
        setOtpValue(otp);
    };

    const handleSubmit = () => {
        if (otpValue.length === OTP_LENGTH) {
            console.log("OTP Submitted:", otpValue);
            // Di sini lakukan verifikasi OTP ke API

            // Jika sukses (Contoh: Navigasi ke Registration Successful - Page 8)
            router.push("/(auth)/RegistrationSuccessScreen");
        } else {
            alert(`Please enter the complete ${OTP_LENGTH}-digit OTP.`);
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            console.log("Resending OTP...");
            setTimer(60); // Reset timer
            // Di sini panggil API untuk mengirim ulang OTP
        }
    };

    const handleHelpCenter = () => {
        console.log("Mengunjungi Help Center...");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Enter OTP</Text>

                    <Text style={styles.subtitle}>
                        An OTP has been sent to
                        <Text style={styles.phoneNumberText}>
                            {" "}
                            {phoneNumber}
                        </Text>
                    </Text>

                    {/* Komponen Input OTP */}
                    <OTPInput
                        length={OTP_LENGTH}
                        onOTPChange={handleOTPChange}
                    />

                    {/* Timer dan Resend */}
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>
                            Resend OTP in{" "}
                            <Text style={styles.timerValue}>{timer}</Text>s
                        </Text>
                        {/* Tombol Resend hanya aktif jika timer = 0 */}
                        <TouchableOpacity
                            onPress={handleResend}
                            disabled={timer > 0}
                        >
                            <Text
                                style={[
                                    styles.resendText,
                                    timer === 0 && styles.resendActive,
                                ]}
                            >
                                Resend
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tombol Submit */}
                    <Button
                        title="Submit"
                        onPress={handleSubmit}
                        disabled={otpValue.length !== OTP_LENGTH}
                        style={styles.submitButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
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
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.textSecondary,
        marginBottom: 20,
        marginTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 50,
    },
    phoneNumberText: {
        fontWeight: "bold",
        color: COLORS.textSecondary,
    },
    timerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    timerText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    timerValue: {
        fontWeight: "bold",
        color: COLORS.textSecondary,
    },
    resendText: {
        fontSize: 14,
        color: COLORS.background, // Non-aktif
        fontWeight: "600",
    },
    resendActive: {
        color: COLORS.textSecondary, // Aktif
    },
    submitButton: {
        marginTop: 30,
    },
});

export default OTPScreen;
