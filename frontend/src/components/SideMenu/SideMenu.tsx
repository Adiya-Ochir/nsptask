import React from "react";
import Sider from "antd/es/layout/Sider";
import { Layout, Menu } from "antd";
import { HiOutlineHome } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { GrOrganization } from "react-icons/gr";
import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
function SideMenu() {
  const navigate = useNavigate();
  const [collpased, setCollpased] = useState(false);
  return (
    <div>
      <Layout className="container">
        <Sider collapsed={collpased} theme="dark">
          <Menu
            onClick={(item) => {
              navigate(item.key);
            }}
            mode="inline"
            items={[
              {
                label: "home",
                key: "/",
                icon: <HiOutlineHome />,
                children: [
                  {
                    label: "All users",
                    key: "all_users",
                    icon: <BsPerson />,
                  },
                ],
              },
              {
                label: "about us",
                key: "about_us",
                icon: <GrOrganization />,
              },
              {
                label: "sign out",
                key: "sign_out",
                icon: <GrOrganization />,
              },
            ]}
          ></Menu>
        </Sider>
      </Layout>
    </div>
  );
}

export default SideMenu;
