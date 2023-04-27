import React, { useEffect, useState } from "react";
import { Space, Table, Breadcrumb, Layout, theme } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreadMessages } from "../../utils/types";
import { SERVER_URL } from "../../utils/constant";

const { Content } = Layout;

interface DataType {
  id: string;
  historyId: string;
  messages: ThreadMessages[];
  user_email: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ThreadDashboard = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`${SERVER_URL}/threads`, {
        params: {
          page: tableParams.pagination?.current,
          page_size: tableParams.pagination?.pageSize,
        },
      })
      .then(({ data }) => {
        setData(data.items);
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
      render: (_, record) => {
        return (
          <Space size="middle">
            <Link to={`/threads/${record.id}`}>View in details</Link>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[{ title: "Home" }, { title: "Threads" }]}
        style={{ margin: "10px 24px 0" }}
        separator=">"
      />
      <Content style={{ margin: "10px 16px 0", overflow: "inherit" }}>
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
          }}
        >
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
      </Content>
    </>
  );
};

export default ThreadDashboard;
