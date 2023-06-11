import React from 'react';
import { Input, InputNumber, Form } from 'antd';
import { Item } from './types';

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
    editable?: boolean;

  editing: boolean;
  dataIndex: keyof T;
  title: string;
  inputType: 'text' | 'number';
  record: T;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps<Item>> = ({
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