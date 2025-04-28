# Welcome to lumetApp 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).


## API Key Setup

This project uses the OpenWeatherMap API to fetch weather data. The API key is stored in a separate file (`ApiKey.ts`) for security purposes and is not included in the repository.

To use this project, you need to create your own `ApiKey.ts` file and provide your own API key. Follow these steps:

1. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
2. Create a file named `ApiKey.ts` in the root of the project (if it doesn't already exist).
3. Add the following code to the file, replacing `YOUR_API_KEY` with your actual API key:

   ```typescript
   export const API_KEY = "YOUR_API_KEY";
   ```


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
