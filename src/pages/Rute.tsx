import TrainRouteCard from "@/components/ui/TrainRouteCard";
import WaveTitle from "@/components/wave-title";
import { ScheduleStation } from "@/dto/ScheduleStation";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Rute = () => {
  const [uniqueRoute, setUniqueRoute] = useState<ScheduleStation[]>([]);
  const [schedulesData, setSchedulesData] = useState<ScheduleStation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const queryParams = `?station=${searchParams.get(
    "station"
  )}&stationid=${searchParams.get("staId")}&timefrom=${searchParams.get(
    "timeFrom"
  )}&timeto=${searchParams.get("timeTo")}`;

  useEffect(() => {
    if (
      !searchParams.get("staId") ||
      !searchParams.get("timeFrom") ||
      !searchParams.get("timeTo")
    ) {
      navigate("/");
      return;
    }

    fetchSchedule();
  }, [searchParams, navigate]);

  const fetchSchedule = async () => {
    try {
      const response = await api.get(`/schedule${queryParams}`);
      if (response.data.status === 200) {
        const scheduleData = response.data.data;
        if (Array.isArray(scheduleData) && scheduleData.length > 0) {
          setSchedulesData(scheduleData);

          const uniqueRoutes = scheduleData.filter(
            (value, index, self) =>
              self.findIndex((v) => v.route_name === value.route_name) === index
          );

          setUniqueRoute(uniqueRoutes);
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

  const handleSelectRoute = (route: string) => {
    navigate(`/jadwal${queryParams}`, {
      state: {
        schedulesData: schedulesData,
        selectedRoute: route,
        selectedStation: searchParams.get("station"),
      },
    });
  };

  return (
    <>
      <WaveTitle loading={loading} error={error} />

      <div className={`my-4`}>
        <h1 className="font-bold">Pilih Rute</h1>
        {uniqueRoute.map((route) => (
          <TrainRouteCard
            key={route.route_name}
            route={route.route_name}
            onClick={() => handleSelectRoute(route.route_name)}
          />
        ))}
      </div>
    </>
  );
};

export default Rute;
