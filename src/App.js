import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Tariffthree from "./Tariffthree";
import Tariffone from "./Tariffone";
import Newyearplus from "./Newyearplus";

const App = () => {
    return <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/newyearplus" />} />
                <Route path="/newyearplus" element={<Newyearplus />} />
                <Route path="/tariff_1" element={<Tariffone />} />
                <Route path="/tariff_3" element={<Tariffthree />} />

                <Route path="*" element={<Navigate to={"/newyearplus"} />}/>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;
