import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WeatherCard from "../components/WeatherCard";
import { WeatherContext } from "./_layout";

export default function Weather() {
    const { hourlyWeather, dailyWeather } = useContext(WeatherContext);

    const [viewMode, setViewMode] = useState<"hourly" | "daily">("hourly");
    const [selectedDate, setSelectedDate] = useState<string | null>(
        new Date().toISOString().split("T")[0]
    );

    const getUniqueDates = () => {
        if (!hourlyWeather) return [];
        const dates = hourlyWeather.list.map((item: any) => item.dt_txt.split(" ")[0]);
        return Array.from(new Set(dates));
    };

    const filteredHourlyWeather = () => {
        if (!hourlyWeather || !selectedDate) return [];
        return hourlyWeather.list.filter((item: any) =>
            item.dt_txt.startsWith(selectedDate)
        );
    };

    if (!hourlyWeather && !dailyWeather) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No weather data available. Please search from the main page.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {/* View Mode Toggle */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    onPress={() => setViewMode("hourly")}
                    style={[
                        styles.toggleButton,
                        viewMode === "hourly" && styles.activeToggleButton,
                    ]}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            viewMode === "hourly" && styles.activeToggleText,
                        ]}
                    >
                        Hourly
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setViewMode("daily")}
                    style={[
                        styles.toggleButton,
                        viewMode === "daily" && styles.activeToggleButton,
                    ]}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            viewMode === "daily" && styles.activeToggleText,
                        ]}
                    >
                        Daily
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Hourly Weather View */}
            {viewMode === "hourly" && hourlyWeather && (
                <>
                    <View style={styles.dateScroll}>
                        {getUniqueDates().map((date, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDate(date)}
                                style={[
                                    styles.dateButton,
                                    selectedDate === date && styles.selectedDateButton,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        selectedDate === date && styles.selectedDateText,
                                    ]}
                                >
                                    {date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <ScrollView style={{ marginTop: 20 }}>
                        {filteredHourlyWeather().map((item, index) => (
                            <WeatherCard
                                key={index}
                                city={hourlyWeather.city.name}
                                country={hourlyWeather.city.country}
                                temperature={item.main.temp + "°C"}
                                description={item.weather[0].description}
                                date={item.dt_txt}
                            />
                        ))}
                    </ScrollView>
                </>
            )}

            {/* Daily Weather View */}
            {viewMode === "daily" && dailyWeather && (
                <ScrollView style={{ marginTop: 20 }}>
                    {dailyWeather.list.map((item, index) => (
                        <WeatherCard
                            key={index}
                            city={dailyWeather.city.name}
                            country={dailyWeather.city.country}
                            temperature={`Max: ${item.temp.max}°C, Min: ${item.temp.min}°C`}
                            description={item.weather[0].description}
                            date={new Date(item.dt * 1000).toISOString().split("T")[0]} // Convert UNIX timestamp to date
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    toggleButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: "#ccc",
        borderRadius: 5,
    },
    activeToggleButton: {
        backgroundColor: "#007BFF",
    },
    toggleText: {
        color: "#000",
    },
    activeToggleText: {
        color: "#fff",
        fontWeight: "bold",
    },
    dateScroll: {
        flexDirection: "row",
        marginVertical: 10,
        flexWrap: "wrap",
    },
    dateButton: {
        padding: 10,
        margin: 5,
        backgroundColor: "#ccc",
        borderRadius: 5,
    },
    selectedDateButton: {
        backgroundColor: "#007BFF",
    },
    dateText: {
        color: "#000",
    },
    selectedDateText: {
        color: "#fff",
        fontWeight: "bold",
    },
});