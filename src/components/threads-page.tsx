import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";
import { ThreadMessages } from "../utils/types";

interface DataType {
  id: string;
  historyId: string;
  messages: ThreadMessages[];
  userEmail: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ThreadPage = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);

    axios
      .get("/threads", {
        params: {
          page: tableParams.pagination?.current,
          page_size: tableParams.pagination?.pageSize,
        },
      })
      .then(({ data }) => {
        setData(data.items);
        console.log(data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.total,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "HistoryId",
      dataIndex: "historyId",
      sorter: true,
    },
    {
      title: "Messages",
      dataIndex: "messages",
      render: (messages: ThreadMessages[]) => `${messages.length} Messages`,
    },
    {
      title: "User Email",
      dataIndex: "user_email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>View In Detail</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ThreadPage;
