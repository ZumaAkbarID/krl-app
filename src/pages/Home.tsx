import MenuCard from "@/components/ui/MenuCard";
import JadwalKereta from "../assets/icon/krl2.png";
import CekHarga from "../assets/icon/price.png";
import Maps from "../assets/icon/map.png";
import BannerHome from "../assets/banner/home.png";
import { useEffect } from "react";
import { Station } from "@/dto/Station";
import CariJadwalTimeCard from "@/components/ui/CariJadwalTimeCard";
import { Slide, ToastContainer, toast } from "react-toastify";
import WaveTitle from "@/components/wave-title";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const handleCariJadwalClick = (st: Station, jadwal: string) => {
    const [timeFrom, timeTo] = jadwal.split("-");

    navigate(
      `/jalur?station=${st.sta_name}&staId=${st.sta_id}&timeFrom=${timeFrom}&timeTo=${timeTo}`
    );
  };

  useEffect(() => {
    toast.info("🦄 Unofficial-App! Click to contact me", {
      onClick() {
        window.location.href = "https://github.com/ZumaAkbarID";
      },
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />

      <WaveTitle loading={false} error={null} />

      {/* Card Cari Kereta */}
      <CariJadwalTimeCard onClick={handleCariJadwalClick} />

      <div className={`my-4`}>
        {/* Menu */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full place-items-center">
          <div>
            <MenuCard
              image={JadwalKereta}
              title="Jadwal KRL"
              onClick={() => alert("Coming Soon")}
            />
          </div>
          <div>
            <MenuCard
              image={CekHarga}
              title="Harga Tiket"
              onClick={() => alert("Coming Soon")}
            />
          </div>
          <div>
            <MenuCard
              image={Maps}
              title="Rute KRL"
              onClick={() => alert("Coming Soon")}
            />
          </div>
        </div>

        {/* Banner */}
        <div className="flex justify-center mt-5">
          <img src={BannerHome} className="sm:w-full md:w-1/3" alt="" />
        </div>
      </div>
    </>
  );
}
