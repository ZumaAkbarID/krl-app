import { ModeToggle } from "@/components/mode-toggle";
import MenuCard from "@/components/ui/MenuCard";
import Ellipse from "../assets/svg/Ellipse.svg";
import JadwalKereta from "../assets/icon/krl2.png";
import CekHarga from "../assets/icon/price.png";
import Maps from "../assets/icon/map.png";
import BannerHome from "../assets/banner/home.png";
import Background from "@/components/ui/Background";
import CariJadwalCard from "@/components/ui/CariJadwalCard";
import { useState } from "react";
import { Station } from "@/dto/Station";
import CariJadwalTimeCard from "@/components/ui/CariJadwalTimeCard";

export default function Home() {
  const handleClick = (title: string) => {
    alert(`You clicked on ${title}`);
  };

  const handleCariJadwalClick = (first: Station, jadwal: string) => {
    const combinedData = `From: ${first.sta_id}, To: ${jadwal}`;
    // setData(combinedData);
    alert(`Data diterima di Home:\n${combinedData}`);
  };

  return (
    <>
      {/* BG */}
      <Background svg={Ellipse} />

      {/* title sama toggle */}
      <div className="flex justify-between mt-5">
        <h1 className="font-bold italic text-white dark:text-white">
          KRL ACCESS
        </h1>
        <ModeToggle />
      </div>
      {/* Card Cari Kereta */}
      <CariJadwalTimeCard onClick={handleCariJadwalClick} />

      <div className="hidden p-4">
        {/* Menu */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full place-items-center">
          <div>
            <MenuCard
              image={JadwalKereta}
              title="Jadwal KRL"
              onClick={() => handleClick("Jadwal Kereta")}
            />
          </div>
          <div>
            <MenuCard
              image={CekHarga}
              title="Harga Tiket"
              onClick={() => handleClick("Harga Tiket")}
            />
          </div>
          <div>
            <MenuCard
              image={Maps}
              title="Rute KRL"
              onClick={() => handleClick("Rute Kereta")}
            />
          </div>
        </div>
        {/* Banner */}
        <div className="flex justify-center mt-5">
          <img src={BannerHome} className="sm:w-full md:w-1/3" alt="" />
        </div>
      </div>

      <div className="p-4"></div>
    </>
  );
}
