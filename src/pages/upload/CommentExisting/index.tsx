import { DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { View } from "@remax/wechat";
import { Form } from "annar";
import React from "react";
import { useQuery } from "remax";
import { CommentExistingForm } from "./CommentExistingForm";
import styles from "./index.css";

export const CommentExisting: React.FC = () => {

  const query = useQuery();

  const dish = JSON.parse(query.dish!);

  return (
    <View className={styles.content}>
      <DishItem dish={dish} />
      <CommentExistingForm />
    </View>
  );
};

export default CommentExisting;
