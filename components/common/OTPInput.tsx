// project-ppm/components/common/OTPInput.tsx

import React, { useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../../styles/colors";

// Tentukan tipe props untuk komponen ini
interface OTPInputProps {
    length: number; // Jumlah digit OTP, biasanya 4 atau 6
    onOTPChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onOTPChange }) => {
    // Simpan nilai OTP di state
    const [otp, setOtp] = useState(Array(length).fill(""));
    // Buat array referensi untuk fokus ke input berikutnya
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleChangeText = (text: string, index: number) => {
        // Hanya izinkan 1 digit
        if (text.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Panggil fungsi callback setiap kali OTP berubah
        onOTPChange(newOtp.join(""));

        // Pindah otomatis ke input berikutnya jika ada teks
        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Pindah otomatis ke input sebelumnya saat tombol 'Backspace' ditekan dan input kosong
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    // Agar keyboard tertutup setelah input terakhir diisi
                    onSubmitEditing={() => {
                        if (index === length - 1) Keyboard.dismiss();
                    }}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between", // Pisahkan antar kotak OTP
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    input: {
        width: 55, // Ukuran kotak per digit (sesuaikan)
        height: 55,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        backgroundColor: "#F7F7F7", // Latar belakang abu-abu muda di dalam kotak
    },
});

export default OTPInput;
