import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
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

export default function CariJadwalCard({
  onClick,
}: {
  onClick: (first: Station, dest: Station) => void;
}) {
  const [openFirst, setOpenFirst] = useState(false);
  const [openDest, setOpenDest] = useState(false);
  const [valueFirst, setValueFirst] = useState("");
  const [valueDest, setValueDest] = useState("");

  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            <Label htmlFor="StasiunAwal">Stasiun Awal</Label>
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
            <Label htmlFor="StasiunTujuan">Stasiun Tujuan</Label>
            {loading && <p>Tunggu sebentar...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <Popover open={openDest} onOpenChange={setOpenDest}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    // aria-expanded={open}
                    className="justify-between w-full"
                  >
                    {valueFirst ? (
                      valueDest ? (
                        valueDest
                      ) : (
                        <span className="text-gray-400">Pilih stasiun...</span>
                      )
                    ) : (
                      <span className="text-gray-400">
                        Pilih stasiun awal dulu
                      </span>
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
                        {valueFirst ? (
                          <>
                            {stations
                              .filter(
                                (station) =>
                                  station.group_wil ===
                                  stations.find(
                                    (st) => st.sta_name === valueFirst
                                  )?.group_wil
                              )
                              .map((station) => (
                                <CommandItem
                                  key={station.sta_name}
                                  value={station.sta_name}
                                  onSelect={(currentValue) => {
                                    setValueDest(
                                      currentValue === valueDest
                                        ? ""
                                        : currentValue
                                    );
                                    setOpenDest(false);
                                  }}
                                >
                                  {station.sta_name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      valueDest === station.sta_name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </>
                        ) : (
                          <CommandItem>Pilih stasiun awal dulu</CommandItem>
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-center">
          <Button
            className="w-full disabled:cursor-not-allowed"
            disabled={!valueFirst || !valueDest}
            onClick={() => {
              if (valueFirst && valueDest) {
                const firstStation = stations.find(
                  (st) => st.sta_name === valueFirst
                );
                const destStation = stations.find(
                  (st) => st.sta_name === valueDest
                );

                if (firstStation && destStation) {
                  onClick(firstStation, destStation);
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
