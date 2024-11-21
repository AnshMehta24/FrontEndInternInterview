import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const CustomerTable = ({
  ToggleModalForUpdation,
  ToggleModalForDeletion,
  refresh,
  searchTerm,
}) => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [sortKey, setSortKey] = useState(null);

  // Filter data based on search term
  const filteredData = customerDetails.filter((item) => {
    return (
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.likes.toString().includes(searchTerm) ||
      item.comments.toString().includes(searchTerm)
    );
  });

  useEffect(() => {
    // Fetching Data from data.json
    async function fetchData() {
      const details = await axios.get("http://localhost:3000/posts");

      // console.log(details.data);

      setCustomerDetails(details.data);
    }

    fetchData();
  }, [refresh]);

  // Handle Sorting
  const handleSort = (key) => {
    setSortKey((prevKey) => (prevKey === key ? null : key)); // Toggle sorting
  };

  // Apply Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortKey) {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "string") {
        // Sort alphabetically for strings
        return bValue.localeCompare(aValue);
      } else if (typeof aValue === "number") {
        // Sort numerically for numbers
        return bValue - aValue;
      }
    }
    return 0; 
  });

  return (
    <>
      {customerDetails && customerDetails.length > 0 ? (
        <table className=" w-full mt-5 ">
          <thead className="w-full text-[3vw] lg:text-[1.6vw] ">
            <tr className="">
              <th className="p-2" onClick={() => handleSort("author")}>
                Autor
              </th>
              <th className="p-2" >ID</th>
              <th className="p-2" onClick={() => handleSort("title")}>
                Title
              </th>
              <th className="p-2" onClick={() => handleSort("createdAt")}>Date</th>
              <th className="p-2" onClick={() => handleSort("likes")}>
                Likes
              </th>
              <th className="p-2" onClick={() => handleSort("comments")}>
                Comments
              </th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="w-full text-[3vw] lg:text-[1.3vw]">
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-sky-100" : "bg-white"
                } h-[7vh]`}
              >
                {/* {console.log(item)} */}
                <td className="p-2 text-center">{item.author}</td>
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2 text-center">{item.title}</td>
                <td className="p-2 text-center">{item.createdAt}</td>
                <td className="p-2 text-center">{item.likes}</td>
                <td className="p-2 text-center">{item.comments}</td>
                <td className="p-2 text-center">
                  <button
                    className="bg-blue-400 p-1 rounded-sm"
                    onClick={() => ToggleModalForUpdation(item)}
                  >
                    i1
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="bg-red-400 p-1 rounded-sm"
                    onClick={() => ToggleModalForDeletion(item)}
                  >
                    i2
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Loading Data</h1>
      )}
    </>
  );
};

export default CustomerTable;
