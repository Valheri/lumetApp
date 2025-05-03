import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface WeatherCardProps {
    city?: string;
    country?: string;
    temperature: string | number; // Support both single value and formatted string
    description: string;
    date: string;
    rain?: number; // Optional rain amount
    snow?: number; // Optional snow amount
    icon?: string; // Weather icon code
}

export default function WeatherCard({ city, temperature, description, date, rain, snow, icon }: WeatherCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                {city !== undefined && <Text style={styles.city}>{city}</Text>}
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.temperature}>{temperature}</Text>
                <Text style={styles.description}>{description}</Text>
                {rain !== undefined && <Text style={styles.precipitation}>Rain: {rain} mm</Text>}
                {snow !== undefined && <Text style={styles.precipitation}>Snow: {snow} mm</Text>}
            </View>
            {icon && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: `http://openweathermap.org/img/wn/${icon}@4x.png` }}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row", // Divide the card into two horizontal sections
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        height: 190, // Constrain the height of the card
    },
    infoContainer: {
        flex: 1, // Take up half of the card
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2, // Add a border
        borderColor: "#007BFF", // Blue border color
        borderRadius: 5, // Optional: Add rounded corners
        backgroundColor: "lightblue", // Optional: Light background for the image
    },
    city: {
        
    },
    date: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    temperature: {
        fontSize: 22,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: "#777",
        marginBottom: 5,
    },
    precipitation: {
        fontSize: 14,
        color: "#333",
        marginTop: 5,
    },
    icon: {
        width: "80%",
        height: "80%",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
});