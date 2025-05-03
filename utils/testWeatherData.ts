export const testDailyWeatherData = {
    cod: "200", // Internal parameter
    message: 0, // Internal parameter
    cnt: 3, // Number of days returned in the API response
    city: {
        id: 658225,
        name: "Helsinki",
        coord: { lat: 60.1675, lon: 24.9427 },
        country: "FI",
        population: 631695, // Example population
        timezone: 10800, // UTC+3
    },
    list: [
        // Day 1: Snowfall > 20mm (triggers "Snow Work" warning)
        {
            dt: 1745863200,
            sunrise: 1745840000,
            sunset: 1745880000,
            temp: {
                day: -1,
                min: -3,
                max: 0,
                night: -2,
                eve: -1,
                morn: -3,
            },
            feels_like: {
                day: -5,
                night: -6,
                eve: -4,
                morn: -6,
            },
            pressure: 1008,
            humidity: 90,
            weather: [{ id: 600, main: "Snow", description: "light snow", icon: "13d" }],
            speed: 5,
            deg: 200,
            gust: 8,
            clouds: 75,
            pop: 1,
            rain: 0,
            snow: 22, // 22mm snowfall
        },
        // Day 2: Temperature fluctuates above and below 0°C with high humidity (triggers "Sand the Streets" warning)
        {
            dt: 1745949600,
            sunrise: 1745926400,
            sunset: 1745966400,
            temp: {
                day: 1,
                min: -2,
                max: 2,
                night: -1,
                eve: 0,
                morn: -2,
            },
            feels_like: {
                day: -1,
                night: -3,
                eve: -2,
                morn: -4,
            },
            pressure: 1006,
            humidity: 85, // High humidity indicates wet conditions
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            speed: 3,
            deg: 180,
            gust: 5,
            clouds: 10,
            pop: 0.2,
            rain: 0.5, // Light rain
            snow: 0,
        },
        // Day 3: Wind speed > 15 m/s (triggers "High Winds" warning)
        {
            dt: 1746036000,
            sunrise: 1746012800,
            sunset: 1746052800,
            temp: {
                day: 5,
                min: 3,
                max: 6,
                night: 4,
                eve: 5,
                morn: 3,
            },
            feels_like: {
                day: 2,
                night: 1,
                eve: 3,
                morn: 1,
            },
            pressure: 1004,
            humidity: 70,
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            speed: 16, // High wind speed
            deg: 250,
            gust: 20,
            clouds: 5,
            pop: 0,
            rain: 0,
            snow: 0,
        },
    ],
};