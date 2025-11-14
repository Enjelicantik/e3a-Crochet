import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "../../components/CategoryCard";
import {
    CATEGORIES,
    fetchProducts,
    getProductsByCategory,
} from "../../lib/api";
import { COLORS } from "../../styles/colors";

export default function CategoriesScreen() {
    const router = useRouter();
    const [categoriesWithCount, setCategoriesWithCount] = useState(
        CATEGORIES.map((cat) => ({ ...cat, products: 0 }))
    );

    useEffect(() => {
        loadCategoryCounts();
    }, []);

    const loadCategoryCounts = async () => {
        try {
            const products = await fetchProducts();
            const categoriesWithProducts = CATEGORIES.map((category) => ({
                ...category,
                products: getProductsByCategory(products, category.title)
                    .length,
            }));
            setCategoriesWithCount(categoriesWithProducts);
        } catch (error) {
            console.error("Failed to load category counts:", error);
        }
    };

    const navigateToCategoryDetail = (categoryId: string) => {
        router.push(`/category/${categoryId}` as any);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Categories</Text>
                    <Text style={styles.headerSubtitle}>
                        Explore crochet by category
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Content */}
                <View style={styles.content}>
                    {/* Category List */}
                    <View style={styles.categoryList}>
                        {categoriesWithCount.map((category) => (
                            <CategoryCard
                                key={category.id}
                                {...category}
                                onPress={() =>
                                    navigateToCategoryDetail(category.id)
                                }
                            />
                        ))}
                    </View>

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacer} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerContent: {
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#fff",
        opacity: 0.9,
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    categoryList: {
        marginBottom: 20,
    },
    bottomSpacer: {
        height: 40,
    },
});
