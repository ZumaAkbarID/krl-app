import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/ui/MenuCard";
import Ellipse from "../assets/svg/Ellipse.svg";
import JadwalKereta from "../assets/icon/krl2.png";
import CekHarga from "../assets/icon/price.png";
import Maps from "../assets/icon/map.png";
import BannerHome from "../assets/banner/home.png";

export default function Home() {
  const handleClick = (title: string) => {
    alert(`You clicked on ${title}`);
  };

  return (
    <>
      {/* BG */}
      <img
        src={Ellipse}
        alt=""
        style={{
          position: "absolute",
          zIndex: -10,
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "auto",
        }}
      />
      {/* title sama toggle */}
      <div className="flex justify-between mt-5">
        <h1 className="font-bold italic">KRL ACCESS</h1>
        <ModeToggle />
      </div>
      {/* Card Cari Kereta */}
      <div className="my-5">
        <Card>
          <CardContent className="py-6">
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="StasiunAwal">Stasiun Awal</Label>
              <Input type="text" id="StasiunAwal" placeholder="" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="StasiunTujuan">Stasiun Tujuan</Label>
              <Input type="text" id="StasiunTujuan" placeholder="" />
            </div>
          </CardContent>
          <CardFooter className="text-center">
            <Button className="w-full">Cari Kereta</Button>
          </CardFooter>
        </Card>
      </div>
      {/* Menu */}
      {/* <div className="flex overflow-x-auto space-x-2 w-full justify-center"> */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 p-4 w-full place-items-center">
        {/* Menu item 1 */}
        <div>
          <MenuCard
            image={JadwalKereta}
            title="Jadwal KRL"
            onClick={() => handleClick("Jadwal Kereta")}
          />
        </div>
        {/* Menu item 2 */}
        <div>
          <MenuCard
            image={CekHarga}
            title="Harga Tiket"
            onClick={() => handleClick("Harga Tiket")}
          />
        </div>
        {/* Menu item 3 */}
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
    </>
  );
}
