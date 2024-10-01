"use client";
import React, { useEffect, useState } from "react";

const Content = () => {
  const [data, setData] = useState([]); 
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage] = useState(5);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://a2dwebsite.onrender.com/api/enquiry");
        const result = await response.json();
        setData(result); 
        console.log(await result,"dataaaaa")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSort = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder ? -1 : 1;
      if (a[key] > b[key]) return sortOrder ? 1 : -1;
      return 0;
    });
    setSortOrder(!sortOrder); 
    setData(sortedData);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-4">
      <h2>Dynamic Table with Pagination</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key.toUpperCase()}
                  <button className="btn btn-sm btn-light ms-2">
                    {sortOrder ? "▲" : "▼"}
                  </button>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Content;
