import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import { useCreateCustomer } from "./services/customerApi";

const { Title, Text } = Typography;

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterPage = ({ onSuccess }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Use the custom hook to create customer
  const mutationBooking = useCreateCustomer({
    onSuccess: () => {
      if (onSuccess) onSuccess(); // Gọi callback (nếu có)
      message.success("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    },
  });
 const onFinish = async (values: any) => {
  setLoading(true);
  try {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    // Gọi mutation để tạo khách hàng
    await mutationBooking.mutateAsync(payload);

    // Thành công, chuyển hướng về trang đăng nhập

  } catch (error: any) {
    console.error("Register error:", error);

    // Kiểm tra lỗi trả về từ backend
    if (error?.response?.data?.error) {
      const errorMessage = error?.response?.data?.error;

      // Nếu lỗi là "Email đã được đăng ký", hiển thị dưới trường email
      if (errorMessage === "Email đã được đăng ký") {
        form.setFields([
          {
            name: "email",
            errors: ["Email này đã được đăng ký. Vui lòng sử dụng email khác."],
          },
        ]);
      } else {
        message.error(errorMessage || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } else {
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }

  } finally {
    setLoading(false);
  }
};




  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588159343745-4454c7da7e0d?auto=format&fit=crop&w=1600&q=80')", // 👉 ảnh nền spa
      }}
    >
      {/* overlay gradient */}
      <div className="absolute inset-0 bg-pink-200/30 backdrop-blur-sm"></div>

      {/* form container */}
      <div className="relative bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[400px] z-10">
        <Title level={2} className="text-center mb-1 !text-gray-800">
          Tạo tài khoản mới
        </Title>
        <Text className="block text-center !text-teal-500 mb-6">
          Tham gia cộng đồng Thảo Susi Store
        </Text>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          autoComplete="off"
        >
          {/* Họ và tên */}
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Họ và tên"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="email"  // Tên trường phải khớp với name trong setFields
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="h-11 rounded-lg"
            />
          </Form.Item>


          {/* Số điện thoại */}
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(0[0-9]{9})$/,
                message: "Số điện thoại không hợp lệ (bắt đầu bằng 0, 10 số)!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Số điện thoại"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
                message: "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu (tối thiểu 8 ký tự)"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
              className="h-11 rounded-lg"
            />
          </Form.Item>

          {/* Điều khoản */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error("Bạn phải đồng ý với điều khoản!")
                    ),
              },
            ]}
          >
            <Checkbox>
              Tôi đồng ý với{" "}
              <a href="#" className="text-pink-600">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-pink-600">
                Chính sách bảo mật
              </a>
            </Checkbox>
          </Form.Item>

          {/* Nút đăng ký */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="!bg-teal-500 hover:!bg-teal-600 h-11 rounded-lg font-medium"
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div className="text-center mt-3">
            <span>Đã có tài khoản? </span>
            <Link to="/login" className="text-pink-600 font-semibold">
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
