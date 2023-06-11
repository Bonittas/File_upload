import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { Item } from './types';
import { ColumnType } from 'antd/es/table';

interface EditableColumnType<T> extends ColumnType<T> {
  editable?: boolean;
}

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: keyof T;
  title: string;
  inputType: 'text' | 'number';
  record: T;
  index: number;
  children: React.ReactNode;
}

interface DisabledAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

const EditableCell: React.FC<EditableCellProps<Item>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DataTable = ({ data }: { data: Item[] }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey('');
      } else {
        newData.push(row as Item);
        setEditingKey('');
      }

      // Call API to save data
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns: EditableColumnType<Item>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    // Other columns...
  ];

  return (
    <Form form={form} component={false}>
      <Table<Item>
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
      />
    </Form>
  );
};

export default DataTable;