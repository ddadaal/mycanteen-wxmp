import { View, Image } from "@remax/wechat";
import React from "react";
import styles from "./index.css";

interface Props {
  imageLink: string;
  text: string;
}

export const CategoryButton: React.FC<Props> = ({
  text,
  imageLink,
}) => {
  return (
    <View className={styles.container}>
      <View className={styles.circle}>
        <Image className={styles.image} src={imageLink} />
      </View>
      <View className={styles.text}>
        {text}
      </View>
    </View>
  );
};
