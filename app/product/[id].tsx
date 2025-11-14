import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { fetchProductById, formatPrice, Product } from "../../lib/api";
import { COLORS } from "../../styles/colors";

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const data = await fetchProductById(id || "1");
            setProduct(data);
        } catch (error) {
            console.error("Failed to load product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (type: "increase" | "decrease") => {
        if (!product) return;
        if (type === "increase" && quantity < product.total_stock) {
            setQuantity(quantity + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Hitung total harga berdasarkan quantity
    const calculateTotalPrice = () => {
        if (!product) return "Rp 0";
        const total = product.price_rupiah * quantity;
        return formatPrice(total);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.background} />
                    <Text style={styles.loadingText}>Loading product...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons
                        name="package-variant-closed"
                        size={80}
                        color="#ddd"
                    />
                    <Text style={styles.emptyText}>Product not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconButton}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color="#333"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => product && toggleFavorite(product)}
                        style={styles.iconButton}
                    >
                        <MaterialCommunityIcons
                            name={
                                product && isFavorite(product.id)
                                    ? "heart"
                                    : "heart-outline"
                            }
                            size={24}
                            color={
                                product && isFavorite(product.id)
                                    ? COLORS.background
                                    : "#333"
                            }
                        />
                    </TouchableOpacity>
                </View>

                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.url_picture }}
                        style={styles.productImage}
                    />
                </View>

                {/* Product Info */}
                <View style={styles.infoSection}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>
                        {formatPrice(product.price_rupiah)}
                    </Text>

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <MaterialCommunityIcons
                                name="heart"
                                size={18}
                                color={COLORS.background}
                            />
                            <Text style={styles.statText}>
                                {product.total_likes} likes
                            </Text>
                        </View>
                        <View style={styles.stat}>
                            <MaterialCommunityIcons
                                name="star"
                                size={18}
                                color="#FFC107"
                            />
                            <Text style={styles.statText}>
                                {product.total_review} reviews
                            </Text>
                        </View>
                        <View style={styles.stat}>
                            <MaterialCommunityIcons
                                name="package-variant"
                                size={18}
                                color="#4CAF50"
                            />
                            <Text style={styles.statText}>
                                {product.total_stock} stock
                            </Text>
                        </View>
                    </View>

                    {/* Category */}
                    <View style={styles.categoryContainer}>
                        <MaterialCommunityIcons
                            name="tag"
                            size={16}
                            color={COLORS.background}
                        />
                        <Text style={styles.categoryText}>
                            {product.category}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {product.description}
                    </Text>
                </View>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Bottom Action Bar */}
            <View
                style={[
                    styles.bottomBar,
                    { paddingBottom: insets.bottom + 15 },
                ]}
            >
                {/* Top Row: Total Price & Quantity */}
                <View style={styles.topRow}>
                    <View style={styles.priceSection}>
                        <Text style={styles.totalLabel}>Total Price</Text>
                        <Text style={styles.totalPrice}>
                            {calculateTotalPrice()}
                        </Text>
                    </View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange("decrease")}
                        >
                            <MaterialCommunityIcons
                                name="minus"
                                size={20}
                                color={COLORS.background}
                            />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange("increase")}
                        >
                            <MaterialCommunityIcons
                                name="plus"
                                size={20}
                                color={COLORS.background}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Row: Add to Cart Button */}
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                        if (product) {
                            addToCart(product, quantity);
                            Alert.alert(
                                "Success",
                                `${quantity} ${product.name} added to cart!`,
                                [
                                    {
                                        text: "OK",
                                        onPress: () =>
                                            router.push("/cart" as any),
                                    },
                                ]
                            );
                        }
                    }}
                >
                    <MaterialCommunityIcons
                        name="cart-plus"
                        size={20}
                        color="#fff"
                    />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: "100%",
        height: 300,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    infoSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.background,
        marginBottom: 15,
    },
    statsRow: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 12,
    },
    stat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    statText: {
        fontSize: 13,
        color: "#666",
    },
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: COLORS.background + "15",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        alignSelf: "flex-start",
    },
    categoryText: {
        fontSize: 13,
        color: COLORS.background,
        fontWeight: "600",
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        color: "#666",
    },
    bottomSpacer: {
        height: 100,
    },
    bottomBar: {
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingTop: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priceSection: {
        flexDirection: "column",
        gap: 4,
    },
    totalLabel: {
        fontSize: 12,
        color: "#888",
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.background,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    quantityButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        minWidth: 30,
        textAlign: "center",
    },
    addToCartButton: {
        width: "100%",
        backgroundColor: COLORS.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        paddingVertical: 14,
        gap: 8,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 100,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: "#666",
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: "#999",
    },
});
