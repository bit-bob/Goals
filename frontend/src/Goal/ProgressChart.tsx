import { Goal, Record } from "api-client";
import {
  createChart,
  ColorType,
  CrosshairMode,
  LineType,
  LineStyle,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { getGraphDataFromRecords } from "../getGraphDataFromRecords";

export const ChartComponent = (props: {
  [x: string]: any;
  goal: Goal;
  records: Record[];
}) => {
  const {
    colors: {
      backgroundColor = "transparent",
      lineColor = "var(--mantine-color-blue-1)",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
    goal,
    records,
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      crosshair: {
        mode: CrosshairMode.Hidden,
      },
      width: chartContainerRef.current?.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addLineSeries({
      lineType: LineType.Simple,
      // color: "red",
    });

    const ledger = getGraphDataFromRecords(records);
    console.log(ledger);

    const a = [
      {
        time: "2023-10-30",
        timeLong: "2023-10-30T23:06:23.000Z",
        value: 1,
      },
      {
        time: "2023-10-31",
        timeLong: "2023-10-31T23:06:23.000Z",
        value: 9,
      },
      {
        time: "2023-11-01",
        timeLong: "2023-11-01T23:06:23.000Z",
        value: 24.6,
      },
      {
        time: "2023-11-02",
        timeLong: "2023-11-02T23:06:23.000Z",
        value: 36.510000000000005,
      },
      {
        time: "2023-11-03",
        timeLong: "2023-11-03T23:06:23.000Z",
        value: 46.28,
      },
      {
        time: "2023-11-04",
        timeLong: "2023-11-04T23:06:23.000Z",
        value: 111.28,
      },
      {
        time: "2023-11-05",
        timeLong: "2023-11-05T23:06:23.000Z",
        value: 119.28,
      },
      {
        time: "2023-11-06",
        timeLong: "2023-11-06T23:06:23.000Z",
        value: 137.29,
      },
      {
        time: "2023-11-07",
        timeLong: "2023-11-07T23:06:23.000Z",
        value: 838.29,
      },
      {
        time: "2023-11-08",
        timeLong: "2023-11-08T23:06:23.000Z",
        value: 850.29,
      },
      {
        time: "2023-11-09",
        timeLong: "2023-11-09T23:06:23.000Z",
        value: 850.29,
      },
      {
        time: "2023-11-10",
        timeLong: "2023-11-10T22:47:21.000Z",
        value: 863.68,
      },
      {
        time: "2023-11-11",
        timeLong: "2023-11-11T22:47:21.000Z",
        value: 872.1099999999999,
      },
      {
        time: "2023-11-12",
        timeLong: "2023-11-12T22:47:21.000Z",
        value: 889.31,
      },
      {
        time: "2023-11-13",
        timeLong: "2023-11-13T22:47:21.000Z",
        value: 890.5999999999999,
      },
      {
        time: "2023-11-14",
        timeLong: "2023-11-14T22:47:21.000Z",
        value: 895.18,
      },
      {
        time: "2023-11-15",
        timeLong: "2023-11-15T22:48:28.000Z",
        value: 907.18,
      },
      {
        time: "2023-11-16",
        timeLong: "2023-11-16T23:01:30.000Z",
        value: 920.16,
      },
      {
        time: "2023-11-17",
        timeLong: "2023-11-17T23:01:30.000Z",
        value: 924.36,
      },
      {
        time: "2023-11-18",
        timeLong: "2023-11-18T23:01:30.000Z",
        value: 925.36,
      },
    ];

    newSeries.setData(ledger.entries);

    if (ledger.entries.length > 0) {
      const guide = chart.addLineSeries({
        lineType: LineType.Simple,
        lineStyle: LineStyle.Dashed,
        lineWidth: 1,
        color: "white",
      });

      guide.setData([
        { time: ledger.entries[0].time, value: ledger.entries[0].value },
        {
          time: ledger.entries[ledger.entries.length - 1].time,
          value: ledger.entries[ledger.entries.length - 1].value,
        },
      ]);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    goal,
    records,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

// const initialData = [
//   { time: "2018-12-22", value: 0 },
//   { time: "2018-12-23", value: 1220 },
//   { time: "2018-12-24", value: 1230 },
//   { time: "2018-12-25", value: 1230 },
//   { time: "2018-12-26", value: 1810 },
//   { time: "2018-12-27", value: 1830 },
//   { time: "2018-12-28", value: 2000 },
//   { time: "2018-12-29", value: 2000 },
//   { time: "2018-12-30", value: 2000 },
//   { time: "2018-12-31", value: 2267 },
// ];

export function ProgressChart({
  goal,
  records,
}: {
  goal: Goal;
  records: Record[];
}) {
  return <ChartComponent goal={goal} records={records} />;
}
