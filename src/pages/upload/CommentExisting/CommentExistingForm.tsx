import { apis, Flavor } from "@/api/api";
import { FlavorTexts } from "@/models/dish";
import { textObjectToArray } from "@/utils/textObjectToArray";
import { useQuery } from "remax";
import { Button, Cell, Form, ImageUpload, Ling, Rate, Textarea } from "annar";
import React, { useRef } from "react";
import { View } from "remax/wechat";

interface FormInfo {
  description: string;
  rate: number;
  flavor?: Flavor;
  waitTime?: number;
  price?: number;
}

const flavorRanges = textObjectToArray(FlavorTexts, "key", "text");

console.log(flavorRanges);

export const CommentExistingForm: React.FC = () => {

  const ling = useRef<any>();

  const { userId, dishId } = useQuery();

  const [form] = Form.useForm();

  const submit = async () => {
    form.validateFields();
    const values: FormInfo = form.getFieldsValue();
    await apis.uploadExistingDish({
      description: values.description,
      id: +(dishId!),
      pictureUrls: [],
      rate: values.rate,
      userId: userId!,
      flavor: values.flavor,
      price: values.price ? values.price * 100 : undefined,
      waitTime: values.waitTime,
    });

    ling.current!.success("提交成功！", undefined, () => {
      wx.navigateBack();
    });
  };

  return (
    <View>
      <Ling ref={ling} />
      <Form
        form={form}
        onFinish={submit}
        initialValues={{ description: "" }}
      >
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
          label="价格"
          name="price"
        >
          <Cell.Input
            placeholder="请输入一份的价格" extra="元"
            type="number"
          />
        </Form.Item>

        <Form.Item
          label="口味"
          name="flavor"
        >
          <Cell.Picker
            placeholder="请选择口味"
            range={flavorRanges}
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
