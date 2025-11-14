import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabIcon from "../../components/TabIcon";
import { COLORS } from "../../styles/colors";
import CategoriesScreen from "./categories";
import FavoritesScreen from "./favorites";
import HomeScreen from "./index";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

const PINK_COLOR = COLORS.background;

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: PINK_COLOR,
                tabBarInactiveTintColor: "#888",
                headerShown: false,
                tabBarStyle: {
                    height: 75 + insets.bottom + 10,
                    paddingBottom: insets.bottom + 8,
                    paddingTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: "#f0f0f0",
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
            }}
        >
            <Tab.Screen
                name="index"
                component={HomeScreen}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            name="home-variant-outline"
                            color={color}
                            label="Home"
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="categories"
                component={CategoriesScreen}
                options={{
                    title: "Categories",
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            name="tag-multiple-outline"
                            color={color}
                            label="Categories"
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="favorites"
                component={FavoritesScreen}
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            name="heart-outline"
                            color={color}
                            label="Favorites"
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <TabIcon
                            name="account-outline"
                            color={color}
                            label="Profile"
                        />
                    ),
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    );
}
