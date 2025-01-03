"use client";

import { useState,useEffect } from "react";
import axios from "axios";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

interface WeatherData {
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        main: string;
        description: string;
        id: number;
    }>;
    wind: {
        speed: number;
    };
}

export default function WeatherWidget() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [temperatureMessage, setTemperatureMessage] = useState<string | null>(null);
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [dayOrNight, setDayOrNight] = useState<string>("");

    useEffect(() => {
        if (weatherData) {
            const currentTime = new Date().getTime() / 1000;
            const sunriseTime = weatherData.sys.sunrise;
            const sunsetTime = weatherData.sys.sunset;

            if (currentTime < sunriseTime) {
                setDayOrNight("Night");
            } else if (currentTime > sunsetTime) {
                setDayOrNight("Night");
            } else {
                setDayOrNight("Day");
            }
        }
    }, [weatherData]);

    const fetchWeatherData = async (city: string) => {
        setLoading(true);
        setError(null);
        setTemperatureMessage(null);
        try {
            const response = await axios.get<WeatherData>(`/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`);
            setWeatherData(response.data);

            const tempCelsius = response.data.main.temp;
            const tempFahrenheit = (tempCelsius * 9/5) + 32;

            if (unit === 'metric') {
                if (tempCelsius < 10) {
                    setTemperatureMessage("Brrr! It's freezing cold. Bundle up warmly!");
                } else if (tempCelsius >= 10 && tempCelsius < 20) {
                    setTemperatureMessage("It's quite chilly. A warm jacket is recommended.");
                } else if (tempCelsius >= 20 && tempCelsius < 30) {
                    setTemperatureMessage("It's a nice day. A light jacket might be enough.");
                } else if (tempCelsius >= 30) {
                    setTemperatureMessage("It's hot out there! Stay hydrated and wear light clothing.");
                }
            } else {
                if (tempFahrenheit < 50) {
                    setTemperatureMessage("Brrr! It's freezing cold. Bundle up warmly!");
                } else if (tempFahrenheit >= 50 && tempFahrenheit < 68) {
                    setTemperatureMessage("It's quite chilly. A warm jacket is recommended.");
                } else if (tempFahrenheit >= 68 && tempFahrenheit < 86) {
                    setTemperatureMessage("It's a nice day. A light jacket might be enough.");
                } else if (tempFahrenheit >= 86) {
                    setTemperatureMessage("It's hot out there! Stay hydrated and wear light clothing.");
                }
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            if (axios.isAxiosError(error)) {
                setError("City not found. Please enter a valid city.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city) {
            fetchWeatherData(city);
        }
    };

    const handleUnitToggle = () => {
        setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    };

    const getWeatherIcon = (id: number) => {
        if (id >= 200 && id < 300) return <CloudRain className="h-12 w-12 text-gray-400" />;
        if (id >= 300 && id < 500) return <CloudRain className="h-12 w-12 text-blue-400" />;
        if (id >= 500 && id < 600) return <CloudRain className="h-12 w-12 text-blue-600" />;
        if (id >= 600 && id < 700) return <CloudRain className="h-12 w-12 text-white" />;
        if (id >= 700 && id < 800) return <Wind className="h-12 w-12 text-gray-400" />;
        if (id === 800) return <Sun className="h-12 w-12 text-yellow-400" />;
        return <Cloud className="h-12 w-12 text-gray-400" />;
    };

    const getBackgroundGradient = (id: number) => {
        if (id >= 200 && id < 300) return "bg-gradient-to-br from-gray-600 via-gray-800 to-black";
        if (id >= 300 && id < 500) return "bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700";
        if (id >= 500 && id < 600) return "bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900";
        if (id >= 600 && id < 700) return "bg-gradient-to-br from-white via-gray-300 to-gray-500";
        if (id >= 700 && id < 800) return "bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700";
        if (id === 800) return "bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700";
        return "bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800";
    };

    const backgroundClass = weatherData?.weather[0]?.id ? getBackgroundGradient(weatherData.weather[0].id) : "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500";

    
    const convertTemperature = (temp: number) => {
        if (unit === 'metric') {
            return temp; 
        } else {
            return (temp * 9/5) + 32; // this will convert Celsius to  Fahrenheit
        }
    };

    return (
            <div className={`relative min-h-screen flex items-center justify-center ${backgroundClass}`}>
<h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl font-extrabold uppercase text-white mb-6 md:mb-12 z-20">
Weather Widget
            </h1>
            <div className="relative z-10 mt-20">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-md">
                <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold text-center text-gray-800">Weather Widget</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border-2 border-gray-300 text-black bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md hover:shadow-lg">
                            {loading ? (
                                <div className="spinner" role="status" aria-label="Loading spinner"></div>
                            ) : (
                                "Get Weather"
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={handleUnitToggle}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200">
                            Convert to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
                        </Button>
                    </form>
                    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                    {temperatureMessage && <p className="text-yellow-600 text-center mt-4 font-semibold">{temperatureMessage}</p>}
                    {weatherData && (
                        <div className="mt-6 text-center">
                            <div className="flex items-center justify-center mb-4">
                                {weatherData.weather[0] && getWeatherIcon(weatherData.weather[0].id)}
                            </div>
                            <h2 className="text-base md:text-xl text-gray-600">
                                {weatherData.name}, {weatherData.sys.country}
                            </h2>
                            <p className="text-xl text-gray-600">{weatherData.weather[0]?.description}</p>
                            <p className="text-base md:text-lg text-gray-600">
                                {Math.round(convertTemperature(weatherData.main.temp))}°{unit === 'metric' ? 'C' : 'F'}
                            </p>
                            <p className="text-base md:text-xl text-gray-600">
                                Feels like {Math.round(convertTemperature(weatherData.main.feels_like))}°{unit === 'metric' ? 'C' : 'F'}
                            </p>
                            <p className="text-base md:text-xl text-gray-600">
                                Humidity: {weatherData.main.humidity}%
                            </p>
                            <p className="text-base md:text-xl text-gray-600">
                                Pressure: {weatherData.main.pressure} hPa
                            </p>
                            <p className="text-base md:text-xl text-gray-600">
                                Wind Speed: {unit === 'metric' ? weatherData.wind.speed + ' m/s' : (weatherData.wind.speed * 2.237).toFixed(1) + ' mph'}
                            </p>
                            <p className="text-base md:text-xl text-gray-600">
                                {dayOrNight}
                            </p>
                        </div>
                    )}
                </CardContent>
                <footer className="bg-white text-black text-sm py-4 mt-auto bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          <div className="text-center">
            <p className="text-1.8xl font-bold text-center text-gray-800">Made By Taha Saif (GIAIC Student)</p>
          </div>
        </footer>
            </Card>
            </div>
        </div>
    );
};