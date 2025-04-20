import { useState } from "react";
import trainIcon from "@/assets/icon/krl2.png";
import { Badge } from "./badge";
import stationIcon from "@/assets/svg/station.svg";
import transitIcon from "@/assets/icon/train-station.png";
import trainTransitIcon from "@/assets/svg/train.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RouteTrain } from "@/dto/RouteTrain";
import api from "@/services/api";

export default function TrainScheduleCard({
  trainNumber,
  trainName,
  color,
  departureStation,
  departureTime,
  route,
  stationFrom,
}: // stationCount,
{
  trainNumber: string;
  trainName: string;
  color: string;
  departureStation: string;
  departureTime: string;
  route: string;
  stationFrom: string;
  // stationCount: string;
}) {
  const [routeTrain, setRouteTrain] = useState<RouteTrain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoute = async (trainId: string) => {
    try {
      const response = await api.get(`/schedule-train?trainid=${trainId}`);
      if (response.data.status === 200) {
        const routeTrain = response.data.data;
        if (Array.isArray(routeTrain) && routeTrain.length > 0) {
          setRouteTrain(routeTrain);
        } else {
          setError("Data rute tidak ditemukan.");
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

  const handleOpenDialog = (trainId: string) => {
    fetchRoute(trainId.slice(1));
  };

  return (
    <div className="flex mb-2 items-center justify-between p-4 dark:bg-black bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full">
      <Dialog>
        <DialogTrigger
          className="w-full"
          onClick={() => handleOpenDialog(trainNumber)}
        >
          <div className="flex items-center space-x-4 w-full">
            {/* Train Icon with Train Number below */}
            <div className="text-center flex-shrink-0">
              <img
                src={trainIcon} // Replace with your train icon URL
                alt="KRL Icon"
                className="w-10 h-10 mx-auto object-contain"
                style={{ aspectRatio: "1 / 1" }}
              />
              <p className="text-xs font-semibold text-gray-800 dark:text-white mt-2">
                {trainNumber}
              </p>
            </div>
            {/* Train Details */}
            <div className="flex-1">
              <Badge
                className="rounded-sm w-[90%]"
                style={{ backgroundColor: color }}
              >
                {trainName}
              </Badge>
              <p className="text-xs text-gray-600 mt-2 dark:text-white">
                <span className="font-bold">{stationFrom}</span> -{" "}
                <span className="font-bold">{departureStation}</span>
              </p>
            </div>
            {/* Departure Time and Station Count */}
            <div className="text-right flex-shrink-0 lg:text-right">
              <p className="font-bold text-red-500">{departureTime}</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-svh overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rute Kereta {trainNumber}</DialogTitle>
            <div className="text-center">
              <Badge style={{ backgroundColor: color }}>
                Jalur KRL {route}
              </Badge>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mb-4">
            {/* Content Start */}

            {loading && (
              <p className="text-center font-bold">Tunggu sebentar...</p>
            )}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {routeTrain.map((rt) => (
                  <li
                    className="mb-10 ms-6 last:mb-0"
                    key={rt.train_id.toString() + rt.station_id.toString()}
                  >
                    <span
                      className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900"
                      style={{ backgroundColor: rt.color }}
                    >
                      <img
                        src={stationIcon}
                        className="object-contain w-6 h-6"
                        alt=""
                      />
                    </span>
                    <h3 className="font-medium leading-tight mb-1">
                      [{rt.time_est.slice(0, 5)}] - {rt.station_name}
                    </h3>
                    <p className="text-sm">
                      <div className="flex gap-2">
                        <div
                          className={`rounded-sm w-fit px-2 center ${
                            !rt.transit_station ? "hidden" : ""
                          }`}
                          style={{
                            backgroundColor: "#E30A16",
                          }}
                        >
                          <img
                            src={transitIcon}
                            className="w-8 h-8 bg-transparent rounded-full p-1 inline"
                            alt=""
                          />
                          <span className="font-semibold text-white">
                            Transit
                          </span>
                        </div>
                        {rt.transit.length > 0
                          ? rt.transit.map((transitColor) => (
                              <img
                                src={trainTransitIcon}
                                className="w-8 h-8 rounded-full p-1 inline"
                                style={{
                                  backgroundColor: transitColor,
                                }}
                                alt=""
                              />
                            ))
                          : ""}
                      </div>
                    </p>
                  </li>
                ))}
              </ol>
            )}

            {/* Content End */}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Tutup
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
