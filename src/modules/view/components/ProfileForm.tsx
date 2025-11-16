import { useState, useEffect } from "react";
import { axiosClient } from "../../../shared/lib/axiosClient";
import { message } from "antd";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/auth/get-profile");
        const user = res.data.user;
        setForm({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          birthday: user.dob ? user.dob.split("T")[0] : "",
          gender: user.gender || "Khác",
          address: user.address || "",
          city: user.city || "",
          country: user.country || "Việt Nam",
          createdAt: user.createdAt || "",
        });
      } catch (error) {
        console.error("Lỗi khi tải thông tin user:", error);
        messageApi.error("Không thể tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        gender: form.gender,
        dob: form.birthday,
      };

      const res = await axiosClient.put("/auth/update-profile", payload);
      messageApi.success(res.data.message || "Cập nhật thành công!");
    } catch (error: any) {
      console.error("Lỗi khi cập nhật:", error);
      messageApi.error(error.response?.data?.error || "Có lỗi xảy ra khi cập nhật!");
    }
  };

  if (loading) return <div>Đang tải thông tin...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-4xl mx-auto w-full">
      {contextHolder}

      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Thông tin cá nhân
      </h2>

      {/* Avatar + Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border shadow-sm"
        />

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">{form.name}</h3>
          <p className="text-gray-500">{form.email}</p>
          <p className="text-sm text-gray-400">
            Thành viên từ{" "}
            {new Date(form.createdAt).toLocaleDateString("vi-VN", {
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* --- FORM --- */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Họ và tên */}
        <InputField
          label="Họ và tên *"
          value={form.name}
          onChange={(v:any) => setForm({ ...form, name: v })}
        />

        {/* Giới tính */}
        <div>
          <label className="block text-sm font-medium mb-1">Giới tính</label>
          <div className="flex items-center gap-4 mt-2">
            {["Nam", "Nữ", "Khác"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={() => setForm({ ...form, gender: g })}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <InputField label="Email *" value={form.email} readOnly />

        <InputField
          label="Địa chỉ"
          value={form.address}
          onChange={(v:any) => setForm({ ...form, address: v })}
        />

        <InputField
          label="Số điện thoại"
          value={form.phone}
          onChange={(v:any) => setForm({ ...form, phone: v })}
        />

        <InputField
          label="Ngày sinh"
          type="date"
          value={form.birthday}
          onChange={(v:any) => setForm({ ...form, birthday: v })}
        />

        {/* Thành phố */}
        <SelectField
          label="Thành phố"
          value={form.city}
          onChange={(v:any) => setForm({ ...form, city: v })}
          options={["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"]}
        />

        {/* Quốc gia */}
        <SelectField
          label="Quốc gia"
          value={form.country}
          onChange={(v:any) => setForm({ ...form, country: v })}
          options={["Việt Nam", "Hoa Kỳ", "Nhật Bản"]}
        />
      </form>

      {/* BUTTONS */}
      <div className="mt-8 flex flex-col md:flex-row gap-3">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full md:w-auto"
        >
          Cập nhật thông tin
        </button>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md text-white w-full md:w-auto"
        >
          Loading
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/*  COMPONENT CON GỌN GÀNG             */
/* ---------------------------------- */

function InputField({ label, value, onChange, type = "text", readOnly = false }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150 px-3 py-2 outline-none"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150 px-3 py-2 outline-none"
      >
        {options.map((o: any) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
