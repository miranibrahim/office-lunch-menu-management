import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const PreviousOrders = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosPublic.get(`/orders/${user?.email}`);
                console.log(response);
                setOrders(response.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [axiosPublic, user]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Previous Orders</h1>
            {orders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Choices</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.order_id}>
                                    <td className="border px-4 py-2">{formatDate(order.date)}</td>
                                    <td className="border px-4 py-2">{order.choice.join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No previous orders found</p>
            )}
        </div>
    );
};

export default PreviousOrders;
