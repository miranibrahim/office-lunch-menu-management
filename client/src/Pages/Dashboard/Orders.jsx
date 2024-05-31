import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Orders = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [orderData, setOrderData] = useState([]);
    const axiosPublic = useAxiosPublic();

    const handleSearch = async () => {
        console.log(startDate);
        console.log(endDate);
        try {
            const response = await axiosPublic.get(
                `/orders?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
            );
            const res = response.data.data;
            console.log(res);
            setOrderData(res);
            console.log(orderData);
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl text-center font-semibold mb-8">Orders</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
                <div className="flex items-center">
                    <p className="w-1/2 text-center">From</p>
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="input input-bordered pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-44"
                            placeholderText="Start Date"
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="w-1/2 text-center">To</p>
                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="input input-bordered pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-44"
                            placeholderText="End Date"
                        />
                    </div>
                </div>
                <div className="mx-auto">
                    <button
                        onClick={handleSearch}
                        className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                    >
                        Search <FaSearch className="ml-2" />
                    </button>
                </div>
            </div>

            {orderData.length > 0 ? (
                <div className="overflow-x-auto mt-10">
                    <table className="table table-lg">
                        <thead className="text-center">
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Serial</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Order Items</th>
                                <th className="px-4 py-2">Total Item</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {orderData.map((order, index) => {
                                // Check if menu is defined and is an array
                                const orderItems = Array.isArray(order.menu) ? order.menu : [];
                                return (
                                    <tr key={order.date}>
                                        <td>{index + 1}</td>
                                        <td>{order.email}</td>
                                        <td className="text-left">
                                            {orderItems.map((item, idx) => (
                                                <p key={item}>
                                                    {idx + 1}. {item}
                                                </p>
                                            ))}
                                        </td>
                                        <td>{orderItems.length}</td>
                                        <td>{formatDate(order.date)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    No menu items found for the selected date range.
                </div>
            )}
        </div>
    );
};

export default Orders;
