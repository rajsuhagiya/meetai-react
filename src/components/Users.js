import React, { useContext, useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { HiOutlineUserAdd } from "react-icons/hi";
import userContext from "../context/Users/UserContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddUser from "./AddUser";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import { EditUserSchema } from "../schemas";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";

// or via CommonJS
// const Swal = require("sweetalert2");

const Users = () => {
  const { individualUsersData, getIndividualUser, deleteUser, updateUser } =
    useContext(userContext);
  const refClose = useRef(null);
  const [swalProps, setSwalProps] = useState({});
  const [records, setRecords] = useState(individualUsersData);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const individualUsersColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    // { name: "Status", selector: (row) => row.status},
    { name: "Status", cell: (row) => <>hh</> },
    { name: "Type", selector: (row) => row.type, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <>
          <TbEdit
            className="font-size-20 text-theme btn-action-items"
            data-toggle="modal"
            data-target="#editUserModel"
            alt="model"
            onClick={() => handleEdit(row)}
          />
          <MdDelete
            className="font-size-20 text-theme btn-action-items"
            onClick={() => handleDelete(row.id)}
          />
        </>
      ),
    },
  ];
  const handleEdit = (current) => {
    setEditData({
      id: current.id,
      name: current.name,
      email: current.email,
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "linear-gradient(to right, #5670e1, #a72ee7) ",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        deleteUser(id);
      }
    });
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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: editData,
      validationSchema: EditUserSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const req = await updateUser(values.id, values.name, values.email);
        if (req.status === 200) {
          refClose.current.click();
          action.resetForm();
        }
      },
    });
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
      <div
        className="modal fade text-dark"
        id="editUserModel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editUserModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="addUserModelLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="close border-0 bg-transparent"
                data-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              >
                <IoClose className="font-size-20" />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <small className="form-text text-danger">
                      {errors.name}
                    </small>
                  ) : null}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <small className="form-text text-danger">
                      {errors.email}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-theme"
                >
                  Edit User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
