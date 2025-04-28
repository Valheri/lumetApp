import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_KEY } from "../ApiKey";
import { WeatherContext } from "./_layout";

export default function Index() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateHourlyWeather, updateDailyWeather, hourlyWeather, dailyWeather } = useContext(WeatherContext);

  const searchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null); // Reset error state
    try {
      // Fetch geocoding data
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      if (!geoRes.ok) {
        throw new Error("Failed to fetch geocoding data");
      }
      const geoData = await geoRes.json();

      if (geoData && geoData.length > 0) {
        const { lat, lon } = geoData[0];

        // Fetch hourly weather data
        const hourlyWeatherRes = await fetch(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!hourlyWeatherRes.ok) {
          throw new Error("Failed to fetch hourly weather data");
        }

        const hourlyWeatherJson = await hourlyWeatherRes.json();
        updateHourlyWeather(hourlyWeatherJson); // Update the context

        // Fetch daily weather data
        const dailyWeatherRes = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${API_KEY}&units=metric`
        );

        if (!dailyWeatherRes.ok) {
          throw new Error("Failed to fetch daily weather data");
        }

        const dailyWeatherJson = await dailyWeatherRes.json();
        updateDailyWeather(dailyWeatherJson); // Update the context
      } else {
        setError("City not found");
      }
    } catch (error) {
      setError("Failed to fetch weather");
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Weather App</Text>
      <TextInput
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          width: "100%",
        }}
      />
      <Button title="Search" onPress={searchWeather} />
      {hourlyWeather && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>
            Hourly Weather in {hourlyWeather.city.name}, {hourlyWeather.city.country}
          </Text>
          <Text>Temperature: {hourlyWeather.list[0].main.temp}°C</Text>
          <Text>Description: {hourlyWeather.list[0].weather[0].description}</Text>
        </View>
      )}
      {dailyWeather && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>
            Daily Weather in {dailyWeather.city.name}, {dailyWeather.city.country}
          </Text>
          <Text>Max Temp: {dailyWeather.list[0].temp.max}°C</Text>
          <Text>Min Temp: {dailyWeather.list[0].temp.min}°C</Text>
          <Text>Description: {dailyWeather.list[0].weather[0].description}</Text>
        </View>
      )}
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {error && <Text style={{ color: "red", marginTop: 20 }}>{error}</Text>}
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Link href="/weather" style={{ color: "#fff", fontWeight: "bold" }}>
          Weather Page
        </Link>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Link href="/alarms" style={{ color: "#fff", fontWeight: "bold" }}>
          Alarms Page
        </Link>
      </TouchableOpacity>
    </View>
  );
}
