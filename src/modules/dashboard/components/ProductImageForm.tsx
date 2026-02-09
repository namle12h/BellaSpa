


import {
  Modal,
  Upload,
  Switch,
  InputNumber,
  message,
  Image,
  Button,
  Space,
  Popconfirm,
  Spin,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  useProductImages,
  useDeleteProductImage,
  useUpdateProductImage,
} from "../../../shared/services/productImageApi";
import { axiosClient } from "../../../shared/lib/axiosClient";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductImageModal({
  open,
  onClose,
  productId,
}: {
  open: boolean;
  onClose: () => void;
  productId: number | null;
}) {
  const queryClient = useQueryClient();

  /* ================= STATE ================= */
  const [fileList, setFileList] = useState<any[]>([]);
  const [isPrimary, setIsPrimary] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= DATA ================= */
  const { data: images = [], isLoading } = useProductImages(productId);
  const deleteMutation = useDeleteProductImage(productId);
  const updateMutation = useUpdateProductImage(productId);

  /* ================= ADD ================= */
  const handleUpload = async () => {
    if (!fileList.length) {
      message.error("Vui lòng chọn ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);
    formData.append("isPrimary", String(isPrimary));
    formData.append("sortOrder", String(sortOrder));

    try {
      setLoading(true);
      await axiosClient.post(
        `/products/${productId}/images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      queryClient.invalidateQueries({
        queryKey: ["product-images", productId],
      });
      message.success("Thêm ảnh phụ thành công ✅");
      setFileList([]);
      setIsPrimary(false);
      setSortOrder(0);
    } catch (e: any) {
      message.error(e.response?.data?.message || "Upload thất bại ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = (imageId: number, file: File) => {
    updateMutation.mutate(
      { imageId, file },
      {
        onSuccess: () => message.success("Đã cập nhật ảnh ✏️"),
        onError: () => message.error("Cập nhật ảnh thất bại ❌"),
      }
    );
  };

  /* ================= DELETE ================= */
  const handleDelete = (imageId: number) => {
    deleteMutation.mutate(imageId, {
      onSuccess: () => message.success("Đã xóa ảnh 🗑️"),
      onError: () => message.error("Xóa ảnh thất bại ❌"),
    });
  };

  return (
    <Modal
      title={`Quản lý ảnh phụ – Product #${productId}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
    >
      {/* ================= ADD IMAGE ================= */}
      <Upload
        listType="picture-card"
        beforeUpload={() => false}
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        maxCount={1}
      >
        <PlusOutlined />
      </Upload>

      <Space style={{ marginBottom: 16 }}>
        Ảnh chính
        <Switch checked={isPrimary} onChange={setIsPrimary} />

        Thứ tự
        <InputNumber
          min={0}
          value={sortOrder}
          onChange={(v) => setSortOrder(v || 0)}
        />

        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          icon={<PlusOutlined />}
        >
          Thêm ảnh
        </Button>
      </Space>

      <Divider />

      {/* ================= LIST IMAGE ================= */}
      {isLoading ? (
        <Spin />
      ) : images.length === 0 ? (
        <p style={{ color: "#888" }}>Chưa có ảnh phụ</p>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {images.map((img: any) => (
            <div
              key={img.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: "1px solid #eee",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Image
                src={img.imageUrl}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />

              <div style={{ flex: 1 }}>
                {/* <div>Sort: {img.sortOrder}</div> */}
              </div>

              {/* ACTIONS */}
              <Space>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleUpdate(img.id, file);
                    return false;
                  }}
                >
                  <Button icon={<EditOutlined />} />
                </Upload>

                <Popconfirm
                  title="Xóa ảnh?"
                  onConfirm={() => handleDelete(img.id)}
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            </div>
          ))}
        </Space>
      )}
    </Modal>
  );
}
