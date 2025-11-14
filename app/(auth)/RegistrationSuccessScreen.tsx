import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Hapus Image jika tidak diperlukan
import { SafeAreaView } from "react-native-safe-area-context";
import SuccessCheckmark from "../../components/common/SuccessCheckmark"; // Import komponen centang
import { COLORS } from "../../styles/colors";

// const LOGO_IMAGE = require('../../assets/images/logo.png'); // Tidak digunakan lagi jika ada SuccessCheckmark
const REDIRECT_TIME = 5; // Waktu hitung mundur (5 detik)

const RegistrationSuccessScreen = () => {
    const [countdown, setCountdown] = useState(REDIRECT_TIME);

    // Fungsi untuk mengarahkan pengguna
    const navigateToNextScreen = () => {
        console.log("Redirecting to Login/Home screen...");
        router.replace("/(auth)/LoginScreen"); // Mengarahkan ke Login Screen
    };

    // LOGIC HITUNG MUNDUR (TIMER)
    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId); // Membersihkan timer saat komponen dilepas
        } else if (countdown === 0) {
            navigateToNextScreen();
        }
    }, [countdown]);

    const handleManualRedirect = () => {
        // Hentikan timer ketika pengguna mengklik manual
        setCountdown(-1);
        navigateToNextScreen();
    };

    const handleHelpCenter = () => {
        console.log("Mengunjungi Help Center...");
        // router.push('/details/HelpCenterScreen');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* 1. Gambar/Animasi Centang Sukses */}
                <SuccessCheckmark style={styles.checkmark} />

                {/* 2. Judul Utama (Dibuat tidak wrap) */}
                <Text style={styles.title}>Registration Successful!</Text>

                {/* Deskripsi & Hitung Mundur */}
                <Text style={styles.subtitle}>
                    You will be redirected to the landing page in
                    <Text style={styles.countdownText}> {countdown} </Text>
                    seconds...
                </Text>

                {/* 3. Tombol Manual Redirect (Center Aligned) */}
                <TouchableOpacity
                    onPress={handleManualRedirect}
                    style={styles.manualLink}
                >
                    {/* Teks Click here dibuat bold dan berwarna, sisanya normal */}
                    <Text style={styles.manualLinkText}>
                        <Text style={styles.manualLinkTextHighlight}>
                            Click here
                        </Text>{" "}
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
    checkmark: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24, // Sedikit lebih kecil agar satu baris
        fontWeight: "bold",
        color: COLORS.textSecondary, // Menggunakan warna teks utama yang gelap
        marginBottom: 30,
        textAlign: "center",
        // Tambahkan properti whiteSpace atau gunakan font yang lebih kecil jika masih wrap
        maxWidth: "100%",
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 50,
        lineHeight: 28,
    },
    countdownText: {
        fontWeight: "bold",
        color: COLORS.textSecondary, // Warna Primary (Biru)
    },
    manualLink: {
        marginBottom: 100,
        width: "100%", // Pastikan TouchableOpacity memiliki lebar penuh untuk center alignment
        alignItems: "center", // Pusatkan konten di dalamnya
    },
    manualLinkText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        textAlign: "center",
        lineHeight: 22,
    },
    manualLinkTextHighlight: {
        color: COLORS.textSecondary, // Warna teks lebih gelap
        fontWeight: "bold",
    },
});

export default RegistrationSuccessScreen;
