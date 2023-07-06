import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Menu,
  Row,
  Steps,
  Table,
  Tag,
  Typography,
  Popconfirm,
  InputNumber,
  message,
  Pagination,
} from "antd";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";

import axios from "axios";
import { baseURL } from "../Utils/constant";
// import List from "../components/List";
import AppRouter from "../components/AppRouter/AppRouter";
import AddModal from "../components/Modal/AddModal";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "antd/es/button/button-group";
interface Item {
  id: number;
  uname: string;
  email: string;
  status: boolean;
}
// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean;
//   dataIndex: string;
//   title: any;
//   inputType: "number" | "text";
//   record: Item;
//   index: number;
//   children: React.ReactNode;
// }

// const EditableCell: React.FC<EditableCellProps> = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

function Users() {
  const [form] = Form.useForm();
  const [searchedText, setSearchedText] = useState("");
  const [tasks, setTasks] = useState<Item[]>([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const generateData = () => {
    const dat = tasks;
    return dat;
  };
  const Item = generateData();

  const editTask = (id: string) => {
    const path = `/edit_users/${id}`;
    navigate(path);
  };

  // const isEditing = (record: Item) => record._id === editingKey;
  // const edit = (record: Partial<Item> & { _id: React.Key }) => {
  //   form.setFieldsValue({ name: "", email: "", status: "", ...record });
  //   setEditingKey(record._id);
  // };
  // const cancel = () => {
  //   setEditingKey("");
  // };
  // const save = async (_id: React.Key) => {
  //   try {
  //     const row = (await form.validateFields()) as Item;
  //     // console.log("row", row);
  //     // console.log(tasks);
  //     const newData = [...tasks];

  //     const index = newData.findIndex((item: Item) => _id === item._id);
  //     console.log("index", index);
  //     if (index > -1) {
  //       const item: Item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //       console.log("neeeew data", newData);

  //       setTasks(newData);
  //       setEditingKey("");
  //       upData({ _id, ...row });
  //       return setTasks;
  //     } else {
  //       newData.push(row);
  //       setTasks(newData);
  //       setEditingKey("");
  //       return setTasks;
  //     }
  //   } catch (errInfo) {
  //     console.log("Validate Failed:", errInfo);
  //   }
  // };

  // const upData = async (param: any) => {
  //   // console.log("param", param);
  //   axios.put(`${baseURL}/update/${param.id}`, param).then((res) => {
  //     message.success("update success");
  //   });
  // };

  const columns = [
    {
      dataIndex: "id",
      title: "ID",
      _id: "id",
      fixed: true,
      filteredValue: [searchedText],
      onFilter: (value: any, record: any) => {
        return record.uname.includes(value);
      },
    },
    {
      dataIndex: "uname",
      title: "uname",
      _id: "uname",
      editable: true,
    },
    {
      dataIndex: "email",
      title: "Email Id",
      _id: "email",
      editable: true,
    },
    {
      dataIndex: "status",
      title: "Status",
      _id: "status",
      editable: true,
      render: (val: any) => (val ? <Tag>Active</Tag> : <Tag>Not Active</Tag>),
    },
    {
      title: "Edit",
      render: (val: any, record: Item) => {
        return (
          <ButtonGroup>
            <Button onClick={() => editTask(val.id)}>edit</Button>
            <Button type="primary" danger onClick={() => removeTask(val.id)}>
              delete
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];
  const tableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "status" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        // editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    fechData(currentPage, limit);
  }, [updateUI]);

  const fechData = (page: number, limit: number) => {
    axios.get(`${baseURL}/?page=${page}&limit=${limit}`).then((res) => {
      setTasks(res.data.data?.list);

      setTotal(res.data.data?.total);
    });
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    fechData(page, limit);
  };
  const removeTask = (id: string) => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <div>
      <Layout>
        <Content className="content">
          <Divider />
          <Row gutter={10}>
            <Col span={28}>
              <div className="Modal">
                <Input.Search
                  placeholder="Search"
                  style={{ marginTop: 8, marginBottom: 8, width: 200 }}
                  onSearch={(value) => {
                    setSearchedText(value);
                  }}
                />
                <AddModal />
              </div>
              <Form form={form} component={false}>
                <Table
                  components={
                    {
                      // body: {
                      //   cell: EditableCell,
                      // },
                    }
                  }
                  style={{ marginTop: 10 }}
                  dataSource={tasks}
                  columns={tableColumns}
                  scroll={{ y: 450 }}
                  rowClassName="editble-row"
                  pagination={{
                    pageSize: limit,
                    total: total,
                    onChange: handlePageClick,
                  }}
                />
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
export default Users;
