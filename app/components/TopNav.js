 'use client'
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const TopNav = () => {
  const [toggle, setToggle] = useState(false);

  const LogOutPop = ({ signOut, handleClose }) => {
    return (
      <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log Out</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to log out?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={signOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const { data: session } = useSession();

  const handleLogout = () => {
    setToggle(!toggle);
  };

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <>
      <div className="topNav d-flex justify-content-between align-items-center ps-4 pe-4 pt-2 pb-2">
        <h3 className="gray-text">Admin</h3>
        <div className="d-flex align-items-center gap-2">
          <b>{session?.user?.adminName}</b>

          <button onClick={handleLogout} className="btn btn-danger ps-3 pe-3">
            Log Out
          </button>
        </div>
      </div>

      {toggle && <LogOutPop signOut={signOut} handleClose={handleClose} />}
    </>
  );
};

export default TopNav;



// import React from "react";
// import { signOut, useSession } from "next-auth/react";
// import { useState } from "react";
// const TopNav = () => {
//   const [toggle,setToggle] = useState(false)
//   const LogOutPop = ({signOut}) => {
    
//     return (
//       <>
//       {/* Button to trigger modal */}
//       {/* <button
//         type="button"
//         className="btn btn-primary"
//         data-toggle="modal"
//         data-target="#logoutModal"
//       >
//         Open Logout Popup
//       </button> */}

//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="logoutModal"
//         tabIndex="-1"
//         aria-labelledby="logoutModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="logoutModalLabel">
//                 Log Out
//               </h5>
//               <button
//                 type="button"
//                 className="close"
//                 data-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               Are you sure you want to log out?
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-dismiss="modal"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={signOut}
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>    );
//   };
//   const { data: session } = useSession();
//   const handleLogout = () => {
//     setToggle(!toggle)
   
//   }
//   return (
//     <>
//       <div className="topNav d-flex justify-content-between align-items-center ps-4 pe-4 pt-2 pb-2">
//         <h3 className="gray-text">Admin</h3>
//         <div className=" d-flex align-items-center gap-2 ">
//           <b>{session?.user?.adminName}</b>

//           <button
//             onClick={handleLogout}
//             className="btn btn-danger  ps-3 pe-3"
//           >
//             LogOut
//           </button>
//         </div>
//       </div>
//       {toggle && <LogOutPop signOut={signOut}/>}
//     </>
//   );
// };

// export default TopNav;
