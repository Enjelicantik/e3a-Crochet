import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../styles/colors";

interface ProfileMenuItemProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
    showChevron?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    showChevron = true,
}) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={icon}
                    size={24}
                    color={COLORS.background}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            {showChevron && (
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#ccc"
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 13,
        color: "#999",
    },
});

export default ProfileMenuItem;
