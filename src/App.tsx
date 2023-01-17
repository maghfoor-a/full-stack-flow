import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <MainContent />
      </BrowserRouter>
    </>
  );
}

export default App;
