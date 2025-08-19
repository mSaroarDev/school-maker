import airbnb from "@/assets/images/airbnb.svg";
import google from "@/assets/images/google.svg";
import microsoft from "@/assets/images/microsoft.svg";
import spotify from "@/assets/images/spotify.svg";
import mailchimp from "@/assets/images/mailchimp.svg";
import Image from "next/image";

const PartnersSection = () => {
  return (
    <>
      <div className="flex items-center gap-10 justify-between">
        <div className="w-36 h-14 relative">
          <Image
            src={airbnb}
            alt="Airbnb Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-36 h-14 relative">
          <Image
            src={google}
            alt="Google Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-36 h-14 relative">
          <Image
            src={microsoft}
            alt="Microsoft Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-36 h-14 relative">
          <Image
            src={spotify}
            alt="Spotify Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="w-36 h-14 relative">
          <Image
            src={mailchimp}
            alt="Mailchimp Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default PartnersSection;