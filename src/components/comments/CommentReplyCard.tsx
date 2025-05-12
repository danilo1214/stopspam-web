import { type DemoReply } from "@prisma/client";

interface CommentReplyCardProps {
  commentReply: DemoReply;
}

export default function CommentReplyCard({
  commentReply,
}: CommentReplyCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm text-gray-600">
        <span className="font-semibold">@{commentReply.handle}</span> commented:
      </p>
      <p className="text-md mb-2">“{commentReply.commentText}”</p>
      <p className="text-sm font-medium text-blue-700">
        🤖 AI Reply: “{commentReply.replyText}”
      </p>
    </div>
  );
}
