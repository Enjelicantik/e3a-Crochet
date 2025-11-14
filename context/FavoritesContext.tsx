import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../lib/api";

interface FavoritesContextType {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    const addToFavorites = (product: Product) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.find((fav) => fav.id === product.id);
            if (!exists) {
                return [...prevFavorites, product];
            }
            return prevFavorites;
        });
    };

    const removeFromFavorites = (productId: string) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id !== productId)
        );
    };

    const isFavorite = (productId: string) => {
        return favorites.some((fav) => fav.id === productId);
    };

    const toggleFavorite = (product: Product) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
