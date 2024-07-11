import { Transition } from "@headlessui/react";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Button from "~/components/generic/Button";
import { Modal } from "~/components/generic/Modal";

interface ChannelItemProps {
  name: string;
  platform: string;
  locked: boolean;
}

const ChannelItem: React.FC<ChannelItemProps> = ({
  name,
  platform,
  locked,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={classNames(
        "relative mb-2 flex items-center justify-between rounded-lg bg-gray-100 p-4",
        locked && "bg-gray-200",
      )}
    >
      <div className="flex items-center space-x-3">
        <Image
          src={`/${platform.toLowerCase()}.png`}
          alt={platform}
          width={50}
          height={50}
        />
        <span>{name}</span>
      </div>
      <div className="relative" ref={menuRef}>
        <button onClick={toggleMenu} className="flex items-center ">
          <Cog6ToothIcon className="size-5 font-light text-gray-700 hover:text-gray-900 focus:outline-none" />
        </button>
        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-[-50px] z-10 mt-2 w-48 rounded border bg-white shadow-lg">
            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
              Unlock Channel
            </button>
            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
              Remove Channel
            </button>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export const AccountList = ({ channels }: { channels: ChannelItemProps[] }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between align-middle">
          <div className="mb-2 text-xl font-bold">Accounts</div>
          <Modal
            open={open}
            onConfirm={() => {}}
            onClose={() => setOpen(false)}
          >
            {" "}
            Hiii
          </Modal>
          <Button
            icon={
              <PlusIcon className="size-5 font-light text-textPrimary-100" />
            }
            label="Add"
            className="mb-4 max-w-[100px] rounded-lg bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700"
            onClick={() => setOpen(true)}
          ></Button>
        </div>
        <div className="space-y-4">
          {channels.map((channel, index) => (
            <ChannelItem
              key={index}
              name={channel.name}
              platform={channel.platform}
              locked={channel.locked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
