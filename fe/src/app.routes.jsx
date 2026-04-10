import {BrowserRouter , Routes, Route} from "react-router" ; 
import Register from "./features/Auth/pages/Register";
import Login from "./features/Auth/pages/Login";
import Protected from "./features/Auth/components/Protected";
import Home from "./features/home/pages/Home.jsx";


function AppRoutes(){
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element = {<Protected> <Home/> </Protected>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    </BrowserRouter>)
}

export default AppRoutes ; 