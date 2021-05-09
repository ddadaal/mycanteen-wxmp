import { apis, Flavor } from "@/api/api";
import { FlavorRanges } from "@/models/dish";
import { Button, Cell, Form, ImageUpload, Ling, Rate, Textarea } from "annar";
import React, { useRef, useState } from "react";
import { View } from "remax/wechat";

interface FormInfo {
  description: string;
  rate: number;
  flavor?: Flavor;
  waitTime?: number;
  price?: number;
  photo: string[];
}

interface Props {
  userId: string;
  dishId: number;
}

export const CommentExistingForm: React.FC<Props> = ({ userId, dishId }) => {

  const ling = useRef<any>();

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const submit = async () => {
    form.validateFields();
    setLoading(true);

    const values: FormInfo = form.getFieldsValue();

    try {
      // upload the photo first
      const photoUrls = await Promise.all(
        values.photo.map((p) =>
          apis.uploadFile(p),
        )
      );

      await apis.uploadExistingDish({
        description: values.description,
        id: +(dishId!),
        pictureUrls: photoUrls,
        rate: values.rate,
        userId: userId!,
        flavor: values.flavor,
        price: values.price ? values.price * 100 : undefined,
        waitTime: values.waitTime,
      });

      ling.current!.success("提交成功！", undefined, () => {
        wx.navigateBack();
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Ling ref={ling} />
      <Form
        form={form}
        onFinish={submit}
        initialValues={{ description: "", photo: []}}
      >
        <Form.Item noStyle name="description">
          <Textarea placeholder="评价" />
        </Form.Item>

        <Form.Item
          label="照片"
          name="photo"
          valuePropName="files"
        >
          <ImageUpload />
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
