// "use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Typography,
  message,
  Upload,
  Button,
  Space,
  Select,
  Row,
  Col,
  Image,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { hcRequestManager } from "@homecarre-api";

const dateFormat = "DD-MM-YYYY";
const { Text } = Typography;

const ManageRequest = ({ initialData, onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const { createRequest, updateRequest } = hcRequestManager();
  const [loading, setLoading] = useState(false);

  const [imageList, setImageList] = useState(initialData?.images || []);
  const isEditMode = !!initialData?.repair_no;

  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageList((prev) => [...prev, reader.result]);
      onSuccess("ok");
    };
    reader.onerror = onError;
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        images: imageList,
        repair_no: initialData?.repair_no || undefined,
        schedules: values.schedules || [],
      };
      const response = isEditMode
        ? await updateRequest(payload)
        : await createRequest(payload);
      if (response.isSuccess) {
        message.success("Success");
        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        topic: initialData.topic,
        note: initialData.note,
        schedules:
          initialData.schedules && initialData.schedules.length > 0
            ? initialData.schedules
            : [{ date: null, time: undefined }],
      });
      setImageList(initialData.images || []);
    }
  }, [initialData]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        hc_no: initialData.hc_no ?? "",
      }}
      className="bg-white w-full"
    >
      <Row className="w-full" gutter={24}>
        <Col span={12}>
          <div className={initialData.hc_no ? "" : "hidden"}>
            <Form.Item label="Homecarre No. (hc_no)" name="hc_no">
              <Input disabled />
            </Form.Item>
          </div>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: "Topic is required" }]}
          >
            <Input.TextArea rows={3} maxLength={150} showCount />
          </Form.Item>

          <h4 className="text-left">Set Schedules</h4>
          <Form.List name="schedules">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <Row
                    key={key}
                    className="w-full"
                    align="baseline"
                    gutter={12}
                  >
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "date"]}
                        rules={[{ required: true }]}
                      >
                        <DatePicker format={dateFormat} className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={fields.length > 1 ? 11 : 12}>
                      <Form.Item
                        {...restField}
                        name={[name, "time"]}
                        rules={[{ required: true }]}
                      >
                        <Select placeholder="Time" className="w-40">
                          <Select.Option value="morning">
                            9.00-12.00
                          </Select.Option>
                          <Select.Option value="afternoon">
                            13.00-16.00
                          </Select.Option>
                          <Select.Option value="evening">
                            16.00-20.00
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      {fields.length > 1 && (
                        <CloseOutlined onClick={() => remove(name)} />
                      )}
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add Schedule
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Form.Item label="Note" name="note">
            <Input.TextArea
              rows={2}
              maxLength={100}
              showCount
              placeholder="e.g. call me if you're coming"
            />
          </Form.Item>

          <div className="flex gap-4 justify-end">
            <Button htmlType="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <Form.Item label="Upload Images">
            <Upload
              customRequest={handleImageUpload}
              multiple
              showUploadList={false}
              accept=".jpg,.jpeg,.png"
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
          </Form.Item>
          <Text>Selected Image</Text>
          <div className="flex gap-2 mt-2 flex-wrap">
            {imageList.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24">
                <Image
                  src={img}
                  alt={img + idx}
                  className="w-full h-full object-cover rounded"
                />
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() =>
                    setImageList((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="absolute top-0 right-0"
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ManageRequest;
