import React, { Component } from "react";
import {Route,NavLink,HashRouter,Routes} from "react-router-dom";
import Home from "./Components/Tabs/Dashboard";
import Alerts from "./Components/Tabs/Alerts";
import Agents from "./Components/Tabs/Agents";
import Rules from "./Components/Tabs/Rules";
import "bootstrap/dist/css/bootstrap.css";
import { SiWolframlanguage } from "react-icons/si";
import { IconContext } from "react-icons/lib";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    
                    <ul className="header">
                         <li className="navbar-brand" href="/">ㅤ
                           <IconContext.Provider href="/" value={{size:"2em", color:"white" }}><SiWolframlanguage/></IconContext.Provider>
                        </li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/Alerts">Alerts</NavLink></li>
                        <li><NavLink to="/Agents">Agents</NavLink></li>
                        <li><NavLink to="/Rules">Rules</NavLink></li>
                    </ul>
                    <div className="content">
                        <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/Alerts" element={<Alerts />} />
                        <Route path="/Agents" element={<Agents />} />
                        <Route path="/Rules" element={<Rules />} />
                        </Routes>
                        
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;