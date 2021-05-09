import { View } from "@remax/wechat";
import React, { useRef, useState } from "react";
import { useQuery } from "remax";
import styles from "./index.css";
import { Button, Cell, Form, ImageUpload, Ling, Rate, Textarea } from "annar";
import { CanteenRanges, CategoryId, FlavorRanges } from "@/models/dish";
import { apis, Canteen, Flavor } from "@/api/api";
import { CategorySelectorWrapper } from "./CategorySelectorWrapper";
import { CanteenPicker } from "@/components/CanteenPicker";

interface FormInfo {
  canteen: Canteen;
  category: CategoryId;
  description: string;
  photo: string[];
  name?: string;
  price?: number;
  flavor?: Flavor;
  waitTime?: number;
  calorie?: number;
  rate: number;
}

export const NewDishPage: React.FC = () => {

  const query = useQuery();

  console.log(query);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const ling = useRef<any>();

  const submit = async () => {
    form.validateFields();
    const values = form.getFieldsValue() as FormInfo;

    setLoading(true);

    try {

      const photoUrls = await Promise.all(
        values.photo.map((p) =>
          apis.uploadFile(p),
        )
      );

      await apis.uploadNewDish({
        canteen: values.canteen,
        category: values.category,
        description: values.description,
        rate: values.rate,
        flavor: values.flavor,
        name: values.name,
        price: values.price ? values.price * 100 : undefined,
        waitTime: values.waitTime,
        pictureUrls: photoUrls,
        userId: query.userId!,
        calorie: values.calorie,
      });

      ling.current!.success("提交成功！");

    } finally {
      setLoading(false);
    }
  };

  return (
    <View className={styles.content}>
      <Ling ref={ling} />
      <Form
        form={form}
        onFinish={submit}
        initialValues={{ description: "", photo: [], canteen: query.canteen }}
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
          label="食堂"
          name="canteen"
          required
          rules={[{ required: true }]}
        >
          <CanteenPicker placeholder="菜品所在的食堂" />
        </Form.Item>

        <Form.Item
          label="菜名"
          name="name"
        >
          <Cell.Input
            placeholder="菜名，可不填"
          />
        </Form.Item>

        <Form.Item
          label="热量"
          name="calorie"
        >
          <Cell.Input
            placeholder="每100g的热量，可不填"
            extra = "kCol"
            type="number"
          />
        </Form.Item>

        <Form.Item
          label="价格"
          name="price"
        >
          <Cell.Input
            placeholder="一份的价格，可不填" extra="元"
            type="number"
          />
        </Form.Item>

        <Form.Item
          label="口味"
          name="flavor"
        >
          <Cell.Picker
            placeholder="口味，可不填"
            range={FlavorRanges}
          />
        </Form.Item>

        <Form.Item
          label="等待时间"
          name="waitTime"
        >
          <Cell.Input
            type="number"
            placeholder="等待上菜的时间，可不填"
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
            loading={loading}
          >
          提交
          </Button>
        </Form.Item>
      </Form>
    </View>
  );
};

export default NewDishPage;
