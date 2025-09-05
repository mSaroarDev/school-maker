"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import UserDropdown from "./UserDropdown";

const MobileHeader = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [title, setTitle] = useState(document.title);

  const firstPathSegment = title.split('-')[0];

  useEffect(() => {
    setTitle(document.title);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 py-2 bg-primary flex items-center justify-between px-4 z-50 gap-2">
        <div className="flex items-center gap-2">
          {pathname !== '/dashboard' && (
            <button onClick={() => push('/dashboard')} className="text-white text-lg font-semibold">
              <MdArrowBack size={20} />
            </button>
          )}

          {/* show the title name alltime */}
          <h1 className="text-white text-lg font-semibold flex-shrink-0">{firstPathSegment}</h1>
        </div>

        <UserDropdown />
      </div>
    </>
  );
};

export default MobileHeader;