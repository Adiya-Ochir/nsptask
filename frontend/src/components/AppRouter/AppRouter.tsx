import { Route, Routes, BrowserRouter } from "react-router-dom";
import Users from "../../Pages/Users";
import About from "../../Pages/About";
import EditUser from "../../Pages/EditUser";
function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div></div>}></Route>
        <Route path="/edit_users/:id" element={<EditUser />}></Route>
        <Route path="/all_users" element={<Users />}></Route>
        <Route path="/about_us" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default AppRouter;
