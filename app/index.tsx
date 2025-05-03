import * as Location from "expo-location"; // Import Expo Location
import { Link } from "expo-router";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_KEY } from "../ApiKey";
import WeatherCard from "../components/WeatherCard";
import { WeatherContext } from "./_layout";

export default function Index() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateHourlyWeather, updateDailyWeather, hourlyWeather, dailyWeather } = useContext(WeatherContext);


  // Function to search for weather data based on city name or coordinates
  //Coordinates are used when the user clicks the "Locate" button
  const searchWeather = async (lat?: number, lon?: number) => {
    setLoading(true);
    setError(null); // Reset error state
    try {

      if (!city && !lat && !lon) {
        setError("Please enter a city name or provide coordinates using locate button.");
        setLoading(false);
        return;
      }
      let latitude = lat;
      let longitude = lon;

      if (!latitude || !longitude) {
        // Fetch geocoding data if no coordinates are provided
        const geoRes = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );

        if (!geoRes.ok) {
          throw new Error("Failed to fetch geocoding data");
        }
        const geoData = await geoRes.json();

        if (geoData && geoData.length > 0) {
          latitude = geoData[0].lat;
          longitude = geoData[0].lon;
        } else {
          setError("City not found");
          setLoading(false);
          return;
        }
      }

      // Fetch hourly weather data
      const hourlyWeatherRes = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      if (!hourlyWeatherRes.ok) {
        throw new Error("Failed to fetch hourly weather data");
      }

      const hourlyWeatherJson = await hourlyWeatherRes.json();
      updateHourlyWeather(hourlyWeatherJson); // Update the context

      // Fetch daily weather data
      const dailyWeatherRes = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=16&appid=${API_KEY}&units=metric`
      );

      if (!dailyWeatherRes.ok) {
        throw new Error("Failed to fetch daily weather data");
      }

      const dailyWeatherJson = await dailyWeatherRes.json();
      updateDailyWeather(dailyWeatherJson); // Update the context
    } catch (error) {
      setError("Failed to fetch weather");
    }
    setLoading(false);
  };


  // Function to locate the user using device location
  // This function is called when the user clicks the "Locate" button
  const locateUser = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to fetch weather for your location.");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Use the fetched location for weather data
      await searchWeather(latitude, longitude);
    } catch (error) {
      setError("Failed to fetch location");
      setLoading(false);
    }
  };


  //ScrollView is used to allow scrolling when the keyboard is open
  //helps to avoid the keyboard covering the input field
  return (
    
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // Allow taps outside the keyboard to dismiss it
      >
        <View style={styles.container}>
          <Text style={styles.title}>LumetApp(weather)</Text>
          <TextInput
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => searchWeather()}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={locateUser}>
              <Text style={styles.buttonText}>Locate</Text>
            </TouchableOpacity>
          </View>

          {/* Loading and Error States */}
          {loading && <ActivityIndicator size="large" style={styles.loading} />}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* Hourly Weather, third item list[2] for the current hour */}
          {hourlyWeather && (
            <WeatherCard
              city={hourlyWeather.city.name}
              country={hourlyWeather.city.country}
              temperature={`${hourlyWeather.list[2].main.temp}°C`}
              description={hourlyWeather.list[2].weather[0].description}
              date={`${new Date(hourlyWeather.list[2].dt * 1000).toLocaleDateString()} ${new Date(hourlyWeather.list[2].dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              rain={hourlyWeather.list[2].rain?.["1h"]}
              icon={hourlyWeather.list[2].weather[0].icon}
            />
          )}

          {/* Daily Weather */}
          {dailyWeather && (
            <WeatherCard
              city={dailyWeather.city.name}
              country={dailyWeather.city.country}
              temperature={`Max: ${dailyWeather.list[0].temp.max}°C, Min: ${dailyWeather.list[0].temp.min}°C`}
              description={dailyWeather.list[0].weather[0].description}
              date={new Date(dailyWeather.list[0].dt * 1000).toLocaleDateString()}
              rain={dailyWeather.list[0].rain}
              snow={dailyWeather.list[0].snow}
              icon={dailyWeather.list[0].weather[0].icon}
            />
          )}


          {/* Links to other pages, asChild used to give button animations to link via touchableOpacity */}
          <Link href="/weather" asChild>
            <TouchableOpacity style={styles.linkButton} activeOpacity={0.7}>
              <Text style={styles.linkText}>Weather Page</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/alarms" asChild>
            <TouchableOpacity style={styles.linkButton} activeOpacity={0.7}>
              <Text style={styles.linkText}>Alarms Page</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/chores" asChild>
            <TouchableOpacity style={styles.linkButton} activeOpacity={0.7}>
              <Text style={styles.linkText}>Monthly Chores</Text>
            </TouchableOpacity>
          </Link>

        </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  weatherContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loading: {
    marginTop: 20,
  },
  error: {
    position: "absolute", // Make the error message float above other elements
    top: 10, // Position it near the top of the screen
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 0, 0, 0.8)", // Semi-transparent red background
    color: "#fff", // White text color for contrast
    padding: 10, // Add padding for better readability
    borderRadius: 5, // Rounded corners
    textAlign: "center", // Center the text
    zIndex: 10, // Ensure it appears above other elements
  },
  linkButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
