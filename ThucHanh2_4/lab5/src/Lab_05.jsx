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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleFormSubmit = (data) => {
        if (customers.find(customer => customer.name === data.name)) {
            alert("Customer already exists!");
            return;
        }
        data.img = '../src/FEData/Avatar (1).png'; // Set a default image or handle it as needed
        setCustomers((prevCustomers) => [...prevCustomers, data]);
        axios.post('https://67f5ddfa913986b16fa5c168.mockapi.io/admin/Report', data)
            .then((response) => {

                console.log('Customer added:', response.data);
            }).catch((error) => {
                console.error('Error adding customer:', error);
            });
        closeModal();
    };
    const [selectedCutomer, setSelectedCustomer] = useState({
        name: '', // default empty string
        company: '',
        orderValue: '',
        orderDate: '',
        status: 'New', // default status});
    });
    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        openModal();
    }
    const [customers, setCustomers] = useState([
        {
            name: 'Elizabeth Lee',
            company: 'AvatarSystems',
            orderValue: '$359',
            orderDate: '10/07/2023',
            status: 'New',
            avatar: '../src/FEData/Avatar (1).png',
        },
    ]);
    const formatDate = (dateString) => {
        const date = new Date(dateString); // Convert the string to a Date object
        const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and ensure 2-digit format
        const year = date.getFullYear(); // Get the year
        return `${day}/${month}/${year}`; // Format as dd/MM/yyyy
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return 'bg-blue-100 text-blue-600';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-600';
            case 'Completed':
                return 'bg-green-100 text-green-600';
            default:
                return '';
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const numberItemsPerPage = 5;
    const firstIndexOfPage = 1;
    const totalPages = Math.ceil(customers.length / numberItemsPerPage);
    const currentPageData = useMemo(() => {
        const startIndex = (currentPage - 1) * numberItemsPerPage;
        const endIndex = startIndex + numberItemsPerPage;
        return customers.slice(startIndex, endIndex);
    }, [customers, currentPage, numberItemsPerPage]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    useEffect(() => {
        axios
            .get('https://67f5ddfa913986b16fa5c168.mockapi.io/admin/Report')
            .then((response) => {
                const updatedCustomers = response.data.map((customer) => {
                    // Chọn ngẫu nhiên một status
                    const statuses = ['New', 'In Progress', 'Completed'];
                    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    // Kiểm tra tính hợp lệ của orderDate trước khi chuyển đổi
                    let formattedOrderDate = formatDate(customer.orderDate);

                    // Cập nhật status cho customer
                    return { ...customer, status: randomStatus, orderDate: formattedOrderDate };
                });
                setCustomers(updatedCustomers);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
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
                <div className="mt-2 shadow-lg">
                    <div className="flex justify-start mt-2">
                        <span className="ms-3 me-auto font-bold text-2xl">Detail report</span>
                        <button className="bg-white! border-4! border-red-200! flex items-center gap-2 px-3 py-1 rounded me-2"><img src="../src/FEData/Download.png" alt="err" onClick={openModal} /> Import</button>
                        <button className="bg-white! border-4! border-red-200!  flex items-center gap-2 px-3 py-1 rounded"><img src="../src/FEData/Move up.png" alt="err" /> Export</button>
                        {/* <CustomerModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFormSubmit} data={selectedCutomer} /> */}
                    </div>
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full border rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-gray-600 text-sm">
                                <tr>
                                    <th className="bg-white text-left px-4 py-3">
                                        <input type="checkbox" />
                                    </th>
                                    <th className="text-left px-4 py-3">Customer Name</th>
                                    <th className="text-left px-4 py-3">Company</th>
                                    <th className="text-left px-4 py-3">Order Value</th>
                                    <th className="text-left px-4 py-3">Order Date</th>
                                    <th className="text-left px-4 py-3">Status</th>
                                    <th className="text-left px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                {currentPageData.map((cust, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="py-1">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="flex items-center px-1 py-1">
                                            <img src={cust.avatar} alt={cust.name} className="w-8 h-8 rounded-full" />
                                            <span className="font-semibold text-gray-800 ms-1">{cust.name}</span>
                                        </td>
                                        <td className="text-start px-1 py-3 text-gray-700">{cust.company}</td>
                                        <td className="px-1 py-3 text-gray-700">{cust.orderValue}</td>
                                        <td className="px-1 py-3 text-gray-700">{cust.orderDate}</td>
                                        <td className="px-1 py-1">
                                            <span
                                                className={`text-xs px-2 py-2 rounded-full ${getStatusColor(cust.status)}`}
                                            >
                                                {cust.status}
                                            </span>
                                        </td>
                                        <td className="px-1 py-1">
                                            <button className="bg-white! border border-2 border-black!" title="Edit" onClick={() => handleCustomerClick(cust)} >✏️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="flex justify-content-center align-items-center gap-2 mt-2">
                        <span className="ms-3 me-auto">Total result: {customers.length}</span>
                        <div className="flex justify-content-center align-items-center gap-2 mt-2">
                            <button className="bg-transparent" onClick={handlePrevPage} disabled={currentPage === firstIndexOfPage}>{"<"}</button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    style={{
                                        backgroundColor: '#f0f6ff',
                                        color: 'black',
                                        ...(currentPage === index + 1 ? {
                                            border: '1px solid blue'

                                        } : {
                                            border: '1px solid #f0f6ff'
                                        })
                                    }} key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-2 py-1 bg-transparent`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button className="bg-transparent" onClick={handleNextPage} disabled={currentPage === totalPages}>{">"}</button>
                        </div>
                    </div> */}

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