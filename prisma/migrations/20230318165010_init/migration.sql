CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- CreateEnum
CREATE TYPE "Sensor" AS ENUM ('ACCELEROMETER', 'GYROSCOPE', 'MAGNETOMETER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BETATESTER');

-- CreateTable
CREATE TABLE "SensorReading" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "sensor" "Sensor" NOT NULL,
    "xAxis" DOUBLE PRECISION NOT NULL,
    "yAxis" DOUBLE PRECISION NOT NULL,
    "zAxis" DOUBLE PRECISION NOT NULL
);

-- Content below was added manually
-- Create hypertable
SELECT create_hypertable('"SensorReading"', 'timestamp', chunk_time_interval => INTERVAL '1 day');

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destroyedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "sequenceNumber" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SensorReading_id_timestamp_key" ON "SensorReading"("id", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SensorReading" ADD CONSTRAINT "SensorReading_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
