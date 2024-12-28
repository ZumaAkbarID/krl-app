import { ModeToggle } from "@/components/mode-toggle";
import MenuCard from "@/components/ui/MenuCard";
import Ellipse from "../assets/svg/Ellipse.svg";
import JadwalKereta from "../assets/icon/krl2.png";
import CekHarga from "../assets/icon/price.png";
import Maps from "../assets/icon/map.png";
import BannerHome from "../assets/banner/home.png";
import Background from "@/components/ui/Background";
import { useState } from "react";
import { Station } from "@/dto/Station";
import CariJadwalTimeCard from "@/components/ui/CariJadwalTimeCard";
import TrainScheduleCard from "@/components/ui/TrainScheduleCard";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import TrainRouteCard from "@/components/ui/TrainRouteCard";
import api from "@/services/api";
import { ScheduleStation } from "@/dto/ScheduleStation";

export default function Home() {
  const [step, setStep] = useState("selectStation"); // selectStation, selectRoute, displaySchedule
  const [schedule, setSchedule] = useState<ScheduleStation[]>([]);
  const [uniqueRoute, setUniqueRoute] = useState<ScheduleStation[]>([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClick = (title: string) => {
    alert(`You clicked on ${title}`);
  };

  const handleCariJadwalClick = (st: Station, jadwal: string) => {
    const [timeFrom, timeTo] = jadwal.split("-");

    fetchSchedule(st.sta_id, timeFrom, timeTo);
  };

  const handleOnClickBack = () => {
    if (step == "selectRoute") {
      setStep("selectStation");
    } else if (step == "displaySchedule") {
      setSelectedRoute("");
      setStep("selectRoute");
    }
  };

  const handleOnClickRoute = (route: string) => {
    setSelectedRoute(route);
    setStep("displaySchedule");
  };

  const fetchSchedule = async (
    stationId: string,
    timeFrom: string,
    timeTo: string
  ) => {
    try {
      const response = await api.get(
        `/schedule?stationid=${stationId}&timefrom=${timeFrom}&timeto=${timeTo}`
      );
      if (response.data.status === 200) {
        const scheduleData = response.data.data;

        if (Array.isArray(scheduleData) && scheduleData.length > 0) {
          setSchedule(scheduleData);

          const uniqueRoutes = scheduleData.filter(
            (value, index, self) =>
              self.findIndex((v) => v.route_name === value.route_name) === index
          );

          setSelectedRoute("");
          setUniqueRoute(uniqueRoutes);
          setStep("selectRoute");
        } else {
          setError("Data jadwal tidak ditemukan.");
        }
      } else {
        setError("Gagal mengambil data. Coba lagi nanti.");
      }
    } catch (err) {
      setError("Terjadi kesalahan ketika mengambil data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BG */}
      <Background svg={Ellipse} />

      {/* title sama toggle */}
      <div className="flex justify-between mt-5">
        <Button
          className={`${
            step !== "selectStation" ? "" : "hidden"
          } bg-white text-black dark:bg-black dark:text-white`}
          onClick={handleOnClickBack}
        >
          <ChevronLeftCircle />
        </Button>

        <h1 className="font-bold italic text-white dark:text-white pt-2">
          KRL ACCESS
        </h1>
        <ModeToggle />
      </div>

      {loading && <p className="text-center font-bold">Tunggu sebentar...</p>}
      {error && <p>Error: {error}</p>}

      {/* Card Cari Kereta */}
      {step === "selectStation" ? (
        <CariJadwalTimeCard onClick={handleCariJadwalClick} />
      ) : (
        ""
      )}

      <div className={`my-4 ${step !== "selectStation" ? "hidden" : ""}`}>
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

      <div className={`my-4 ${step !== "selectRoute" ? "hidden" : ""}`}>
        <h1 className="font-bold">Pilih Rute</h1>
        {uniqueRoute.map((route) => (
          <TrainRouteCard
            key={route.route_name}
            route={route.route_name}
            onClick={() => handleOnClickRoute(route.route_name)}
          />
        ))}
      </div>

      <div className={`my-4 ${step !== "displaySchedule" ? "hidden" : ""}`}>
        <h1 className="font-bold text-center mb-1">{selectedRoute}</h1>
        {schedule
          .filter((item) => item.route_name === selectedRoute)
          .map((sch) => (
            <TrainScheduleCard
              key={sch.train_id}
              trainNumber={"#" + sch.train_id}
              departureStation={sch.dest}
              trainName={sch.ka_name}
              color={sch.color}
              departureTime={sch.dest_time.slice(0, 5)}
              route={selectedRoute}
            />
          ))}
      </div>
    </>
  );
}
