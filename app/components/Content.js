"use client";
import React, { useEffect, useState } from "react";

const Content = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://a2dwebsite.onrender.com/api/enquiry"
        );
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toString().toLowerCase())
    )
  );


  // const handleSort = (key) => {
  //   const sortedData = [...data].sort((a, b) => {
  //     if (a[key] < b[key]) return sortOrder ? -1 : 1;
  //     if (a[key] > b[key]) return sortOrder ? 1 : -1;
  //     return 0;
  //   });
  //   setSortOrder(!sortOrder);
  //   setData(sortedData);
  // };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (isLoading) {
    return <div> <h4 className='text-center pt-3'>Loading...</h4></div>; 
  }

  return (
    <div className="bgColor content w-100">
      <div className="innerContent p-4">
        <div className="innerContentTop mb-4 d-flex justify-content-between align-items-center">
          <h5>Manage User</h5>
          <div className="userCount">
            <h5 className="text-center ps-2 pe-2">{data.length} Enquiries</h5>
          </div>
        </div>
        <div className="tableHeader  d-flex justify-content-between align-items-center p-4">
          <h4>User List</h4>
          <input
            type="text"
            className="searchInput"
            placeholder="Search User by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive " style={{ overflowX: "auto" }}>
          <table className="table table-striped  table-bordered cus-table">
            {data.length === 0 && (
              <h5 className="text-center mt-4">No users</h5>
            )}
            {data.length > 0 && (
              <>
                <thead>
                  <tr>
                    <th style={{ color: "rgba(81, 81, 81)" }}>No.</th>
                    {Object.keys(data[0])
                      .filter((key) => key !== "__v" && key !== "_id")
                      .map((key) => (
                        <th
                          key={key}
                          onClick={() => handleSort(key)}
                          style={{ color: "rgba(81, 81, 81)" }}
                        >
                          {key.toUpperCase()}
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((item, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstRow + index + 1}</td>
                      {Object.entries(item)
                        .filter(([key]) => key !== "__v" && key !== "_id")
                        .map(([key, val], idx) => (
                          <td key={idx}>
                            {key === "createdAt" || key === "updatedAt"
                              ? new Date(val).toISOString().split("T")[0]
                              : val}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>

        {/* Pagination */}
        {data.length !== 0 && (
          <nav className="d-flex mt-2 w-100 justify-content-center">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                >
                  First
                </button>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(number)}
                    className="page-link"
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === pageNumbers.length}
                >
                  Next
                </button>
              </li>
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(pageNumbers.length)}
                  disabled={currentPage === pageNumbers.length}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Content;

