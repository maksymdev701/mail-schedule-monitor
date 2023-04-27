import React from "react";
import { Breadcrumb, Form, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const PromptAddForm = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleFinish = (values: any) => {};

  return (
    <>
      <Breadcrumb
        items={[
          { title: "Home" },
          {
            title: "Prompts",
            onClick: () => {
              navigate("/prompt");
            },
          },
          { title: "Add" },
        ]}
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
          <Form
            style={{ maxWidth: 600 }}
            onFinish={handleFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item name=""></Form.Item>
          </Form>
        </div>
      </Content>
    </>
  );
};

export default PromptAddForm;
