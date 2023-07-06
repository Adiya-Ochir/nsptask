import React, { useState } from "react";
import { Avatar, Button, Card, Col, Input, Modal, Form, message } from "antd";
import { baseURL } from "../../Utils/constant";
import axios from "axios";
import "../../styles/dashboard.css";
const AddModal: React.FC = () => {
  const [uname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const addData1 = {
    uname,
    email,
    status,
  };
  const [updateUI, setUpdateUI] = useState(false);
  const [open, setOpen] = useState(false);
  const addTask = () => {
    console.log("addData1", addData1);

    axios.post(`${baseURL}/`, addData1).then((res) => {
      console.log(res.data);
      message.success("update success");
      setUpdateUI((prevState) => !prevState);
    });
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Modal
        title="Хэрэглэгчийн бүртгэл"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
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
              <Form.Item>
                <Form.Item className="Items" name={"name"} label={"Name"}>
                  <Input
                    type="text"
                    value={uname}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item className="Items" name={"email"} label={"Email"}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item className="Items" name={"status"} label={"Status"}>
                  <Input
                    type="number"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </Form.Item>
                <Form.Item className="AddButton">
                  <Button
                    type="primary"
                    onClick={() => addTask()}
                    htmlType="reset"
                  >
                    Add user
                  </Button>
                </Form.Item>
              </Form.Item>
            </Card>
          </Col>
        </div>
      </Modal>
    </>
  );
};

export default AddModal;
