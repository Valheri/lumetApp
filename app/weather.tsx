import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_KEY } from '../ApiKey'; // Create ApiKey.ts file in the root directory and add your API key there
import WeatherCard from "../components/WeatherCard";

interface Weather {
    list: {
        dt_txt: string;
        main: { temp: number };
        weather: { description: string }[];
    }[];
    city: { name: string; country: string };
}

export default function Weather() {
    // Log the API key when the component initializes
    useEffect(() => {
        console.log("API_KEY:", API_KEY);
    }, []);

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(new Date().toISOString().split("T")[0]); // Default to current date

    const searchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError(null); // Reset error state
        try {
            // Geocoding API call to convert city name to coordinates
            const geoRes = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
            );

            if (!geoRes.ok) {
                throw new Error("Failed to fetch geocoding data");
            }
            const geoData = await geoRes.json();

            if (geoData && geoData.length > 0) {
                const { lat, lon } = geoData[0];
                // Weather API call using the obtained coordinates
                const weatherRes = await fetch(
                    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                const weatherJson = await weatherRes.json();
                setWeather(weatherJson);
                
            } else {
                setError("City not found");
            }
        } catch (error) {
            setError("Failed to fetch weather");
        }
        setLoading(false);
    };

    const getUniqueDates = () => {
        if (!weather) return [];
        const dates = weather.list.map((item: any) => item.dt_txt.split(" ")[0]);
        return Array.from(new Set(dates));
    };

    const filteredWeather = () => {
        if (!weather || !selectedDate) return weather?.list || [];
        return weather.list.filter((item: any) => item.dt_txt.startsWith(selectedDate));
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Weather Information {API_KEY}</Text>
            <TextInput
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 }}
            />
            <Button title="Search" onPress={searchWeather} />
            {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
            {error && <Text style={{ color: "red", marginTop: 20 }}>{error}</Text>}
            {weather && !error && (
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
                                <Text style={[
                                    styles.dateText,
                                    selectedDate === date && styles.selectedDateText,
                                ]}>
                                    {date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <ScrollView style={{ marginTop: 20 }}>
                        {filteredWeather().map((item, index) => (
                            <WeatherCard
                                key={index}
                                city={weather.city.name}
                                country={weather.city.country}
                                temperature={item.main.temp}
                                description={item.weather[0].description}
                                date={item.dt_txt}
                            />
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
