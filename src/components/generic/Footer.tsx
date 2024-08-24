import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="bg-black py-4 text-white">
      <div className="container mx-auto text-center">
        <p>Contact Us:</p>
        <p>Email: formassist2024@gmail.com</p>
        <div className="mt-4">
          Follow us on social media:
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