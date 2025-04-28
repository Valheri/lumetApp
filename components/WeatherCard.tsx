import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WeatherCardProps {
    city: string;
    country: string;
    temperature: string | number; // Support both single value and formatted string
    description: string;
    date: string;
}

export default function WeatherCard({ city, country, temperature, description, date }: WeatherCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.city}>
                {city}, {country}
            </Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.temperature}>{temperature}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    city: {
        fontSize: 18,
        fontWeight: "bold",
    },
    date: {
        fontSize: 14,
        color: "#555",
    },
    temperature: {
        fontSize: 16,
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: "#777",
    },
});