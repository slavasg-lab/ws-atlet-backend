export type SensorReading = {
  timestamp: Date;
  sensor: "ACCELEROMETER" | "GYROSCOPE" | "MAGNETOMETER";
  xAxis: number;
  yAxis: number;
  zAxis: number;
};
