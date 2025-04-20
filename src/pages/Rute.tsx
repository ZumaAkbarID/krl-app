import { ModeToggle } from "@/components/mode-toggle";
import Ellipse from "../assets/svg/Ellipse.svg";
import Background from "@/components/ui/Background";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import React from "react";
const APP_URL = import.meta.env.VITE_APP_URL;

export default function Rute() {
  const handleOnClickBack = () => {
    window.location.href = APP_URL + "/";
  };

  return (
    <>
      {/* BG */}
      <Background svg={Ellipse} />

      {/* title sama toggle */}
      <div className="flex justify-between mt-5">
        <Button
          className={`bg-white text-black dark:bg-black dark:text-white`}
          onClick={handleOnClickBack}
        >
          <HomeIcon />
        </Button>

        <h1 className="font-bold italic text-white dark:text-white pt-2">
          KRL ACCESS
        </h1>
        <ModeToggle />
      </div>
    </>
  );
}
