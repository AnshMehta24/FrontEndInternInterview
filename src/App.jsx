import Header from "./components/Header";
import CustomerTable from "./components/CustomerTable";
import { useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
  const [modalVisiblity, setModalVisibility] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const ToggleModal = () => {
    setModalVisibility((prev) => !prev);
    setRefresh((prev) => !prev); // Refresh the page after updation
    // console.log(currentItem);
  };

  const ToggleModalForAdding = () => {
    setCurrentItem([]);
    ToggleModal();
  };

  const ToggleModalForUpdation = (item) => {
    setCurrentItem(item);
    ToggleModal();
  };

  const deleteTheData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/posts/${id}`);
      console.log("Data Deleted:", response.data);
    } catch (error) {
      console.error("Error occurred while updating data:", error);
    }
  };
  const ToggleModalForDeletion = (item) => {
    deleteTheData(item.id);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Header
        ToggleModalForAdding={ToggleModalForAdding}
        setSearchTerm={setSearchTerm}
      />

      {modalVisiblity ? (
        <Modal ToggleModal={ToggleModal} currentItem={currentItem} />
      ) : (
        ""
      )}

      <CustomerTable
        ToggleModal={ToggleModal}
        ToggleModalForUpdation={ToggleModalForUpdation}
        ToggleModalForDeletion={ToggleModalForDeletion}
        refresh={refresh}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default App;
