import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
    id: string;
    title: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    products: number;
    onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    title,
    icon,
    color,
    products,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: color + "20" },
                ]}
            >
                <MaterialCommunityIcons name={icon} size={32} color={color} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.productCount}>{products} Produk</Text>
            </View>
            <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#999"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    productCount: {
        fontSize: 13,
        color: "#888",
    },
});

export default CategoryCard;
