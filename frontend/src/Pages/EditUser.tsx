import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Table,
  message,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";

import axios from "axios";
import { baseURL } from "../Utils/constant";

import { Content } from "antd/es/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import AddPetModal from "../components/Modal/AddPetModal";
import ButtonGroup from "antd/es/button/button-group";
interface Item {
  _id: string;
  name: string;
  email: string;
  status: number;
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

function EditUser() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [formPet] = Form.useForm();
  const [searchedText, setSearchedText] = useState("");
  const [input, setInput] = useState("");
  const [pets, setPets] = useState<Item[]>([]);
  const [updateUI, setUpdateUI] = useState(false);

  const { id } = useParams();
  const [addData1, setAddData1] = useState<any>();

  const [uname, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const [pet_name, setPet_name] = useState("");
  const [pet_type, setPet_type] = useState("");
  const [modal, setModal] = useState(false);

  const [unit, setUnit] = useState("");
  const addAnimalData = {
    pet_name,
    pet_type,
    unit,
  };

  const init = () => {
    // console.info("Id=>", id);
    axios.get(`${baseURL}/get/${id}`).then((res) => {
      setAddData1(res.data?.[0]);
    });
    axios.get(`${baseURL}/pet/get/${id}`).then((res) => {
      setPets(res?.data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setFild();
  }, [addData1]);

  const setFild = () => {
    if (addData1) {
      form.setFieldsValue({
        uname: addData1?.uname,
        email: addData1?.email,
        status: addData1?.status,
      });
    }
  };

  const SaveTask = () => {
    axios.put(`${baseURL}/pet/update/${id}`, addAnimalData).then((res) => {
      message.success("update success");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const addTask = () => {
    const val = form.getFieldsValue();

    axios.put(`${baseURL}/update/${id}`, val).then((res) => {
      message.success("update success");
      setUpdateUI((prevState) => !prevState);
    });
    const path = `/all_users/`;
    navigate(path);
  };
  const removeTask = (id: string) => {
    axios.delete(`${baseURL}/pet/delete/${id}`).then((res) => {
      setUpdateUI((prevState) => !prevState);
    });
  };

  const editTask = (data: any) => {
    setModal(true);
    formPet.setFieldsValue({
      Unit: data?.unit,
      Pet_type: data?.pet_type,
      Pet_name: data?.pet_name,
    });
  };

  const columns = [
    {
      dataIndex: "pet_name",
      title: "Pet name",
      _id: "pet_name",
      editable: true,
    },
    {
      dataIndex: "pet_type",
      title: "Pet type",
      _id: "type",
      editable: true,
    },
    {
      dataIndex: "unit",
      title: "Unit",
      _id: "unit",
      editable: true,
    },
    {
      title: "Edit",
      render: (val: any, record: Item) => {
        return (
          <ButtonGroup>
            <Button onClick={() => editTask(val)}>edit</Button>
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
      }),
    };
  });

  return (
    <div>
      <Modal
        title="Засвар хийх"
        centered
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        width={500}
        bodyStyle={{ height: 400 }}
      >
        <div>
          <Col>
            <Card className="Card">
              <Avatar
                size={"large"}
                src={
                  "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
                }
              />
              <Form form={formPet}>
                <Form.Item
                  className="Items"
                  name={"Pet_name"}
                  label={"Pet name"}
                >
                  <Input
                    type="text"
                    value={pet_name}
                    onChange={(e) => setPet_name(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="Items"
                  name={"Pet_type"}
                  label={"Pet type"}
                >
                  <Input
                    type="text"
                    value={pet_type}
                    onChange={(e) => setPet_type(e.target.value)}
                  />
                </Form.Item>
                <Form.Item className="Items" name={"Unit"} label={"Unit"}>
                  <Input
                    type="number"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </Form.Item>
                <Form className="AddButton">
                  <Button
                    type="primary"
                    onClick={() => SaveTask()}
                    htmlType="reset"
                  >
                    Save pet
                  </Button>
                </Form>
              </Form>
            </Card>
          </Col>
        </div>
      </Modal>
      <Layout>
        <Content className="content">
          <Divider />
          <Row gutter={10}>
            <Col span={6}>
              <Card className="CardEdit">
                <Avatar
                  size={"large"}
                  src={
                    "https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
                  }
                />
                <Form form={form} onFinish={addTask}>
                  <Form.Item className="Items" name="uname" label={"uName"}>
                    <Input type="text" value={uname} />
                  </Form.Item>
                  <Form.Item className="Items" name={"email"} label={"Email"}>
                    <Input type="email" value={email} />
                  </Form.Item>
                  <Form.Item className="Items" name={"status"} label={"Status"}>
                    <Input type="number" value={status} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={16}>
              <div className="Modal">
                <Input.Search
                  placeholder="Search"
                  style={{ marginTop: 8, marginBottom: 8, width: 200 }}
                  onSearch={(value) => {
                    setSearchedText(value);
                  }}
                />
                <AddPetModal memberId={addData1?.id} />
              </div>
              <Form form={form1} component={false}>
                <Table
                  components={
                    {
                      // body: {
                      //   cell: EditableCell,
                      // },
                    }
                  }
                  style={{ marginTop: 10 }}
                  dataSource={pets}
                  columns={tableColumns}
                  scroll={{ y: 450 }}
                  rowClassName="editble-row"
                />
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
export default EditUser;
