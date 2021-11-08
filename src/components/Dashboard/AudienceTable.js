import React, { useState, useRef, useContext, useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Input, message, Typography } from "antd";

import { setCurrentTableData } from "../../actions/data";

import TableColumn from "./TableColumn";

const { Title } = Typography;

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

const AudienceTable = () => {
  const dispatch = useDispatch();
  const currentTableData = useSelector((state) => state.data.currentTableData);

  const rowSelection = {
    type: "checkbox",
    onChange: (selectedRowKeys) => {
      const updatedTableData = currentTableData.map((item) => {
        if (selectedRowKeys.includes(item.key)) return { ...item, selected: true };
        else return { ...item, selected: false }
      });
      dispatch(setCurrentTableData(updatedTableData));
    },
  };

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
      dispatch(setCurrentTableData(newData));
    }
  };
  const handleFieldChange = (value, record, field) => {
    const newData = [...currentTableData];
    const index = newData.findIndex((item) => record.key === item.key);
    const newRow = { ...record, [field]: value };
    newData.splice(index, 1, newRow);
    dispatch(setCurrentTableData(newData));
  };

  const columns = TableColumn({
    handleSave,
    handleFieldChange,
  });

  const components = { body: { row: EditableRow, cell: EditableCell } };

  return (
    <>
      <Title level={2}>Audiences</Title>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={currentTableData}
        pagination={false}
        components={components}
      />
    </>
  );
};

export default AudienceTable;
