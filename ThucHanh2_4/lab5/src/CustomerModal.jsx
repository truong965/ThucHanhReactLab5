import React, { useEffect, useState } from 'react';
// const [preview, setPreview] = useState < string | null > (null);


// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     setPreview(URL.createObjectURL(file));
//   }
// };

{/* Image Upload */ }
{/* <div> */ }
{/* <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500"
                /> */}
{/* {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div> */}

{/* Name Input */ }
const CustomerModal = ({ isOpen, onClose, onSubmit, data }) => {
  const [formData, setFormData] = useState(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the string to a Date object
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and ensure 2-digit format
    const year = date.getFullYear(); // Get the year
    return `${day}/${month}/${year}`; // Format as dd/MM/yyyy
  };
  const handleSubmit = () => {
    formData.orderDate = formatDate(formData.orderDate); // Format the date before submission
    formData.avatar = '../src/FEData/Avatar (1).png'; // Set a default avatar image
    onSubmit(formData); // Gửi dữ liệu về component cha
    onClose();           // Đóng modal
    setFormData({        // Reset form (tùy chọn)
      name: "",
      company: "",
      orderValue: "",
      orderDate: "",
      status: "New",
    });
  };
  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return ''; // Return an empty string if the dateString is undefined or falsy

    const [day, month, year] = dateString.split('/'); // Split the string by "/"

    if (!day || !month || !year) return ''; // Check if the split operation worked correctly

    const formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0]; // Convert to "yyyy-MM-dd"
    return formattedDate;
  };


  useEffect(() => {
    if (data) {
      data.orderDate = convertToDateInputFormat(data.orderDate); // Convert the date format for the input field
      setFormData(data); // Set the form data when the modal opens
    }
    console.log("Form data updated:", data); // Log the updated form data
  }
    , [data, isOpen]); // Update when data or isOpen changes
  return (
    <div className="p-4">
      {
        isOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="m-3 text-x font-semibold">Customer Information</h2>
              <button
                style={{ backgroundColor: 'white' }}
                onClick={onClose}
                className='text-red-500 hover:text-red-700 rounded-full p-2'
                type='button'>
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {/* Name */}
              <div className="flex flex-col items-start mx-3">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="Enter name"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col items-start mx-3">
                <label className="text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="Enter company"
                />
              </div>

              {/* Order Value */}
              <div className="flex flex-col items-start mx-3">
                <label className="text-sm font-medium text-gray-700">Order Value</label>
                <input
                  type="number"
                  name="orderValue"
                  value={formData.orderValue}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="Enter order value"
                />
              </div>

              {/* Order Date */}
              <div className="flex flex-col items-start mx-3">
                <label className="text-sm font-medium text-gray-700">Order Date</label>
                <input
                  type="date"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col items-start mx-3">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white py-2 rounded bg-blue-500 hover:bg-blue-600 mt-4">
                Save Customer
              </button>
            </div>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default CustomerModal;