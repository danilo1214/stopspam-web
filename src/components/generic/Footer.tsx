import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { GetStartedBanner } from "~/components/accounts/GetStartedBanner";
import { useSession } from "next-auth/react";

export const Footer = () => {
  const { data: sessionData } = useSession();

  return (
    <footer className="bg-textPrimary-900 py-4">
      <div className="container mx-auto text-center">
        {!sessionData && <GetStartedBanner />}

        <h3 className="mt-10 text-lg text-textPrimary-200">Contact Us:</h3>
        <p className="text-textPrimary-300">
          Email: instareplymaster@gmail.com
        </p>
        <div className="mt-4">
          <h3 className=" text-lg text-textPrimary-200">
            Follow us on Social Media:
          </h3>
          <div className="mt-2 flex justify-center">
            <div className="mb-4 flex items-center">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                <FontAwesomeIcon
                  width={20}
                  height={20}
                  icon={faTwitter}
                  className="mr-2 text-blue-500"
                />
              </a>
            </div>

            <div className="mb-4 flex items-center">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                <FontAwesomeIcon
                  width={20}
                  height={20}
                  icon={faInstagram}
                  className="mr-2 text-pink-500"
                />
              </a>
            </div>

            <div className="mb-4 flex items-center">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                <FontAwesomeIcon
                  width={20}
                  height={20}
                  icon={faTiktok}
                  className="mr-2 text-white"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
