import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ReactEcharts from "echarts-for-react";
import { Typography } from "antd";

const { Title } = Typography;

const legendData = ["View Content", "Page Scroll", "Conversion"];

const chartOptions = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: legendData,
  },
  toolbox: {
    show: false,
  },
  xAxis: [
    {
      type: "category",
      axisTick: { show: false },
      data: ["2012", "2013", "2014", "2015", "2016"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "View Content",
      type: "bar",
      barGap: 0,
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390],
    },
    {
      name: "Page Scroll",
      type: "bar",
      barGap: 0,
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290],
    },
    {
      name: "Conversion",
      type: "bar",
      barGap: 0,
      emphasis: {
        focus: "series",
      },
      data: [98, 77, 101, 99, 40],
    },
  ],
};

const Graph = () => {
  const events = useSelector((state) => state.data.events);
  const currentTableData = useSelector((state) => state.data.currentTableData);
  const [currentOption, setCurrentOption] = useState(chartOptions);

  useEffect(() => {
    const getSeries = (tableData) => {
      let viewContentData = [],
        pageScrollData = [],
        conversionData = [];
      const selectedRows = tableData.filter(
        (item) => item.selected && item.active
      );

      if (selectedRows.length > 0) {
        events.forEach((eventItem) => {
          let sumViewContent = 0,
          sumPageScroll = 0,
          sumConversion = 0;
          selectedRows.forEach((selected) => {
            sumViewContent =
              sumViewContent + ((selected.events.includes("view_content"))
                ? eventItem.audiences[selected.id].view_content
                : 0);
            sumPageScroll =
              sumPageScroll + (selected.events.includes("page_scroll")
                ? eventItem.audiences[selected.id].page_scroll
                : 0);
            sumConversion =
              sumConversion + (selected.events.includes("conversion")
                ? eventItem.audiences[selected.id].conversion
                : 0);
          });
          viewContentData.push(sumViewContent);
          pageScrollData.push(sumPageScroll);
          conversionData.push(sumConversion);
        });
      } else {
        events.forEach((item) => {
          viewContentData.push(
            item.totals.view_content ? item.totals.view_content : 0
          );
          pageScrollData.push(
            item.totals.page_scroll ? item.totals.page_scroll : 0
          );
          conversionData.push(
            item.totals.conversion ? item.totals.conversion : 0
          );
        });
      }
      return [
        {
          name: "View Content",
          type: "bar",
          barGap: 0,
          emphasis: {
            focus: "series",
          },
          data: viewContentData,
        },
        {
          name: "Page Scroll",
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data: pageScrollData,
        },
        {
          name: "Conversion",
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data: conversionData,
        },
      ];
    };
    if (events) {
      const xData = events.map((item) => item.date);
      const seriesData = getSeries(currentTableData);
      let newChartOption = {
        ...chartOptions,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xData,
          },
        ],
        series: seriesData,
      };
      setCurrentOption(newChartOption);
    }
    // eslint-disable-next-line
  }, [currentTableData]);

  return (
    <>
      <Title level={2}>Events</Title>
      <ReactEcharts
        option={currentOption}
        notMerge={true}
        lazyUpdate={true}
        theme="my_theme"
        opts={{ renderer: "svg" }}
      />
    </>
  );
};

export default Graph;
