import { Select } from "@headlessui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/generic/Button";
import CustomSelect from "~/components/generic/Select";
import { Slider } from "~/components/generic/Slider";
import { Steps } from "~/components/generic/Steps";
import { api } from "~/utils/api";

const vibes = [
  "Non-chalant and Funny",
  "Casual",
  "Friendly",
  "Neutral",
  "Formal",
  "Professional",
];

const options: { value: string; label: string }[] = [
  { value: "increase-sales", label: "To increase my sales" },
  { value: "boost-engagement", label: "To boost my page engagement" },
  { value: "idk", label: "I don't know" },
];

export default function Page() {
  const utils = api.useUtils();
  const { query } = useRouter();
  const id = query.id as string;
  const {
    data: page,
    isLoading,
    isError,
  } = api.instagram.getSavedPage.useQuery(id);
  const [text, setText] = useState(page?.userDescription ?? "");
  const [vibe, setVibe] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(
    page?.goal ?? null,
  );

  const { mutate: updatePage } = api.instagram.updatePage.useMutation();

  useEffect(() => {
    if (page?.userDescription) {
      setText(page.userDescription);
    }
  }, [page?.userDescription]);

  useEffect(() => {
    if (page?.goal) {
      setSelectedGoal(page.goal);
    }
  }, [page?.goal]);

  useEffect(() => {
    if (page?.vibe) {
      setVibe(vibes.indexOf(page?.vibe));
    }
  }, [page?.vibe]);

  const invalidatePageCache = () => {
    utils.instagram.getSavedPage.invalidate();
  };

  const handleOptionChange = (option: string) => {
    setSelectedGoal(option);
    updatePage(
      { id, goal: option },
      {
        onSuccess: () => {
          toast("Successfully updated goal");
          invalidatePageCache();
        },
      },
    );
  };

  const onChangeVibe = (v: number) => {
    setVibe(v);
    updatePage(
      { id, vibe: vibes[v] },
      {
        onSuccess: () => {
          toast("Successfully updated vibe");
          invalidatePageCache();
        },
      },
    );
  };

  const steps = [
    {
      title: "Describe your business",
      content: (
        <div>
          <div className=" my-10 text-sm">
            Give us a brief description of your business so that our AI will be
            most efficient in answering questions. What is your page about? What
            services do you provide? What are the prices for respective
            services? What are some of your business policies?
          </div>
          <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
            <div className="rounded-t-lg bg-white p-2 dark:bg-gray-800">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                rows={14}
                id="comment"
                className="focus:ring-none w-full border-0 bg-white px-2 pt-1 text-sm text-gray-900 focus:outline-1 focus:outline-indigo-300"
                placeholder="Enter a prompt..."
                required
              />
            </div>
          </div>
          <Button
            onClick={async () => {
              updatePage(
                { id, description: text },
                {
                  onSuccess: () => {
                    toast("Successfully updated description");
                    invalidatePageCache();
                  },
                },
              );
            }}
            label="Update"
            className="focus:shadow-outline flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-primary-500 focus:outline-none"
          ></Button>
        </div>
      ),
    },
    {
      title: "Set the tone for comments",
      content: (
        <Slider
          label="Set the tone of your replies"
          value={vibe}
          onChange={onChangeVibe}
          labels={vibes}
        />
      ),
    },
    {
      title: "Goal",
      content: (
        <div className="p-4">
          <div className="mb-2">
            <div className=" text-textPrimary-800">
              What's your goal with our product?
            </div>
          </div>
          <CustomSelect
            onOptionChange={handleOptionChange}
            options={options}
            value={selectedGoal ?? undefined}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <h1 className="text-lg font-semibold text-textPrimary-900">Loading...</h1>
    );
  }

  if (isError || !page) {
    return (
      <h1 className="text-lg font-semibold text-textPrimary-900">Not found</h1>
    );
  }

  const currentStep = !page.userDescription ? 0 : page.vibe ? 2 : 1;

  return (
    <main>
      <div className="pl-4">
        <img
          referrerPolicy="no-referrer"
          src={page.profilePictureUrl}
          alt={page.username}
          className="h-12 w-12 rounded-full object-cover"
        />
        <h1 className="text-lg font-semibold text-textPrimary-900">
          {page.username}
        </h1>
      </div>

      <div className="mt-14 flex min-h-screen items-center justify-center px-4">
        <Steps steps={steps} currentStep={currentStep} />
      </div>
    </main>
  );
}
