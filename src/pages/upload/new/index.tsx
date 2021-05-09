import { View } from "@remax/wechat";
import React, { useRef } from "react";
import { useQuery } from "remax";
import styles from "./index.css";
import { Button, Cell, Form, ImageUpload, Ling, Rate, Textarea } from "annar";
import { FlavorRanges } from "@/models/dish";
import { apis } from "@/api/api";
import { CategorySelectorWrapper } from "./CategorySelectorWrapper";

export const NewDishPage: React.FC = () => {

  const query = useQuery();

  const [form] = Form.useForm();

  const ling = useRef<any>();

  const submit = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    await apis.uploadNewDish({
      ...values,
      userId: query.userId!,
    });
    ling.current!.success("提交成功！");
  };

  return (
    <View className={styles.content}>
      <Ling ref={ling} />
      <Form
        form={form}
        onFinish={submit}
        initialValues={{ description: "" }}
      >

        <Form.Item name="category" rules={[{ required: true }]} required>
          <CategorySelectorWrapper />
        </Form.Item>

        <Form.Item noStyle name="description">
          <Textarea placeholder="请输入评价" />
        </Form.Item>

        <Form.Item
          label="照片"
          name="photo"
          valuePropName="files"
        >
          <ImageUpload />
        </Form.Item>

        <Form.Item
          label="菜名"
          name="name"
        >
          <Cell.Input
            placeholder="可不填"
          />
        </Form.Item>

        <Form.Item
          label="价格"
          name="price"
        >
          <Cell.Input
            placeholder="一份的价格，课不填" extra="元"
            type="number"
          />
        </Form.Item>

        <Form.Item
          label="口味"
          name="flavor"
        >
          <Cell.Picker
            placeholder="请选择口味"
            range={FlavorRanges}
          />
        </Form.Item>

        <Form.Item
          label="等待时间"
          name="waitTime"
        >
          <Cell.Input
            type="number"
            placeholder="等待时间"
          />
        </Form.Item>

        <Form.Item
          label="评分"
          name="rate"
          rules={[{ required: true }]}
          required
        >
          <Rate />
        </Form.Item>

        <Form.Item noStyle style={{ marginTop: 10, padding: "0 20px" }}>
          <Button
            type="primary"
            size="large"
            shape="square"
            block
            nativeType="submit"
          >
          提交
          </Button>
        </Form.Item>
      </Form>
    </View>
  );
};

export default NewDishPage;
