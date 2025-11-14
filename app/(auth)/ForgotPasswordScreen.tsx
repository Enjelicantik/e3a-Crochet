import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/colors";

import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";

type ResetMethod = "phone" | "email";
const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");

const ForgotPasswordScreen = () => {
    const [method, setMethod] = useState<ResetMethod>("phone");
    const [inputValue, setInputValue] = useState("");

    const isPhoneMethod = method === "phone";

    const handleSwapMethod = () => {
        setMethod(isPhoneMethod ? "email" : "phone");
        setInputValue("");
    };

    const handleSubmit = () => {
        if (inputValue.trim() === "") {
            alert(
                `Please enter your ${
                    isPhoneMethod ? "Phone Number" : "Email or Username"
                }.`
            );
            return;
        }

        console.log(`Submitting reset request via ${method}: ${inputValue}`);
        // Arahkan ke layar OTP
        router.push({
            pathname: "/(auth)/ResetConfirmationScreen",
            params: { method: method }, // Kirim parameter 'email' atau 'phone'
        });
    };

    const handleCancel = () => {
        // Kembali ke layar Login
        router.back();
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
                    {/* 1. LOGO BARU DI SINI */}
                    <Image source={LOGO_IMAGE} style={styles.logo} />

                    <Text style={styles.title}>Forgot Password</Text>

                    <Text style={styles.subtitle}>
                        Reset using phone or email
                    </Text>

                    {/* Input Field Dinamis */}
                    <InputField
                        label={
                            isPhoneMethod
                                ? "Enter Your Phone Number"
                                : "Enter Your Email or Username"
                        }
                        placeholder={
                            isPhoneMethod ? "Phone Number" : "Email or Username"
                        }
                        icon={isPhoneMethod ? "phone" : "email"}
                        keyboardType={
                            isPhoneMethod ? "phone-pad" : "email-address"
                        }
                        autoCapitalize={isPhoneMethod ? "none" : "none"}
                        value={inputValue}
                        onChangeText={setInputValue}
                    />

                    <Text style={styles.infoText}>
                        You will receive notifications via email and SMS from us
                        for security and login purposes.
                    </Text>

                    {/* 2. KONTROL SUBMIT & CANCEL BERSEBELAHAN (Horizontal) */}
                    <View style={styles.actionRow}>
                        {/* Tombol SUBMIT (Aksi Utama: Biru) */}
                        <Button
                            title="Submit"
                            onPress={handleSubmit}
                            style={styles.submitButton}
                        />
                        {/* Tombol CANCEL (Aksi Sekunder: Abu-abu) */}
                        <Button
                            title="Cancel"
                            onPress={handleCancel}
                            variant="outline"
                            style={styles.cancelButton}
                        />
                    </View>

                    {/* Pemisah "Or" */}
                    <View style={styles.orContainer}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>Or</Text>
                        <View style={styles.line} />
                    </View>

                    {/* Tombol Swap */}
                    <Button
                        title={
                            isPhoneMethod
                                ? "Search by email or username"
                                : "Search by phone number"
                        }
                        variant="outline"
                        onPress={handleSwapMethod}
                        style={styles.swapButton}
                    />

                    {/* Link Help Center */}
                    <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>
                            Need help? Visit our{" "}
                        </Text>
                        <TouchableOpacity onPress={handleHelpCenter}>
                            <Text style={styles.helpLink}>help center</Text>
                        </TouchableOpacity>
                    </View>
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
    // Gaya untuk Logo
    logo: {
        width: 150,
        height: 150,
        tintColor: COLORS.primary,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.textSecondary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 40,
    },
    infoText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 30,
    },

    // Gaya Baru untuk Submit dan Cancel Bersebelahan
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", // Ambil seluruh lebar
        marginTop: 20,
    },
    submitButton: {
        flex: 1, // Agar tombol Submit mengambil setengah ruang
        marginRight: 10,
        marginTop: 0,
    },
    cancelButton: {
        flex: 1,
        marginLeft: 10,
        marginTop: 0,
    },

    // Gaya untuk "Or" (tetap)
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25,
        width: "100%",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.textSecondary,
    },
    orText: {
        marginHorizontal: 15,
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: "600",
    },

    swapButton: {
        marginTop: 0,
    },

    helpContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: -30,
        justifyContent: "center",
    },
    helpText: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    helpLink: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
});

export default ForgotPasswordScreen;
