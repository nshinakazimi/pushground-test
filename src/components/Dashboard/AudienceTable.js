import React, { useState, useRef, useContext, useEffect, createContext } from "react";

import { Table, Form, Input, message } from "antd";

import TableColumn from "./TableColumn";
import { TableWrapper } from "./styles";

const rowSelection = {
  type: "checkbox",
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const EditableContext = createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const AudienceTable = ({ tableData }) => {
  const [currentTableData, setCurrentTableData] = useState([]);

  const handleSave = (row) => {
    const duplicatedRow = currentTableData.filter((item) => item.name === row.name && item.key !== row.key);
    if (duplicatedRow.length > 0) {
      message.error(`"${duplicatedRow[0].name}" already exists`);
      return;
    } else {
      const newData = [...currentTableData];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setCurrentTableData(newData);
    }
  };
  const handleFieldChange = (value, record, field) => {
    const newData = [...currentTableData];
    const index = newData.findIndex((item) => record.key === item.key);
    const newRow = { ...record, [field]: value };
    newData.splice(index, 1, newRow);
    setCurrentTableData(newData);
  };

  useEffect(() => {
    if (tableData && tableData.length) setCurrentTableData(tableData);
  }, [tableData]);

  const columns = TableColumn({
    handleSave,
    handleFieldChange,
  });
  const components = { body: { row: EditableRow, cell: EditableCell } };

  return (
    <TableWrapper>
      <h2>Audiences</h2>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={currentTableData}
        pagination={false}
        components={components}
      />
    </TableWrapper>
  );
};

export default AudienceTable;
