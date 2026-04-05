import {BrowserRouter , Routes, Route} from "react-router" ; 
import Register from "./features/Auth/pages/Register";
import Login from "./features/Auth/pages/Login";
import Protected from "./features/Auth/components/Protected";

function AppRoutes(){
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element = <Protected><h1>home</h1></Protected>/>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    </BrowserRouter>)
}

export default AppRoutes ; 