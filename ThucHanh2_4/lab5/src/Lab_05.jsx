import React, { use, useEffect, useState, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CustomerModal from "./CustomerModal";
import "./Lab_05.css"
import axios from "axios";
const Lab_05 = () => {
    return (
        <div className="grid grid-rows3 grid-cols-4 gap-2">
            <div className="row-span-3 col-span-1 border border-2">
                <div className="grid grid-cols-1 gap-2">
                    <img src="../src/FEData/logo2.png" alt="error" />
                    <NavLink to="/dashboard" className="nav-link" >
                        Dashboar
                    </NavLink>
                    <NavLink to="/project" className="nav-link" >
                        Project
                    </NavLink>
                    <NavLink to="/theme" className="nav-link"  >
                        Theme
                    </NavLink>
                    <NavLink to="/analytics" className="nav-link" >
                        Analytics
                    </NavLink>
                    <NavLink to="/messages" className="nav-link"  >
                        Messages
                    </NavLink>
                    <NavLink
                        to="/integrations"
                        className="nav-link" >
                        Integrations
                    </NavLink>
                    <div style={{ backgroundColor: "#f0f6ff" }} className="flex flex-col justify-content-center align-items-center">
                        <img src="../src/FEData/v2.png" alt="error" />
                        <h2>V2.0 is available</h2>
                        <div className="border-2 border-blue-500 w-50 rounded">
                            <button className="w-full text-blue-500 bg-transparent py-2  " >try now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-span-3 col-span-3 ">
                <Outlet />
            </div>
        </div>
    )
}
const Dashboard = () => {
    const [overView, setOverView] = useState([{
        id: 1,
        name: "Turnover",
        price: 92405,
        percent: 5.39,

    }]);
    useEffect(() => {
        axios.get("https://67f5ddfa913986b16fa5c168.mockapi.io/admin/OverView")
            .then((res) => {
                setOverView(res.data);
                console.log("load successfully")
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const getColorOverView = (index) => {
        if (index == 0) {
            return "#fef0f5"
        } else if (index == 1) {
            return "#f0f6ff"
        } else {
            return "#f1f8fd"
        }
    }
    return (
        <>
            <div>
                <div className="border boder-2">
                    <h1>dashboard</h1>
                </div>
                <hr />
                <div className="border boder-2 my-5">
                    <h1>overview</h1>
                    <div className="grid grid-cols-3 gap-2">
                        {overView.map((item, index) => (
                            <div key={index} style={{ backgroundColor: getColorOverView(index) }} className="flex justify-between border border-2 p-3">
                                <div style={{ backgroundColor: getColorOverView(index) }} className="flex flex-col">
                                    <h6 className="text-start">{item.name}</h6>
                                    <h2 className="text-start text-2xl font-bold">{item.price}{index != 2 ? "$" : ""}</h2>
                                    <span className="text-start text-green-500">{item.percent}%<span className="text-black"> period of change</span> </span>
                                </div>
                                <img style={{ backgroundColor: getColorOverView(index) }} className="self-start" src={item.image} alt="err" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border boder-2 h-100" >
                    <h1>detail report</h1>
                </div>
            </div>
        </>
    )
}
const Project = () => {
    return (
        <>
            <h1>Project</h1>
        </>
    )
}
const Theme = () => {
    return (
        <>
            <h1>Theme</h1>
        </>
    )
}
const Analytics = () => {
    return (
        <>
            <h1>Analytics</h1>
        </>
    )
}
const Messages = () => {
    return (
        <>
            <h1>Messages</h1>
        </>
    )
}
const Integrations = () => {
    return (
        <>
            <h1>Integrations</h1>
        </>
    )
}
export { Dashboard, Project, Theme, Analytics, Messages, Integrations };
export default Lab_05;