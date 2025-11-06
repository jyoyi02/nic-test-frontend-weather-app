import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import useWeather from "../../hooks/use-weather";
import {
  Table,
  Button,
  Modal,
  Descriptions,
  Spin,
  Form,
  Input,
  message,
  Space,
} from "antd";
import useDebounce from "../../hooks/use-debouce";

const LocationPage = () => {
  const {
    allLocation,
    isLoading,
    createLocation,
    updateLocation,
    deleteLocation,
    getAllLocations,
    searchLocations,
  } = useWeather();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [form] = Form.useForm();

  const handleView = (location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleAddLocation = () => {
    form.validateFields().then(async (values) => {
      try {
        await createLocation(values);
        message.success("Location added!");
        setIsAddModalOpen(false);
        form.resetFields();
        getAllLocations();
      } catch (err) {
        console.error(err);
        message.error("Failed to add location");
      }
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchLocations(debouncedSearchTerm);
    } else {
      getAllLocations();
    }
  }, [debouncedSearchTerm]);

  const handleEditLocation = () => {
    form.validateFields().then(async (values) => {
      try {
        await updateLocation(selectedLocation.id, values);
        message.success("Location updated!");
        setIsEditModalOpen(false);
        form.resetFields();
        getAllLocations();
      } catch (err) {
        console.error(err);
        message.error("Failed to update location");
      }
    });
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await deleteLocation(locationId);
      message.success("Location deleted!");
      getAllLocations();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete location");
    }
  };

  const columns = [
    {
      title: "Location",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex justify-end gap-3 w-full">
          <Button type="link" onClick={() => handleView(record)}>
            View Weather
          </Button>
          <Button
            type="link"
            onClick={() => {
              setSelectedLocation(record);
              setIsEditModalOpen(true);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteLocation(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 md:gap-4">
        <h2 className="text-xl font-semibold">Locations</h2>

        <div className="flex gap-2 w-full md:w-auto">
          <Input.Search
            placeholder="Search by name"
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
            Add Location
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[20rem] w-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table
          dataSource={allLocation}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      )}

      <Modal
        title={selectedLocation?.name}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedLocation?.weather?.[0] ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Temperature">
              {selectedLocation.weather[0].temperature}°C
            </Descriptions.Item>
            <Descriptions.Item label="Humidity">
              {selectedLocation.weather[0].humidity}%
            </Descriptions.Item>
            <Descriptions.Item label="Wind Speed">
              {selectedLocation.weather[0].wind_speed} km/h
            </Descriptions.Item>
            <Descriptions.Item label="Precipitation">
              {selectedLocation.weather[0].precipitation} mm
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No weather data available.</p>
        )}
      </Modal>

      <Modal
        title="Add New Location"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddLocation}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Location Name"
            rules={[{ required: true, message: "Please enter location name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true, message: "Please enter latitude" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true, message: "Please enter longitude" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Location"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditLocation}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Location Name"
            rules={[{ required: true, message: "Please enter location name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true, message: "Please enter latitude" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true, message: "Please enter longitude" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationPage;
