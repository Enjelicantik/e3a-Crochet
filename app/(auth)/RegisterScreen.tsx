import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
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
import PhoneInputWithCountry from "../../components/common/PhoneInputWithCountry"; // <-- Import komponen baru

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");

const RegisterScreen = () => {
    const [agreed, setAgreed] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+62");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isButtonDisabled = useMemo(() => {
        const isFormValid =
            username.length > 0 &&
            email.length > 0 &&
            phone.length > 0 &&
            password.length >= 6 &&
            password === confirmPassword;

        return !agreed || !isFormValid;
    }, [agreed, username, email, phone, password, confirmPassword]);

    const handleRegister = () => {
        if (isButtonDisabled) {
            Alert.alert(
                "Invalid Form",
                "Harap lengkapi semua bidang dan setujui syarat dan ketentuan."
            );
            return;
        }

        console.log("Melakukan Registrasi dengan data:");
        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${countryCode} ${phone}`);

        router.push("/(auth)/OTPScreen");
    };

    const handleHelpCenter = () => {
        console.log("Mengunjungi Help Center...");
    };

    const handleTerms = () => {
        console.log("Melihat Syarat dan Ketentuan...");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <Image source={LOGO_IMAGE} style={styles.logo} />

                        <Text style={styles.title}>Register</Text>
                        <Text style={styles.subtitle}>
                            Enter your details to register
                        </Text>

                        <View style={styles.form}>
                            <InputField
                                label="Username:"
                                placeholder="Enter Your Username"
                                icon="account"
                                value={username}
                                onChangeText={setUsername}
                            />
                            <InputField
                                label="Email:"
                                placeholder="Enter Your Email Address"
                                icon="email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <PhoneInputWithCountry
                                label="Phone Number:"
                                placeholder="Phone Number"
                                value={phone}
                                onChangeText={setPhone}
                                selectedCountryCode={countryCode}
                                onSelectCountry={setCountryCode}
                            />

                            <InputField
                                label="Password:"
                                placeholder="Enter Your Password"
                                icon="lock"
                                isPassword={true}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <InputField
                                label="Confirm Password:"
                                placeholder="Enter Your Confirmation Password"
                                icon="lock-check"
                                isPassword={true}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />

                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    value={agreed}
                                    onValueChange={setAgreed}
                                    color={
                                        agreed
                                            ? COLORS.background
                                            : COLORS.primary
                                    }
                                    style={{
                                        borderColor: COLORS.primary,
                                        borderWidth: 2,
                                        marginRight: 8,
                                        width: 20,
                                        height: 20,
                                        borderRadius: 4,
                                    }}
                                />
                                <TouchableOpacity onPress={handleTerms}>
                                    <Text style={styles.checkboxLabel}>
                                        I agree with the{" "}
                                        <Text style={styles.termsLink}>
                                            terms and conditions
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                title="Next"
                                onPress={handleRegister}
                                disabled={isButtonDisabled}
                                style={styles.nextButton}
                            />

                            <View style={styles.helpContainer}>
                                <Text style={styles.helpText}>
                                    Need help? Visit our{" "}
                                </Text>
                                <TouchableOpacity onPress={handleHelpCenter}>
                                    <Text style={styles.helpLink}>
                                        help center
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        width: 100,
        height: 100,
        marginBottom: 40,
        tintColor: COLORS.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginBottom: 40,
    },
    form: {
        width: "100%",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    termsLink: {
        color: COLORS.primary,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    nextButton: {
        marginTop: 0,
    },
    helpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
    },
    helpText: {
        fontSize: 16,
        color: "#fff",
    },
    helpLink: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
});

export default RegisterScreen;
