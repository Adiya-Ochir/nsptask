import { App, ConfigProvider, Space } from "antd";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App1 from "./App1";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2123bf",
        },
      }}
    >
      <BrowserRouter>
        <App1 />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
