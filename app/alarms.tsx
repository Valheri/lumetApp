import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AlarmCard from "../components/AlarmCard";
import { generateAlarms } from "../utils/weatherCalculations";
import { WeatherContext } from "./_layout";

export default function Alarms() {
    const { dailyWeather } = useContext(WeatherContext);

    const alarms = dailyWeather ? generateAlarms(dailyWeather) : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alarms</Text>
            {alarms.length > 0 ? (
                <ScrollView>
                    {alarms.map((alarm, index) => (
                        <AlarmCard
                            key={index}
                            title={`${alarm.title} (${alarm.date})`}
                            description={alarm.description}
                        />
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noAlarmsText}>No alarms or warnings for the forecasted days.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f4f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#007BFF",
    },
    noAlarmsText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 20,
    },
});