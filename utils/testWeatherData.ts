export const testWeatherData = {
    cod: "200",
    message: 0,
    cnt: 8, // Reduced for readability
    list: [
        // Data for "Snow Work" warning (snowfall > 10mm in a day)
        {
            dt: 1745863200,
            main: {
                temp: -2,
                feels_like: -5,
                temp_min: -2,
                temp_max: -1,
                pressure: 1008,
                humidity: 90,
            },
            weather: [{ id: 600, main: "Snow", description: "light snow", icon: "13d" }],
            wind: { speed: 5, deg: 200 },
            visibility: 10000,
            pop: 1,
            snow: { "1h": 6 }, // 6mm snowfall
            dt_txt: "2025-04-28 08:00:00",
        },
        {
            dt: 1745866800,
            main: {
                temp: -1,
                feels_like: -4,
                temp_min: -1,
                temp_max: 0,
                pressure: 1007,
                humidity: 92,
            },
            weather: [{ id: 600, main: "Snow", description: "light snow", icon: "13n" }],
            wind: { speed: 4, deg: 210 },
            visibility: 10000,
            pop: 1,
            snow: { "1h": 5 }, // 5mm snowfall
            dt_txt: "2025-04-28 09:00:00",
        },
        // Total snowfall for the day: 11mm (triggers "Snow Work" warning)

        // Data for "Sand the Streets" warning (temperature fluctuates above and below 0°C)
        {
            dt: 1745870400,
            main: {
                temp: 1,
                feels_like: -1,
                temp_min: 1,
                temp_max: 2,
                pressure: 1006,
                humidity: 85,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            wind: { speed: 3, deg: 180 },
            visibility: 10000,
            pop: 0,
            dt_txt: "2025-04-29 08:00:00",
        },
        {
            dt: 1745874000,
            main: {
                temp: -1,
                feels_like: -3,
                temp_min: -1,
                temp_max: 0,
                pressure: 1005,
                humidity: 88,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            wind: { speed: 2, deg: 190 },
            visibility: 10000,
            pop: 0,
            dt_txt: "2025-04-29 20:00:00",
        },
        // Temperature crosses above and below 0°C (triggers "Sand the Streets" warning)

        // Data for "High Winds" warning (wind speed > 15 m/s)
        {
            dt: 1745881200,
            main: {
                temp: 5,
                feels_like: 2,
                temp_min: 5,
                temp_max: 6,
                pressure: 1004,
                humidity: 80,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            wind: { speed: 16, deg: 250 }, // Wind speed > 15 m/s
            visibility: 10000,
            pop: 0,
            dt_txt: "2025-04-30 10:00:00",
        },
    ],
    city: {
        id: 658225,
        name: "Helsinki",
        coord: { lat: 60.1675, lon: 24.9427 },
        country: "FI",
        timezone: 10800,
        sunrise: 1745807114,
        sunset: 1745863797,
    },
};
