import { useEffect, useState } from "react";
import { axiosInstance } from "../services/api-client";
import { message } from "antd";

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [allLocation, setAllLocation] = useState([]);
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllLocations = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/locations");
      setAllLocation(res.data.data ?? []);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createLocation = async (location) => {
    return axiosInstance.post("/locations", location);
  };

  const updateLocation = async (id, updatedData) => {
    return axiosInstance.put(`/locations/${id}`, updatedData);
  };

  const deleteLocation = async (id) => {
    return axiosInstance.delete(`/locations/${id}`);
  };

  const searchLocations = async (searchTerm) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/locations-search`, {
        params: { location: searchTerm },
      });
      setAllLocation(res.data.data ?? []);
    } catch (error) {
      console.error("Search failed", error);
      setAllLocation([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllWeather = async () => {
    try {
      const res = await axiosInstance.get("/weather");
      setWeather(res.data.data ?? []);
    } catch (error) {
      message.error(error?.error ?? "Something went wrong!");
    }
  };

  const getWeatherWithId = (id) => {
    return axiosInstance.get(`/weather/${id}`);
  };

  useEffect(() => {
    getAllLocations();
    getAllWeather();
  }, []);

  return {
    currentWeather,
    allLocation,
    isLoading,
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    weather,
    getWeatherWithId,
    searchLocations,
  };
};

export default useWeather;
