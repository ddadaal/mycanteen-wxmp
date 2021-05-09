import { DishSearchResult } from "@/api/api";
import { DishItem } from "@/components/DishItem";
import { View } from "@remax/wechat";
import React from "react";
import { useQuery } from "remax";
import { CommentExistingForm } from "./CommentExistingForm";
import styles from "./index.css";

export const CommentExisting: React.FC = () => {

  const query = useQuery();

  const dish = JSON.parse(query.dish!) as DishSearchResult;

  return (
    <View className={styles.content}>
      <DishItem dish={dish} />
      <CommentExistingForm dishId={dish.id} userId={query.userId!}  />
    </View>
  );
};

export default CommentExisting;
