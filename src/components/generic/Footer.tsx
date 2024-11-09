import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { SignInButton } from "~/components/navigation/SignInButton";

export const Footer = () => {
  return (
    <footer className="bg-textPrimary-900 py-4">
      <div className="container mx-auto text-center">
        <div className="mb-24 mt-4 flex flex-col items-center gap-y-2">
          <Image
            loading="lazy"
            alt="logo"
            width={40}
            height={40}
            src="/logo.png"
          />
          <h1 className="text-3xl font-semibold text-textPrimary-100">
            Never Miss a Comment, Never Lose a Customer
          </h1>
          <p className="text-lg text-textPrimary-300">
            Boost your social media brand with AI using Reply Master.
          </p>

          <SignInButton />
        </div>

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
