"use client";
import React, { useState } from "react";
import useSWR from "swr"; // Import useSWR

const fetcher = (url) => fetch(url).then((res) => res.json());

const Content = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Use SWR to fetch the data
  const { data: dataa, error } = useSWR('https://a2dadmin.onrender.com/api/enquiry', fetcher);

  // If data is not yet loaded or there was an error
  if (error) return <div>Error loading data</div>;
  if (!dataa) return <div>Loading...</div>;

  const filteredData = dataa.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSort = (key) => {
    const sortedData = [...dataa].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder ? -1 : 1;
      if (a[key] > b[key]) return sortOrder ? 1 : -1;
      return 0;
    });
    setSortOrder(!sortOrder);
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
            {dataa.length > 0 &&
              Object.keys(dataa[0]).map((key) => (
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
