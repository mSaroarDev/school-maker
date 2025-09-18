"use client";
import logoImage from "@/assets/images/logoipsum.png";
import SidebarLinks from "@/constants/SidebarLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgUserlane } from "react-icons/cg";
import { FaRegCircleDot } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  width: number;
  toggleSidebar: () => void;
}

export type ILink = {
  label: string;
  link: string;
  count?: number;
  icon: React.ComponentType<{ size?: number }>;
}

const Sidebar = ({ width = 250, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();

  const { isAdmin } = useAuth();
  // const [loggedInAs, setLoggedInAs] = useState("");

  // useEffect(() => {
  //   const loggedInAs = localStorage.getItem("loggedInAs");
  //   setLoggedInAs(loggedInAs || "");
  // }, []);

  return (
    <>
      <div
        style={{ width: `${width}px` }}
        className="hidden fixed top-0 left-0 bottom-0 bg-white dark:bg-dark-card transition-all duration-300 ease-in-out overflow-hidden h-full md:flex flex-col">
        <div>
          <div className="w-full flex items-center justify-between p-4">
            {width === 250 ? (
              <h4 className="text-lg flex items-center gap-2 text-primary">
                <Image 
                  src={logoImage}
                  alt="Logo"
                  height={24}
                  width={130}
                />
              </h4>
            ) : (
              <h4 className="text-2xl"><CgUserlane size={20} className="text-primary" /></h4>
            )}
            <FaRegCircleDot onClick={toggleSidebar} className="cursor-pointer text-primary" size={22} />
          </div>

          <div className="mt-5 overflow-y-scroll h-[calc(100vh-80px)]">
            {SidebarLinks({ isAdmin }).map((section, index) => (
              <div key={index} className="mb-5">
                <h5 className={`mx-2 ms-8 text-sm transition-all duration-300 ease-in-out ${width === 250 ? "text-gray-700 dark:text-white" : "text-slate-50 dark:text-[#1A202C]"}`}>{section.heading}</h5>
                <div className="mt-2 px-5">
                  {section.links.map((link: ILink, linkIndex) => (
                    <Link
                      href={link.link}
                      key={linkIndex}
                      className={`flex items-center justify-between px-5 py-2.5 cursor-pointer transition-all duration-150 rounded-lg 
                        ${pathname?.startsWith(link.link) ? "text-black bg-primary-light dark:bg-primary/15" : ""} 
                        ${!pathname?.startsWith(link.link) && "hover:bg-primary/5 hover:text-primary"}`}

                    >
                      <div className="flex items-center gap-3">
                        <link.icon size={20} />
                        {width === 250 && <span>{link.label}</span>}
                      </div>
                      {width === 250 && (
                        <div>
                          {link?.count && (
                            <span className="px-1 h-4 bg-primary text-white grid place-items-center text-xs rounded-full">
                              {link?.count}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default Sidebar;