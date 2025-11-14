import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../styles/colors";

interface ProductGridCardProps {
    id: string;
    name: string;
    imageUri: string;
    likes: number;
    price: string;
    onPress: () => void;
}

const ProductGridCard: React.FC<ProductGridCardProps> = ({
    name,
    imageUri,
    likes,
    price,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.footer}>
                    <View style={styles.stat}>
                        <MaterialCommunityIcons
                            name="heart"
                            size={16}
                            color={COLORS.background}
                        />
                        <Text style={styles.statText}>{likes} like</Text>
                    </View>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginBottom: 15,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    infoContainer: {
        padding: 12,
        paddingTop: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
        textAlign: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    stat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    statText: {
        fontSize: 12,
        color: "#666",
    },
    price: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.background,
    },
});

export default ProductGridCard;
