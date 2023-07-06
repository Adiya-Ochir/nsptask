import React, { useState } from "react";
import { Avatar, Button, Card, Col, Input, Modal, Form, message } from "antd";
import { baseURL } from "../../Utils/constant";
import axios from "axios";
import "../../styles/dashboard.css";
const AddPetModal = ({ memberId }: { memberId: number }) => {
  const [pet_name, setPet_name] = useState("");
  const [pet_type, setPet_type] = useState("");
  const [unit, setUnit] = useState("");
  const addAnimalData = {
    pet_name,
    pet_type,
    unit,
    member_id: memberId,
  };
  const [updateUI, setUpdateUI] = useState(false);
  const [open, setOpen] = useState(false);
  const addPetTask = () => {
    axios.post(`${baseURL}/pet`, addAnimalData).then((res) => {
      message.success("update success");
    });
    setOpen(false);
    setUpdateUI((prevState) => !prevState);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Pet
      </Button>
      <Modal
        title="Амьтны бүртгэл"
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
                <Form.Item className="AddButton">
                  <Button
                    type="primary"
                    onClick={() => addPetTask()}
                    htmlType="reset"
                  >
                    Add
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

export default AddPetModal;
