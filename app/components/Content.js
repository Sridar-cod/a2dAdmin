// "use client";
// import React, { useEffect, useState } from "react";

// const Content = ({ navWidth }) => {
//   const [data, setData] = useState([]);

//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(5);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://a2dwebsite.onrender.com/api/enquiry"
//         );
//         const result = await response.json();
//         setData(result);
//         console.log(await result, "dataaaaa");
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredData = data.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toString().toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   const handleSort = (key) => {
//     const sortedData = [...data].sort((a, b) => {
//       if (a[key] < b[key]) return sortOrder ? -1 : 1;
//       if (a[key] > b[key]) return sortOrder ? 1 : -1;
//       return 0;
//     });
//     setSortOrder(!sortOrder);
//     setData(sortedData);
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div
//       className="bgColor content w-100"
//       // style={{ width: navWidth ? "85vw" : "95vw" }}
//     >
//       <div className="innerContent m-4">
//         <div className="innerContentTop mb-4 d-flex justify-content-between align-items-center">
//           <h5>Manage User</h5>
//           {/* <button className="filterButton">Filter</button> */}
//           <div className="filterButton">
//             <h5 className='text-center'>{data.length} Enquires
//             </h5>
//           </div>
//         </div>
//         <div className="tableHeader  d-flex justify-content-between align-items-center p-4">
//           <h4>User List</h4>

//           <input
//             type="text"
//             className="searchInput"
//             placeholder="Search User"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="table-responsive " style={{ overflowX: "auto" }}>
//           <table className="table table-stripe table-bordered">
//             {data.length==0 && <h5 className='text-center mt-4'>No users</h5>}
//             <thead>
//               <tr>
//                 {data.length !== 0 &&
//                   <th style={{ color: "rgba(81, 81, 81)" }}>No.</th>}
//                 {data.length > 0 &&
//                   Object.keys(data[0])
//                     .filter((key) => key !== "__v" && key !== "_id")
//                     .map((key) => (
//                       <th
//                         key={key}
//                         onClick={() => handleSort(key)}
//                         style={{ color: "rgba(81, 81, 81)" }}
//                       >
//                         {key.toUpperCase()}
//                         {/* <div className="btn btn-sm ms-2">
//                           {sortOrder ? (
//                             <svg
//                               width="20px"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 576 512"
//                             >
//                               <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3 96 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-301.7 32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-224 0z" />
//                             </svg>
//                           ) : (
//                             <svg
//                               width="20px"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 576 512"
//                             >
//                               <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 301.7 32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 96z" />
//                             </svg>
//                           )}
//                         </div> */}
//                       </th>
//                     ))}
//               </tr>
//             </thead>

//             <tbody>
//               {currentRows.map((item, index) => (
//                 <tr key={index}>
//                   <td>{indexOfFirstRow + index + 1}</td>
//                   {Object.entries(item)
//                     .filter(
//                       ([key]) => key !== "__v" && key !== "_id"
//                       // key !== "createdAt" &&
//                       // key !== "updatedAt"
//                     )
//                     .map(([key, val], idx) => (
//                       <td key={idx}>
//                         {key === "createdAt" || key === "updatedAt"
//                           ? new Date(val).toISOString().split("T")[0]
//                           : val}
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {data.length !== 0 &&
//           <nav className="d-flex mt-2 w-100 justify-content-center">
//             <ul className="pagination">
//               <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => paginate(1)}
//                   disabled={currentPage === 1}
//                 >
//                   First
//                 </button>
//               </li>
//               <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                 <button
//                   className="page-link"
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   <svg
//                     width={"20px"}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                   >
//                     <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3l0 41.7 0 41.7L459.5 440.6zM256 352l0-96 0-128 0-32c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-64z" />
//                   </svg>
//                 </button>
//               </li>
//               {pageNumbers.map((number) => (
//                 <li
//                   key={number}
//                   className={`page-item ${currentPage === number ? "active" : ""
//                     }`}
//                 >
//                   <button onClick={() => paginate(number)} className="page-link">
//                     {number}
//                   </button>
//                 </li>
//               ))}
//               <li
//                 className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""
//                   }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === pageNumbers.length}
//                 >
//                   <svg
//                     width={"20px"}
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                   >
//                     <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z" />
//                   </svg>
//                 </button>
//               </li>
//               <li
//                 className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""
//                   }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => paginate(pageNumbers.length)}
//                   disabled={currentPage === pageNumbers.length}
//                 >
//                   Last
//                 </button>
//               </li>
//             </ul>
//           </nav>}
//       </div>
//     </div>
//   );
// };

// export default Content;
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

  if (isLoading) {
    return <div> <h4 className='text-certer'>Loading...</h4></div>; 
  }

  return (
    <div className="bgColor content w-100">
      <div className="innerContent m-4">
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
            placeholder="Search User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table className="table table-striped table-bordered">
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

