import Image from "next/image";
import heroImage from "@/assets/images/hero.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PartnersSection from "./PartnersSection";

const HeroSection = () => {
  return (
    <div className="w-full">
      <main className="h-[600px] bg-controlled flex gap-5">
        <div className="h-full flex flex-col justify-center items-start gap-4">
          <h1 className="text-[40px] font-bold leading-tight">Build Smart School Software – Effortlessly with School Maker</h1>
          <p className="font-light text-lg text-muted-foreground mb-5">
            School Maker makes it easy to build and manage your school software in minutes. From admissions and attendance to teachers, students, and classes — everything is organized in one simple, powerful platform designed to save time and simplify school management.
          </p>

          <Button size="lg" variant={"outline"}>
            Sign up and Get Start <ArrowRight size={18} />
          </Button>
        </div>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="relative w-[520px] h-[407px]">
            <Image
              src={heroImage}
              fill
              alt="Hero Image"
              className="object-cover rounded-lg"
            />
          </div>
        </div>

      </main>
    </div>
  );
};

export default HeroSection;