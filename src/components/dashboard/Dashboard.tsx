import {
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DashboardBox } from "~/components/dashboard/DashboardBox";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-x-4 gap-y-4 lg:flex-row">
      <DashboardBox
        icon={<XMarkIcon className=" size-10 text-secondary-800" />}
        amount={6}
        title="Comments removed"
      />

      <DashboardBox
        icon={
          <ChatBubbleBottomCenterIcon className=" size-10 text-primary-800" />
        }
        amount={6}
        title="Comments replied to"
      />
    </div>
  );
}
