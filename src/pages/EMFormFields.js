import React, { useState } from "react";
import { Form, Row, Col, Input, Button, Typography, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Fields, supplementaryFields } from "./FormFields.js";

const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { TextArea } = Input;
  const { Option } = Select;

  const supplementaryKeys = ["Second ", "Third ", "Fourth ", "Fifth "];

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Col span={22} offset={1}>
      <Form
        form={form}
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        {Fields.map((item) => (
          <Col span={22} offset={2}>
            <Row span={22}>
              <Title level={3}>{item.title}</Title>
            </Row>
            <Row span={22} offset={2}>
              {item.data.map((data) => (
                <Col span={6} key={data} offset={1}>
                  <Form.Item
                    name={[data.label]}
                    label={data.name}
                    rules={[
                      {
                        required: data.required,
                        // message: Fields[i].helpText,
                      },
                    ]}
                  >
                    {data.type === "textArea" ? (
                      <TextArea rows={4} />
                    ) : data.type === "select" ? (
                      <Select style={{ width: 80 }}>
                        {data.options.map((listOptions) => (
                          <Option value={listOptions}>{listOptions}</Option>
                        ))}
                      </Select>
                    ) : (
                      <Input type={data.type} placeholder={data.name} />
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Col>
        ))}
      </Form>
      <Row span={22}>
        <Title level={3}>
          {"EM Certification Application Form - Supplementary Information"}
        </Title>
      </Row>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {supplementaryFields.map((item) => (
          <Col span={22} offset={2}>
            <Row span={22}>
              <Title level={3}>{item.title}</Title>
            </Row>
            <Row span={22} offset={2}>
              {item.data.map((data) => (
                <Col span={6} key={data} offset={1}>
                  <Form.Item
                    name={[data.label]}
                    label={data.name}
                    rules={[
                      {
                        required: data.required,
                        // message: Fields[i].helpText,
                      },
                    ]}
                  >
                    {data.type === "textArea" ? (
                      <TextArea rows={4} />
                    ) : data.type === "select" ? (
                      <Select style={{ width: 80 }}>
                        {data.options.map((listOptions) => (
                          <Option value={listOptions}>{listOptions}</Option>
                        ))}
                      </Select>
                    ) : (
                      <Input type={data.type} placeholder={data.name} />
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Col>
        ))}
        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Col span={22} offset={2} key={field.key} align="baseline">
                  {supplementaryFields.map((item) => (
                    <Col span={22}>
                      <Row span={22}>
                        <Title level={3}>{item.title}</Title>
                      </Row>
                      <Row span={22}>
                        {item.data.map((data) => (
                          <Col span={6} key={data} offset={1}>
                            <Form.Item
                              name={[data.label, field.key]}
                              label={[supplementaryKeys[field.key], data.name]}
                              rules={[
                                {
                                  required: data.required,
                                  // message: Fields[i].helpText,
                                },
                              ]}
                            >
                              {data.type === "textArea" ? (
                                <TextArea rows={4} />
                              ) : data.type === "select" ? (
                                <Select style={{ width: 80 }}>
                                  {data.options.map((listOptions) => (
                                    <Option value={listOptions}>
                                      {listOptions}
                                    </Option>
                                  ))}
                                </Select>
                              ) : (
                                <Input
                                  type={data.type}
                                  placeholder={data.name}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  ))}

                  <Col span={2} offset={22}>
                  <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        block
                        icon={<MinusCircleOutlined />}
                      ></Button>
                    </Form.Item>                   
                  </Col>
                </Col>
              ))}

              <Form.Item>
              {fields.length < 4 ?
                (<Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                ></Button>):null }
              </Form.Item>
            </>
          )}
        </Form.List>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default AdvancedSearchForm;
