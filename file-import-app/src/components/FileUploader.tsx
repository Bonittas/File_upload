import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import XLSX from 'xlsx';
import DataTable from './DataTable';
import { Item } from './types';

const FileUploader: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);

  const handleChange = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target?.result;
      const wb = XLSX.read(binaryData, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const items = XLSX.utils.sheet_to_json<Item>(ws);
      setData(items);
    };
    reader.readAsBinaryString(file);
    return false;
  };

  const handleSaveData = async (data: Item[]) => {
    try {
      // Call the API to save the data
      // Example:
      // await axios.post('/api/data', data);
      message.success('Data saved successfully');
    } catch (error) {
      message.error('Failed to save data');
    }
  };

  const uploadProps = {
    beforeUpload: handleChange,
    showUploadList: false,
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Import Data</Button>
      </Upload>
      <DataTable data={data} />
      {data.length > 0 && (
        <Button onClick={() => handleSaveData(data)}>Save Data</Button>
      )}
    </div>
  );
};

export default FileUploader;