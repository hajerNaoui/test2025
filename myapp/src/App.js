import './App.css';
import Header from "./components/Common/Header";
import { Route, Routes } from "react-router-dom";
import CreateEvent from "./components/Event/CreateEvent";
import ShowEvents from "./components/Event/ShowEvents";

function App() {
  return (
    <div className="App">
      <header className="container">
      <div className="">
          <Header />
          <Routes>
            <Route path="/" element={<ShowEvents />} />
            <Route path="/create-event" element={<CreateEvent  />} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
