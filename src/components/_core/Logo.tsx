import { Framer } from "lucide-react";
import Link from "next/link";

type LogoProps = {
  isDark?: boolean;
};

const Logo = ({
  isDark = false,
}: LogoProps) => {
  return (
    <Link href="/" className="w-fit">
      <h1 className="flex items-center gap-2 font-semibold text-xl"><Framer size={20} className={isDark ? "text-white" : ""} />
        <span className={isDark ? "text-white" : ""}>
          Landwind
        </span>
      </h1>
    </Link>
  );
};

export default Logo;