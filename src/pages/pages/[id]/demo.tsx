import { useRouter } from "next/router";
import { CommentReplyList } from "~/components/comments/CommentReplyList";
import { api } from "~/utils/api";

export default function Demo() {
  const { query } = useRouter();
  const id = query.id as string;

  const { data: page, isLoading } = api.instagram.getSavedPage.useQuery(id);

  if (isLoading || !page) {
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Demo Replies for {page.username}
      </h1>
      <CommentReplyList commentReplies={page.demoReplies} />
    </div>
  );
}
