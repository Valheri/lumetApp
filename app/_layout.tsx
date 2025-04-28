import { Stack } from "expo-router";
import React, { createContext, useState } from "react";
import { DailyWeather, HourlyWeather } from "../utils/types";

export const WeatherContext = createContext<{
  hourlyWeather: HourlyWeather | null;
  dailyWeather: DailyWeather | null;
  updateHourlyWeather: (data: HourlyWeather | null) => void;
  updateDailyWeather: (data: DailyWeather | null) => void;
}>({
  hourlyWeather: null,
  dailyWeather: null,
  updateHourlyWeather: () => {},
  updateDailyWeather: () => {},
});

export default function RootLayout() {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather | null>(null);

  return (
    <WeatherContext.Provider
      value={{
        hourlyWeather,
        dailyWeather,
        updateHourlyWeather: setHourlyWeather,
        updateDailyWeather: setDailyWeather,
      }}
    >
      <Stack />
    </WeatherContext.Provider>
  );
}