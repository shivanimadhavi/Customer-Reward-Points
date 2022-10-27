import './App.css';
import {  Route, Routes} from "react-router-dom";
import CustomerRewards from "../src/Components/CustomerRewards/CustomerRewardList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomerRewards />} />
      </Routes>
    </div>
  );
}

export default App;
