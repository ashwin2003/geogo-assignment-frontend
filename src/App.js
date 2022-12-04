import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import AllEvents from "./components/AllEvents/AllEvents";
import BookTicket from "./components/BookTicket/BookTicket";
import YourOrders from "./components/YourOrders.js/YourOrders";
import Dashboard from "./components/Dashboard/Dashboard";
import Nodatafound from "./components/NoData/Nodatafound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/book" element={<BookTicket />} />
          <Route path="/orders" element={<YourOrders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Nodatafound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
