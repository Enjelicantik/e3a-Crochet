// API Configuration
const API_BASE_URL = "https://69023f38b208b24affe599f8.mockapi.io/api";

// Types
export interface Product {
    id: string;
    name: string;
    price_rupiah: number;
    total_likes: number;
    total_stock: number;
    total_review: number;
    description: string;
    url_picture: string;
    category: string;
}

export interface Category {
    id: string;
    title: string;
    icon: keyof typeof import("@expo/vector-icons").MaterialCommunityIcons.glyphMap;
    color: string;
}

// Categories (Static Data)
export const CATEGORIES = [
    {
        id: "1",
        title: "Aksesoris & Fashion",
        icon: "hanger" as const,
        color: "#9C27B0",
    },
    {
        id: "2",
        title: "Amigurumi & Boneka",
        icon: "teddy-bear" as const,
        color: "#00897B",
    },
    {
        id: "3",
        title: "Dekorasi Rumah",
        icon: "home-heart" as const,
        color: "#E53935",
    },
    {
        id: "4",
        title: "Bayi & Anak",
        icon: "baby-carriage" as const,
        color: "#1E88E5",
    },
    {
        id: "5",
        title: "Tas & Dompet",
        icon: "bag-personal" as const,
        color: "#F4511E",
    },
    {
        id: "6",
        title: "Perhiasan",
        icon: "necklace" as const,
        color: "#FFB300",
    },
];

// API Functions
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchProductById = async (id: string): Promise<Product> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export const getProductsByCategory = (
    products: Product[],
    categoryTitle: string
): Product[] => {
    return products.filter((product) => product.category === categoryTitle);
};

export const formatPrice = (price: number): string => {
    return `Rp ${price.toLocaleString("id-ID")}`;
};
