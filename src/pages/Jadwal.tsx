import TrainScheduleCard from "@/components/ui/TrainScheduleCard";
import WaveTitle from "@/components/wave-title";
import { ScheduleStation } from "@/dto/ScheduleStation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Jadwal = () => {
  const location = useLocation();
  const state = location.state as
    | {
        schedulesData: ScheduleStation[];
        selectedRoute: string;
        selectedStation: string;
      }
    | undefined;
  const [loading, _] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }

    if (state?.schedulesData.length === 0) {
      setError("Data jadwal tidak ditemukan.");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { schedulesData, selectedRoute, selectedStation } = state;

  return (
    <>
      <WaveTitle loading={loading} error={error} />

      <div className={`my-4`}>
        <h1 className="font-bold text-center mb-1">RUTE {selectedRoute}</h1>
        {schedulesData
          .filter((item) => item.route_name === selectedRoute)
          .map((sch) => (
            <TrainScheduleCard
              key={sch.train_id}
              trainNumber={"#" + sch.train_id}
              departureStation={sch.dest}
              trainName={sch.ka_name}
              color={sch.color}
              departureTime={sch.time_est.slice(0, 5)}
              stationFrom={selectedStation}
              route={selectedRoute}
            />
          ))}

        <p className="text-xs text-muted-foreground mt-5 text-center">
          Klik jadwal untuk melihat detail rute
        </p>
      </div>
    </>
  );
};

export default Jadwal;
