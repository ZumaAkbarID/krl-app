import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Station } from "@/dto/Station";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CariJadwalTimeCard({
  onClick,
}: {
  onClick: (first: Station, dest: string) => void;
}) {
  const [openFirst, setOpenFirst] = useState(false);
  const [openAturSendiri, setOpenAturSendiri] = useState(false);
  const [valueFirst, setValueFirst] = useState("");
  const [valueJadwal, setValueJadwal] = useState("");

  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const currTime = new Date();
  const next1Hour = new Date(currTime.getTime() + 60 * 60 * 1000);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const jadwals = [
    {
      value: `${currTime.toLocaleTimeString(
        [],
        timeOptions
      )}-${next1Hour.toLocaleTimeString([], timeOptions)}`,
      label: `1 Jam Kedepan (${currTime.toLocaleTimeString(
        [],
        timeOptions
      )}-${next1Hour.toLocaleTimeString([], timeOptions)})`,
    },
    {
      value: "00:00-23:59",
      label: "1 Hari ini (00:00-23:59)",
    },
    {
      value: "aturSendiri",
      label: "Atur Sendiri",
    },
  ];

  const handleOnChangeJadwal = (value: string) => {
    if (value === "aturSendiri") {
      setValueJadwal("");
      setOpenAturSendiri(true);
    } else {
      setValueJadwal(value);
      setOpenAturSendiri(false);
    }
  };

  const handleOnChangeTime = (
    target: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (target == "start") {
      setStartTime(event.target.value);
      setValueJadwal(event.target.value + "-" + endTime);
    } else if (target == "end") {
      setEndTime(event.target.value);
      setValueJadwal(startTime + "-" + event.target.value);
    }
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await api.get("/krl-station");
        if (response.data.status === 200) {
          setStations(response.data.data);
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

    fetchStations();
  }, []);

  return (
    <div className="my-5">
      <Card>
        <CardContent className="py-6">
          <div className="grid w-full items-center gap-1.5 mb-5">
            <Label htmlFor="StasiunAwal">Stasiun</Label>
            {loading && <p>Tunggu sebentar...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <Popover open={openFirst} onOpenChange={setOpenFirst}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    // aria-expanded={open}
                    className="justify-between w-full"
                  >
                    {valueFirst ? (
                      valueFirst
                    ) : (
                      <span className="text-gray-400">Pilih stasiun...</span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[90vw] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Cari stasiun..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Gagal mengambil data stasiun.</CommandEmpty>
                      <CommandGroup>
                        {stations
                          .sort((station) => station.group_wil)
                          .map((station) => (
                            <CommandItem
                              key={station.sta_name}
                              value={station.sta_name}
                              onSelect={(currentValue) => {
                                setValueFirst(
                                  currentValue === valueFirst
                                    ? ""
                                    : currentValue
                                );
                                setOpenFirst(false);
                              }}
                            >
                              {station.sta_name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  valueFirst === station.sta_name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="Jadwal">Jadwal</Label>
            <Select onValueChange={handleOnChangeJadwal}>
              <SelectTrigger className="w-full" id="jadwal">
                <SelectValue placeholder="Jadwal" />
              </SelectTrigger>
              <SelectContent>
                {jadwals.map((jadwal) => (
                  <SelectItem value={jadwal.value} key={jadwal.value}>
                    {jadwal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div
              className={`w-full mx-auto grid grid-cols-2 gap-4 mb-2 ${
                !openAturSendiri ? "hidden" : ""
              }`}
            >
              <div>
                <small className="text-gray-500">Dari:</small>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="start-time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={startTime}
                    onChange={(e) => handleOnChangeTime("start", e)}
                    required
                  />
                </div>
              </div>
              <div>
                <small className="text-gray-500">Sampai:</small>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="end-time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-black dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    value={endTime}
                    onChange={(e) => handleOnChangeTime("end", e)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          <Button
            className="w-full disabled:cursor-not-allowed"
            disabled={!valueFirst || !valueJadwal}
            onClick={() => {
              if (valueFirst && valueJadwal) {
                const station = stations.find(
                  (st) => st.sta_name === valueFirst
                );

                if (station) {
                  onClick(station, valueJadwal);
                } else {
                  alert("Stasiun tidak ditemukan");
                }
              } else {
                alert("Invalid data");
              }
            }}
          >
            Cari Kereta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
