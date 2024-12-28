export interface RouteTrain {
  train_id: string;
  ka_name: string;
  station_id: string;
  station_name: string;
  time_est: string;
  transit_station: boolean;
  color: string;
  transit: [];
}
