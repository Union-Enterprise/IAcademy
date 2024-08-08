import {
  faApple,
  faGoogle,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialOptions({ icon = faApple, brandName = "Apple" }) {
  return (
    <div className=" w-full flex items-center justify-center h-[50px] gap-5 rounded-md border-2 border-whiteBorder hover:bg-mainBlue duration-100 group bg-opacity-50 cursor-pointer">
      <FontAwesomeIcon
        icon={icon}
        className="w-[25px] h-[25px] group-hover:text-white"
      />
      <p className="font-semi text-whiteText group-hover:text-white">
        Entrar com {brandName}
      </p>
    </div>
  );
}
