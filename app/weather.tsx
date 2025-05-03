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

    // Extracts all unique dates from the hourly weather data.
    // Returns an empty array if no hourly weather data is available.
    const getUniqueDates = () => {
        if (!hourlyWeather) return [];
        const uniqueDates = new Set(
            hourlyWeather.list.map((item: any) =>
                new Date(item.dt * 1000).toISOString().split("T")[0]
            )
        );
        return Array.from(uniqueDates);
    };

    // Filters the hourly weather data to include only entries that match the selected date.
    // Returns an empty array if no weather data or selected date is available.
    const filteredHourlyWeather = () => {
        if (!hourlyWeather || !selectedDate) return [];
        return hourlyWeather.list.filter((item: any) =>
            new Date(item.dt * 1000).toISOString().split("T")[0] === selectedDate
        );
    };

    // Formats the date string from "YYYY-MM-DD" to "DD-MM-YYYY".
    const formatDate = (date: number) => {
        return new Date(date * 1000).toLocaleDateString();
    };

    // Formats the time string from "YYYY-MM-DD HH:MM:SS" to "HH:MM".
    const formatTime = (dateTimeString: string) => {
        const time = new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return time;
    };

    if (!hourlyWeather && !dailyWeather) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>No weather data available. Please search from the main page.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* City Name */}
            {hourlyWeather && (
                <Text style={styles.cityName}>
                    {hourlyWeather.city.name}, {hourlyWeather.city.country}
                </Text>
            )}

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
                                    {formatDate(new Date(date).getTime() / 1000)}
                                    {/*
                                    This line takes a date string (e.g., "YYYY-MM-DD"), converts it into a JavaScript Date object,
                                    retrieves its timestamp in milliseconds using `getTime()`, and then divides it by 1000 to convert
                                    it into a Unix timestamp (in seconds). The resulting timestamp is passed to the `formatDate`
                                    function, which formats it into a human-readable date string based on the user's locale.
                                    */}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <ScrollView style={{ marginTop: 20 }}>
                        {filteredHourlyWeather().map((item, index) => (
                            <WeatherCard
                                key={index}
                                temperature={item.main.temp + "°C"}
                                description={item.weather[0].description}
                                date={`${formatDate(item.dt)} ${formatTime(item.dt_txt)}`}
                                rain={item.rain?.["1h"]}
                                icon={item.weather[0].icon}
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
                            temperature={`Max: ${item.temp.max}°C, Min: ${item.temp.min}°C`}
                            description={item.weather[0].description}
                            date={formatDate(item.dt)}
                            rain={item.rain} // Pass rain amount
                            snow={item.snow} // Pass snow amount
                            icon={item.weather[0].icon}
                        />
                    ))}
                </ScrollView>
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
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
    },
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
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    cityName: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
});