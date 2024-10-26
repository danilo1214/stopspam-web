import { type InstagramPage } from "@prisma/client";
import { useMemo } from "react";
import {
  type FbPageResult,
  type IgPageResult,
} from "~/server/api/services/instagram";
import { api } from "~/utils/api";

export const useMeta = (): {
  facebookPages: FbPageResult[] | undefined;
  savedPages: InstagramPage[] | undefined;
  instagramPages: IgPageResult[] | undefined;
  savedPagesIds: string[];
} => {
  const { data: facebookPages } =
    api.instagram.getFacebookUnconnectedPages.useQuery(undefined, {
      // 5 mins
      staleTime: 300 * 1000,
    });

  const { data: savedPages } = api.instagram.getSavedPages.useQuery();

  const { data: instagramPages } = api.instagram.getInstagramAccounts.useQuery(
    undefined,
    {},
  );

  const savedPagesIds = useMemo(
    () => savedPages?.map((page) => page.instagramId) ?? [],
    [savedPages],
  );

  return {
    facebookPages,
    savedPages,
    instagramPages,
    savedPagesIds,
  };
};
