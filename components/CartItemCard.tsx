import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../styles/colors";

interface CartItemCardProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUri: string;
    onQuantityChange: (id: string, newQuantity: number) => void;
    onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
    id,
    name,
    price,
    quantity,
    imageUri,
    onQuantityChange,
    onRemove,
}) => {
    const handleIncrease = () => {
        onQuantityChange(id, quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(id, quantity - 1);
        }
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text style={styles.name} numberOfLines={2}>
                        {name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => onRemove(id)}
                        style={styles.deleteButton}
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={20}
                            color="#999"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>
                    Rp {price.toLocaleString("id-ID")}
                </Text>
                <View style={styles.quantityRow}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={handleDecrease}
                    >
                        <MaterialCommunityIcons
                            name="minus"
                            size={16}
                            color={COLORS.background}
                        />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={handleIncrease}
                    >
                        <MaterialCommunityIcons
                            name="plus"
                            size={16}
                            color={COLORS.background}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "space-between",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        padding: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.background,
        marginVertical: 4,
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        minWidth: 25,
        textAlign: "center",
    },
});

export default CartItemCard;
