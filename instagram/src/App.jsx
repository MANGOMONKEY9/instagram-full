import Login from "./Login";
import Webpage from "./Webpage";
import {Routes, Route} from 'react-router-dom';

export default function App() {
    return(
        <div style={{width: "100%", height: "100%"}}>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/webpage" element={<Webpage />}/>
            </Routes>
        </div>
    )
}