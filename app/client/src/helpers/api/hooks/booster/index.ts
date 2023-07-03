import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import React from "react";

const QUERY_URLS = {
  userBooster: (userId: string) => `/users/${userId}/user_sets?limit=1000`,
  boosterOpening: (boosterUserId: string) => `/user_sets/${boosterUserId}/open`,
} as const;

const token = localStorage.getItem("token");

const requestUserBooster = (userId: string) =>
  apiRequest({
    url: QUERY_URLS.userBooster(userId),
    method: "GET",
    token: !!token ? token : undefined,
  });

const requestBoosterOpening = (boosterUserId: string) =>
  apiRequest({
    url: QUERY_URLS.boosterOpening(boosterUserId),
    method: "POST",
    token: !!token ? token : undefined,
  });

export const useGetUserBooster = (userId: string) => {
  const userBoosters = useQuery(["userBoosters", userId], () =>
    requestUserBooster(userId)
  );

  return React.useMemo(() => ({ ...userBoosters }), [userBoosters]);
};

export const useOpeningBooster = () => {
  const openingBoosterMutation = useMutation((boosterUserId: string) => requestBoosterOpening(boosterUserId));

  return openingBoosterMutation;
};
