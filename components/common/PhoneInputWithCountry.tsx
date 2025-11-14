import React, { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../styles/colors";

// Data negara sederhana (simulasi)
const countryData = [
    { flag: "🇮🇩", code: "+62", name: "Indonesia" },
    { flag: "🇸🇬", code: "+65", name: "Singapore" },
    { flag: "🇲🇾", code: "+60", name: "Malaysia" },
    { flag: "🇺🇸", code: "+1", name: "United States" },
    // Anda bisa menambahkan lebih banyak negara di sini
];

interface PhoneInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onSelectCountry: (code: string) => void;
    selectedCountryCode: string;
}

const PhoneInputWithCountry: React.FC<PhoneInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    onSelectCountry,
    selectedCountryCode,
}) => {
    // State untuk mengontrol negara yang dipilih
    const [selectedCountry, setSelectedCountry] = useState(countryData[0]);
    const [modalVisible, setModalVisible] = useState(false);

    // Fungsi untuk menampilkan picker negara
    const showCountryPicker = () => {
        setModalVisible(true);
    };

    const handleSelectCountry = (country: (typeof countryData)[0]) => {
        setSelectedCountry(country);
        onSelectCountry(country.code);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputRow}>
                {/* Bagian Country Selector (Bendera dan Kode) */}
                <TouchableOpacity
                    style={styles.countrySelector}
                    onPress={showCountryPicker}
                >
                    <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                    <Text style={styles.countryCodeText}>
                        {selectedCountry.code}
                    </Text>
                    <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>

                {/* Bagian Input Nomor Telepon */}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#A9A9A9"
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>

            {/* Modal Country Picker */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Select Country Code
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={countryData}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.countryItem,
                                        selectedCountry.code === item.code &&
                                            styles.selectedCountryItem,
                                    ]}
                                    onPress={() => handleSelectCountry(item)}
                                >
                                    <Text style={styles.countryFlag}>
                                        {item.flag}
                                    </Text>
                                    <View style={styles.countryInfo}>
                                        <Text style={styles.countryName}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.countryCode}>
                                            {item.code}
                                        </Text>
                                    </View>
                                    {selectedCountry.code === item.code && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    countrySelector: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 12,
        borderRightWidth: 1,
        borderRightColor: "#E0E0E0",
    },
    flagText: {
        fontSize: 18,
        marginRight: 6,
    },
    countryCodeText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
        marginRight: 4,
    },
    dropdownIcon: {
        fontSize: 10,
        color: "#999",
        marginLeft: 2,
    },
    input: {
        flex: 1,
        paddingLeft: 12,
        fontSize: 14,
        color: "#333",
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "70%",
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textPrimary,
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 24,
        color: "#888",
        fontWeight: "300",
    },
    countryItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    selectedCountryItem: {
        backgroundColor: "#F0F8FF",
    },
    countryFlag: {
        fontSize: 28,
        marginRight: 15,
    },
    countryInfo: {
        flex: 1,
    },
    countryName: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    countryCode: {
        fontSize: 14,
        color: "#888",
    },
    checkmark: {
        fontSize: 20,
        color: COLORS.primary,
        fontWeight: "bold",
    },
});

export default PhoneInputWithCountry;
