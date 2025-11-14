import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth";
import { COLORS } from "../../styles/colors";

import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");
const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    const handleSubmit = () => {
        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter your username/email and password.");
            return;
        }

        console.log("Attempting to log in...");

        signIn();

        router.replace("/(tabs)");
    };

    const handleRegister = () => {
        router.push("/(auth)/RegisterScreen");
    };

    const handleForgotPassword = () => {
        router.push("/(auth)/ForgotPasswordScreen");
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
                        <Image source={LOGO_IMAGE} style={styles.logo} />
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.subtitle}>
                            Enter your username and password to login
                        </Text>

                        <InputField
                            label="Email/Username:"
                            placeholder="Enter Your Email or Username"
                            icon="account"
                            keyboardType="email-address"
                            value={username}
                            onChangeText={setUsername}
                        />

                        <InputField
                            label="Password:"
                            placeholder="Enter Your Password"
                            icon="lock"
                            isPassword={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            onPress={handleForgotPassword}
                            style={styles.forgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Login"
                            onPress={handleSubmit}
                            style={styles.loginButton}
                        />

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>
                                {"Don't have an account?"}{" "}
                            </Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={styles.registerLink}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
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
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 40,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginTop: -10,
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    loginButton: {
        marginTop: 10,
    },

    // Gaya untuk "Or"
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
        width: "100%",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    orText: {
        marginHorizontal: 15,
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "600",
    },

    // Gaya untuk Google Button
    googleButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: "#fff",
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.background,
    },

    // Gaya untuk Register
    registerContainer: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "center",
    },
    registerText: {
        fontSize: 16,
        color: "#ffffff",
    },
    registerLink: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.primary,
    },
});

export default LoginScreen;
