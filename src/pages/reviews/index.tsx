import { apis, DishSearchResult } from "@/api/api";
import { useLoading } from "@/utils/hooks";
import { useQuery } from "remax";
import { Loading } from "annar";
import React, { useState } from "react";
import { ReviewPage } from "./ReviewPage";
import { useEventChannel } from "@/utils/useEventChannel";

export const ReviewFirstPage: React.FC = () => {

  const query = useQuery();

  const initialDish = JSON.parse(query.dish!) as DishSearchResult;

  const [loading, setLoading] = useLoading();
  const [dish, setDish] = useState(initialDish);

  const eventHandler = useEventChannel();

  const reload = async () => {
    setLoading(true);
    await apis.getDishById(dish.dishId)
      .then((r) => {
        setDish(r);
        eventHandler.emit("updateDish", r);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <ReviewPage dish={dish} reloadDish={reload} />
    );
  }

};

export default ReviewFirstPage;
