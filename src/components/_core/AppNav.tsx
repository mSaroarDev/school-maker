import { CloudSun, Headset, Star } from "lucide-react";
import { Button } from "../ui/button";
import Menus from "./Menus";
import Logo from "./Logo";


const AppNav = () => {

  return (
    <>
      <div className="hidden md:block w-full">
        <main>
          <div className="flex items-center justify-between">
            <Logo />
            <div>
              <Menus />
            </div>
            <div className="flex items-center gap-2">
              <Button className="rounded-full" size="icon" variant="outline"><CloudSun /></Button>
              <Button variant="outline"><Star size={18} /> Feedback</Button>
              <Button>Get Started </Button>
            </div>
          </div>
        </main>
      </div>


      <div className="md:hidden bg-primary px-3 py-2">
        <div className="flex items-center justify-between">
          <Logo isDark />
          <Headset size={20} className="text-white" />
        </div>
      </div>
    </>
  );
};

export default AppNav;