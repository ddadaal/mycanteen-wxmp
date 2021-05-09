import { apis, Review } from "@/api/api";
import { useLoading } from "@/utils/hooks";
import { Loading } from "annar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView } from "remax/wechat";
import { ReviewItem } from "./ReviewItem";

interface Props {
  dishId: number;
}

export const ReviewList: React.FC<Props> = ({ dishId }) => {

  const page = useRef(1);
  const [results, setResults] = useState<Review[]>([]);
  const [loading, setLoading] = useLoading();

  const onMore = async () => {
    setLoading(true);
    page.current++;
    const resp = await apis.getUserReviews({ dishId, page: page.current });
    setResults([...results, ...resp.results]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setResults([]);
    apis.getUserReviews({ dishId, page: page.current })
      .then((r) => {
        setResults([...results, ...r.results]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dishId]);

  return (
    <ScrollView style={{ height: "100%" }}
      scrollY
      onScrollToLower={onMore}
    >
      {
        results.length > 0
          ? (
            results.map((x) => (
              <ReviewItem key={x.id} review={x} />
            ))
          )
          : loading
            ? <Loading />
            : undefined
      }
    </ScrollView>
  );
};
