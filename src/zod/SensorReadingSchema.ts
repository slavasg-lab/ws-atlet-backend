import { z } from "zod";

export const SensorReadingSchema = z
  .array(
    z.object({
      timestamp: z.number(),
      sensor: z.enum(["ACCELEROMETER", "GYROSCOPE", "MAGNETOMETER"]),
      xAxis: z.number(),
      yAxis: z.number(),
      zAxis: z.number(),
    }),
  )
  .nonempty();
