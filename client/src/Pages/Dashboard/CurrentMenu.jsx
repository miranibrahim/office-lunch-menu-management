import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';


const CurrentMenu = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [menu, setMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axiosPublic.get(`/menus/${currentDate}`);
                console.log(response.data.data);
                setMenu(response.data.data.menu);
            } catch (error) {
                console.error('Error fetching the menu:', error);
            }
        };

        fetchMenu();
    }, [axiosPublic, currentDate]);

    const handleCheckboxChange = (item) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(item)
                ? prevSelected.filter((i) => i !== item)
                : [...prevSelected, item]
        );
    };

    const handleSubmit = async () => {
        const order = {
            email: user.email,
            choice: selectedItems,
            date: currentDate,
        };
        console.log(order);
        try {
            const orderRes = await axiosPublic.post('/orders', order);
            console.log(orderRes.data);
            if (orderRes.data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Today's menu is added.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Already added menu on this date.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {/*  eslint-disable-next-line react/no-unescaped-entities */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Today's Menu</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <ul className="space-y-4">
                    {menu.map((item) => (
                        <li key={item} className="flex items-center">
                            <label className="flex items-center text-lg text-gray-700">
                                <input
                                    type="checkbox"
                                    value={item}
                                    onChange={() => handleCheckboxChange(item)}
                                    className="mr-2 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                {item}
                            </label>
                        </li>
                    ))}
                </ul>
                <button
                    type="submit"
                    className="mt-6 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                >
                    Place Order
                </button>
            </form>
        </div>
    );

};

export default CurrentMenu;
