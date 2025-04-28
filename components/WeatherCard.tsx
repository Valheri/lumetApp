import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WeatherCardProps {
    city: string;
    country: string;
    temperature: number;
    description: string;
    date: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, country, temperature, description, date }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.city}>{city}, {country}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.temperature}>{temperature}°C</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    city: {
        fontSize: 20,
        fontWeight: "bold",
    },
    date: {
        fontSize: 16,
        color: "#555",
    },
    temperature: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 5,
    },
    description: {
        fontSize: 16,
        color: "#555",
    },
});

export default WeatherCard;
