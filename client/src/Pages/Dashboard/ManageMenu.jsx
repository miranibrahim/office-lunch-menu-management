import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageMenu = () => {
  const axiosPublic = useAxiosPublic();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [menuData, setMenuData] = useState([]);

  const handleSearch = async () => {
    console.log(startDate);
    console.log(endDate);
    try {
      const response = await axiosPublic.get(
        `/menus?start=${startDate.toLocaleDateString()}&end=${endDate.toLocaleDateString()}`
      );
      console.log(response.data.data);
      setMenuData(response.data.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const handleDelete = async (date) => {
    console.log(date);
    const swalRes = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (swalRes.isConfirmed) {
      const res = await axiosPublic.delete(`/menus/${date}`);
      console.log(res.data);
      if (res.data) {
        handleSearch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${date}'s menu has been deleted`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getNextDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  };

  const isPastDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date < today;
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl text-center font-semibold mb-8">Manage Menu</h2>
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

      {menuData.length > 0 ? (
        <div className="overflow-x-auto mt-10">
          <table className="table table-lg">
            <thead className="text-center">
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Serial</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2">Total Item</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {menuData.map((menu, index) => {
                const nextDay = getNextDay(menu.date);
                return (
                  <tr key={menu.date}>
                    <td>{index + 1}</td>
                    <td>{formatDate(menu.date)}</td>
                    <td className="text-left">
                      {menu.menu.map((item, idx) => (
                        <p key={item}>
                          {idx + 1}. {item}
                        </p>
                      ))}
                    </td>
                    <td>{menu.menu.length}</td>
                    <td>
                      <Link to={`/dashboard/updateMenu/${nextDay}`}>
                        <button
                          className="btn btn-info btn-xs"
                          disabled={isPastDate(nextDay)}
                        >
                          Update
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(nextDay)}
                        className="btn btn-error btn-xs text-white font-semibold"
                      >
                        Delete
                      </button>
                    </td>
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

export default ManageMenu;
