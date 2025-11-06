import React from "react";
import useWeather from "../../hooks/use-weather";
import { Table } from "antd";

const WeatherPage = () => {
  const { weather } = useWeather();
  console.log({ weather });

  const formattedData =
    weather?.map((item) => ({
      ...item,
      key: item.id,
      temperature: `${item.temperature}°C`,
      humidity: `${item.humidity}%`,
      locationName: item.location?.name || "Unknown",
    })) || [];

  const columns = [
    {
      title: "Temperature",
      dataIndex: "temperature",
      key: "temperature",
    },
    {
      title: "Humidity",
      dataIndex: "humidity",
      key: "humidity",
    },
    {
      title: "Wind Speed",
      dataIndex: "wind_speed",
      key: "wind_speed",
    },
    {
      title: "Location",
      dataIndex: "locationName",
      key: "locationName",
    },
  ];

  return (
    <div>
      <Table dataSource={formattedData} columns={columns} pagination={false} />
    </div>
  );
};

export default WeatherPage;
