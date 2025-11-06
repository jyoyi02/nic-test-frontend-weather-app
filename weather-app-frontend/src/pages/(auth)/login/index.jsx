import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/auth-context";
import { axiosInstance } from "../../../services/api-client";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/login", values);
      console.log({ res });
      login(res.data.data);
      message.success("Login successfull!");
      navigate("/", { replace: true });
    } catch (error) {
      message.error(error?.error ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Card className="w-96 shadow-lg">
        <h3 className="text-center text-2xl">Weather Dashboard</h3>
        <h5 className="text-center text-lg">Login in to your account</h5>
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
