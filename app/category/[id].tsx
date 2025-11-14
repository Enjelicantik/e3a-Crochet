import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductGridCard from "../../components/ProductGridCard";
import {
    CATEGORIES,
    fetchProducts,
    formatPrice,
    getProductsByCategory,
    Product,
} from "../../lib/api";
import { COLORS } from "../../styles/colors";

export default function CategoryDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const category = CATEGORIES.find((cat) => cat.id === id);

    useEffect(() => {
        loadCategoryProducts();
    }, [id]);

    const loadCategoryProducts = async () => {
        try {
            setLoading(true);
            const allProducts = await fetchProducts();
            const filtered = getProductsByCategory(
                allProducts,
                category?.title || ""
            );
            setProducts(filtered);
        } catch (error) {
            console.error("Failed to load category products:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToProduct = (productId: string) => {
        router.push(`/product/${productId}` as any);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={28}
                        color="#fff"
                    />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <MaterialCommunityIcons
                        name={category?.icon || "tag"}
                        size={28}
                        color="#fff"
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>
                            {category?.title || "Category"}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {products.length} produk tersedia
                        </Text>
                    </View>
                </View>
                <View style={styles.placeholder} />
            </View>

            {/* Product List */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color={COLORS.background}
                        />
                        <Text style={styles.loadingText}>
                            Loading products...
                        </Text>
                    </View>
                ) : products.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons
                            name="package-variant"
                            size={80}
                            color="#ddd"
                        />
                        <Text style={styles.emptyTitle}>Belum Ada Produk</Text>
                        <Text style={styles.emptyText}>
                            Produk dalam kategori ini akan segera hadir
                        </Text>
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {products.map((product) => (
                            <View key={product.id} style={styles.gridItem}>
                                <ProductGridCard
                                    id={product.id}
                                    name={product.name}
                                    imageUri={product.url_picture}
                                    likes={product.total_likes}
                                    price={formatPrice(product.price_rupiah)}
                                    onPress={() =>
                                        navigateToProduct(product.id)
                                    }
                                />
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    backButton: {
        width: 28,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
        marginLeft: 15,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 13,
        color: "#fff",
        opacity: 0.9,
    },
    placeholder: {
        width: 28,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 20,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%",
        marginBottom: 15,
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 100,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: "#666",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#999",
        marginTop: 20,
    },
    emptyText: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 8,
        textAlign: "center",
        paddingHorizontal: 40,
    },
});
