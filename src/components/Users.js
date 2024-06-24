import React, { useContext, useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { HiOutlineUserAdd } from "react-icons/hi";
import userContext from "../context/Users/UserContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddUser from "./AddUser";

const Users = () => {
  const { individualUsersData, getIndividualUser, deleteUser } =
    useContext(userContext);

  const [records, setRecords] = useState(individualUsersData);
  const individualUsersColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Type", selector: (row) => row.type, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <>
          <MdEdit
            className="font-size-20 text-theme btn-action-items"
            onClick={() => handleEdit(row.id)}
          />
          <MdDelete
            className="font-size-20 text-theme btn-action-items"
            onClick={() => deleteUser(row.id)}
          />
        </>
      ),
    },
  ];
  const handleEdit = (id) => {
    console.log(id);
  };

  const handleFilter = (e) => {
    const newData = individualUsersData.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await getIndividualUser();
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    if (individualUsersData) {
      setRecords(individualUsersData);
    }
  }, [individualUsersData]);
  return (
    <>
      <div className="mt-3 card theme-foreground card-settings">
        <div className="card-body">
          <div className="tab-content" id="pills-tabContent">
            <div className="row pb-3">
              <div className="col-sm-8 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-theme d-flex align-items-center"
                  data-toggle="modal"
                  data-target="#addUserModel"
                >
                  <HiOutlineUserAdd />
                  <span className="ps-2">Add User</span>
                </button>
                <AddUser />
              </div>
              <div className="col-sm-4">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleFilter}
                  />
                </form>
              </div>
            </div>
            <DataTable
              columns={individualUsersColumns}
              data={records}
              fixedHeader
              pagination
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
