import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TabIconProps {
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, label }) => {
    const isActive = color !== "#888";

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.iconContainer,
                    isActive && styles.iconContainerActive,
                ]}
            >
                <MaterialCommunityIcons name={name} color={color} size={26} />
            </View>
            <Text
                style={[
                    styles.label,
                    { color },
                    isActive && styles.labelActive,
                ]}
            >
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: 100,
        paddingTop: 30,
    },
    iconContainer: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "transparent",
    },
    iconContainerActive: {
        backgroundColor: "rgba(233, 30, 99, 0.1)",
        transform: [{ scale: 1.05 }],
    },
    label: {
        fontSize: 11,
        fontWeight: "500",
        marginTop: 2,
    },
    labelActive: {
        fontWeight: "600",
    },
});

export default TabIcon;
