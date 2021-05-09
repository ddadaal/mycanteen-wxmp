import { apis } from "@/api/api";
import { Loading } from "annar";
import React, { useCallback, useState } from "react";
import { useAsync } from "react-async";
import { ScrollView } from "remax/wechat";
import { ReviewItem } from "./ReviewItem";

interface Props {
  dishId: number;
}

export const ReviewList: React.FC<Props> = ({ dishId }) => {

  const [page, setPage] = useState(1);

  const promiseFn = useCallback(
    () => apis.getUserReviews({ dishId, page })
      .then((x) => x.results)
    ,[dishId, page]);

  const { data, isLoading } = useAsync({ promiseFn });

  return (
    <ScrollView style={{ height: "100%" }} scrollY>
      {
        isLoading
          ? <Loading />
          : data
            ? (
              data.map((x) => (
                <ReviewItem key={x.id} review={x} />
              ))
            ) : undefined
      }
    </ScrollView>
  );
};
