import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { FaEye } from "react-icons/fa6";
const Calls = () => {
  const navigate = useNavigate();
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <FaEye
          className="font-size-20 text-theme btn-action-items"
          onClick={handleRedirect}
        />
      ),
    },
  ];
  const data = [
    {
      id: 1,
      name: "raj",
      email: "raj@gmail.com",
      mobile: "5483336262",
    },
    {
      id: 2,
      name: "jay",
      email: "jay@gmail.com",
      mobile: "5483336262",
    },
    {
      id: 3,
      name: "krunal",
      email: "krunal@gmail.com",
      mobile: "5483336262",
    },
  ];
  const [records, setRecords] = useState(data);
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  const handleRedirect = () => {
    navigate("/call-details");
  };
  return (
    <>
      <div className="mt-3 card theme-foreground card-calls">
        <div className="card-body">
          <div className="tab-content" id="pills-tabContent">
            <div className="row pb-3">
              <div className="col-sm-8 d-flex justify-content-end">
                <ul
                  className="nav nav-pills mb-2"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <LuPhoneCall />
                      <span className="ps-2">All Calls</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <HiOutlinePhoneMissedCall />
                      <span className="ps-2">Failed Calls</span>
                    </button>
                  </li>
                </ul>
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

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex="0"
              >
                <DataTable
                  columns={columns}
                  data={records}
                  fixedHeader
                  pagination
                ></DataTable>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex="0"
              >
                empty
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calls;