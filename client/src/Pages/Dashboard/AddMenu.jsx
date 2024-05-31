import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaCalendarAlt, FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddMenu = () => {
  const axiosPublic = useAxiosPublic();

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const onSubmit = async (formData) => {
    const data = {
      ...formData,
      menu: selectedTags,
    };
    console.log(data);

    const menuItems = {
      date: data.date,
      menu: data.menu,
    };
    console.log(menuItems);
    try {
      const menuRes = await axiosPublic.post("/menus", menuItems);
      console.log(menuRes.data);
      if (menuRes.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Today's menu is added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
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
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl text-center font-semibold mb-8">Add Menu</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Select Date */}
        <div className="form-control w-full mb-6 relative">
          <label className="label">
            <span className="label-text text-lg">Select Date *</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-500" />
            </span>
            <input
              type="date"
              {...register("date", { required: true })}
              required
              className="input input-bordered w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              min={today} // Disable past dates
            />
          </div>
        </div>

        {/* Tags Input */}
        <div className="form-control w-full mb-6">
          <label className="label">
            <span className="label-text text-lg">Add Menus *</span>
          </label>
          <TagsInput
            value={selectedTags}
            onChange={setSelectedTags}
            placeHolder="Write items and press enter"
            classNames={{
              tagInput:
                "input input-bordered w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500",
              tag: "bg-green-500 text-black px-2 py-1 rounded-md m-1",
              tagInputField: "border-none outline-none",
            }}
          />
          <em className="text-sm text-gray-500">Press enter to add new item</em>
        </div>

        <button
          type="submit"
          className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center mt-4"
        >
          Save Menu <FaUpload className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
