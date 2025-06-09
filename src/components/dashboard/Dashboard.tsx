import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { DashboardBox } from "~/components/dashboard/DashboardBox";
import { cards } from "~/const";
import { api } from "~/utils/api";

export function Dashboard() {
  const { data: count } = api.commentReplies.getCommentRepliesCount.useQuery();
  const { data: commentsCount } =
    api.subscriptions.getMonthlyReplies.useQuery();

  const { data: currentSubscription } = api.subscriptions.getCurrent.useQuery(
    {},
  );
  const matchingCard = cards.find(
    (c) => c.productId === currentSubscription?.productId,
  );

  return (
    <div className="flex flex-col gap-x-4 gap-y-4 lg:flex-row">
      <DashboardBox
        icon={
          <ChatBubbleBottomCenterIcon className=" size-10 text-primary-800" />
        }
        amount={count ?? 0}
        title="Comments replied to"
      />
      <DashboardBox
        icon={<CalendarDaysIcon className=" size-10 text-primary-800" />}
        amount={commentsCount ?? 0}
        amountCap={matchingCard?.replies}
        title="Replies this month"
      />
    </div>
  );
}
