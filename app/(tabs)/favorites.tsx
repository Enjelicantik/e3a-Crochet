import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductGridCard from "../../components/ProductGridCard";
import { useFavorites } from "../../context/FavoritesContext";
import { formatPrice } from "../../lib/api";
import { COLORS } from "../../styles/colors";

export default function FavoritesScreen() {
    const router = useRouter();
    const { favorites, removeFromFavorites } = useFavorites();

    const navigateToDetail = (productId: string) => {
        router.push(`/product/${productId}` as any);
    };

    const handleRemoveFavorite = (productId: string) => {
        removeFromFavorites(productId);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>My Favorites</Text>
                    <Text style={styles.headerSubtitle}>
                        {favorites.length} produk tersimpan
                    </Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={28}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
            >
                {favorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons
                            name="heart-off-outline"
                            size={80}
                            color="#ddd"
                        />
                        <Text style={styles.emptyTitle}>Belum Ada Favorit</Text>
                        <Text style={styles.emptyText}>
                            Produk yang Anda favoritkan akan muncul di sini
                        </Text>
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {favorites.map((product) => (
                            <View key={product.id} style={styles.gridItem}>
                                <ProductGridCard
                                    id={product.id}
                                    name={product.name}
                                    imageUri={product.url_picture}
                                    likes={product.total_likes}
                                    price={formatPrice(product.price_rupiah)}
                                    onPress={() => navigateToDetail(product.id)}
                                />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() =>
                                        handleRemoveFavorite(product.id)
                                    }
                                >
                                    <MaterialCommunityIcons
                                        name="heart"
                                        size={24}
                                        color={COLORS.background}
                                    />
                                </TouchableOpacity>
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
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#fff",
        opacity: 0.9,
        marginTop: 4,
    },
    scrollView: {
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
        position: "relative",
    },
    removeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 10,
    },
    emptyContainer: {
        flex: 1,
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
