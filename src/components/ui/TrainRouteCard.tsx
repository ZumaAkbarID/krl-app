import trainIcon from "@/assets/icon/krl.png";
import { Button } from "./button";

export default function TrainRouteCard({
  route,
  onClick,
}: {
  route: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between my-2 p-4 dark:bg-black bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        {/* Train Icon with Train Number below */}
        <div className="text-center">
          <img
            src={trainIcon} // Replace with your train icon URL
            alt="KRL Icon"
            className="w-10 h-10 mx-auto object-contain"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
        {/* Train Details */}
        <div>
          <p className="text-xs md:text-lg font-semibold text-gray-600 dark:text-white">
            {route}
          </p>
        </div>
      </div>
      {/* Departure Time and Station Count */}
      <div className="text-right">
        <Button className="text-xs md:text-sm" onClick={onClick}>
          Lihat
          <br />
          Jadwal
        </Button>
      </div>
    </div>
  );
}
