import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { DashboardBox } from "~/components/dashboard/DashboardBox";
import { api } from "~/utils/api";

export function Dashboard() {
  const { data: count } = api.commentReplies.getCommentRepliesCount.useQuery();
  return (
    <div className="flex flex-col gap-x-4 gap-y-4 lg:flex-row">
      <DashboardBox
        icon={
          <ChatBubbleBottomCenterIcon className=" size-10 text-primary-800" />
        }
        amount={count ?? 0}
        title="Comments replied to"
      />
    </div>
  );
}
