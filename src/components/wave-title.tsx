import { ModeToggle } from "@/components/mode-toggle";
import Ellipse from "../assets/svg/Ellipse.svg";
import Background from "./ui/Background";
import { Button } from "./ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { useNavigate } from "react-router";

const WaveTitle = (props: { loading: boolean; error: string | null }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {/* BG */}
      <Background svg={Ellipse} />

      {/* title sama toggle */}
      <div className="flex justify-between mt-5">
        <Button
          className={`bg-white text-black dark:bg-black dark:text-white`}
          onClick={goBack}
        >
          <ChevronLeftCircle />
        </Button>

        <h1 className="font-bold italic text-white dark:text-white pt-2">
          KRL ACCESS
        </h1>
        <ModeToggle />
      </div>

      {props.loading && (
        <p className="text-center font-bold">Tunggu sebentar...</p>
      )}
      {props.error && <p className="text-center">Error: {props.error}</p>}
    </>
  );
};

export default WaveTitle;
