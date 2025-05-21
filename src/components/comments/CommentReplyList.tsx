import { type DemoReply } from "@prisma/client";
import CommentReplyCard from "./CommentReplyCard";
import Link from "next/link";

interface CommentReplyListProps {
  commentReplies: DemoReply[];
}

export function CommentReplyList({ commentReplies }: CommentReplyListProps) {
  const grouped = commentReplies.reduce<Record<string, DemoReply[]>>(
    (acc, reply) => {
      if (!acc[reply.mediaId]) acc[reply.mediaId] = [];
      acc[reply.mediaId]?.push(reply);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([mediaId, replies], idx) => (
        <div key={mediaId} className="rounded-xl bg-white p-5 shadow-md">
          <div className="mb-4">
            <a
              className="text-blue text-lg font-semibold underline"
              href={`https://instagram.com/p/${mediaId}`}
            >
              Post {idx + 1}
            </a>

            <img
              src={replies[0]?.mediaUrl}
              alt={replies[0]?.mediaText}
              className="mr-2 h-52 w-52 object-cover"
            />

            <div className="text-sm ">Caption: {replies[0]?.mediaText} </div>
            {/* You could render a post thumbnail here if available */}
          </div>
          <div className="space-y-4">
            {replies.map((reply) => (
              <CommentReplyCard key={reply.id} commentReply={reply} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
