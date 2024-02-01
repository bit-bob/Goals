import React, { useEffect, useRef } from "react";

import { Goal, Record } from "api-client";
import {
  ColorType,
  CrosshairMode,
  LineStyle,
  LineType,
  createChart,
} from "lightweight-charts";

import { getGraphDataFromRecords } from "../getGraphDataFromRecords";
import { getThemeColor, parseThemeColor, useMantineTheme } from "@mantine/core";

export const ChartComponent = (props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  color: string;
  goal: Goal;
  records: Record[];
}) => {
  const {
    colors: {
      backgroundColor = "transparent",
      lineColor = props.color,
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = props.color,
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
      color: props.color,
    });

    const ledger = getGraphDataFromRecords(records);
    console.log(ledger);

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
  const theme = useMantineTheme();
  console.log(records);
  return (
    <ChartComponent
      color={parseThemeColor({ color: theme.primaryColor, theme }).value}
      goal={goal}
      records={records}
    />
  );
}
