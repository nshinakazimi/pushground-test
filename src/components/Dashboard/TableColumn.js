import React from "react";
import { Select, Switch } from "antd";

const TableColumn = ({ handleSave, handleFieldChange }) => {
  const eventOptions = [
    { value: "view_content", label: "View Content" },
    { value: "page_scroll", label: "Page Scroll" },
    { value: "conversion", label: "Conversion" },
  ];

  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      required: true,
      width: "15%",
      onCell: (record) => ({
        record,
        title: "Name",
        dataIndex: "name",
        required: true,
        editable: true,
        handleSave,
      }),
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Event Types",
      dataIndex: "events",
      key: "events",
      render: (text, record, index) => {
        return (
          <Select
            showSearch={false}
            bordered={false}
            mode="multiple"
            options={eventOptions}
            defaultValue={record.events}
            onChange={(value) => handleFieldChange(value, record, "events")}
            style={{ width: '60%' }}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record, index) => (
        <Switch checked={record.active} onChange={(value) => handleFieldChange(value, record, "active")} />
      ),
    },
  ];
};
export default TableColumn;
