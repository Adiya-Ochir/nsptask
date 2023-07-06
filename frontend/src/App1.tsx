import PageContent from "./components/PageContent/PageContent";
import SideMenu from "./components/SideMenu/SideMenu";
import "./styles/App.css";
function App1() {
  return (
    <div className="App">
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
    </div>
  );
}
export default App1;
