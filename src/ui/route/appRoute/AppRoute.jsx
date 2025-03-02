// import React, { useEffect, useState } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import { Navbar } from "../../page/navbar/Navbar";
// import { Profile } from "../../page/profile/Profile";
// import { Todo } from "../../page/todo/Todo";
// import { Login } from "../../page/login/Login";
// import { PrivateRoute } from "../privateRoute/PrivateRoute";

// export const AppRoute = () => {
//   const [userLoged, setUserLoged] = useState();
//   const location = useLocation();
//   useEffect(() => {
//     setUserLoged(
//       JSON.parse(localStorage.getItem("token")) !== null || undefined
//         ? true
//         : false
//     );
//   }, [location]);

//   return (
//     <>
//       {(userLoged && (
//         <>
//           <Navbar />
//           <Routes>
//             <Route path="/profile" element={<PrivateRoute />}>
//               <Route path="/profile" element={<Profile />}></Route>
//             </Route>
//             <Route path="/todo" element={<PrivateRoute />}>
//               <Route path="/todo" element={<Todo />}></Route>
//             </Route>
//             <Route path="/login" element={<Login />}></Route>
//           </Routes>
//         </>
//       )) || (
//         <Routes>
//           <Route path="/" element={<Login />}></Route>
//           <Route path="/login" element={<Login />}></Route>
//           <Route path="/todo" element={<Login />}></Route>
//           <Route path="/profile" element={<Login />}></Route>
//         </Routes>
//       )}
//     </>
//   );
// };

import React, { lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../../page/navbar/Navbar";
import { Profile } from "../../page/profile/Profile";
import { Todo } from "../../page/todo/Todo";
import { Login } from "../../page/login/Login";
import { PrivateRoute } from "../privateRoute/PrivateRoute";
import { Chat } from "../../page/chats/Chat";
import { useSelector } from "react-redux";

export const AppRoute = () => {
  const { callingLoginComponent } = useSelector((state) => state.generaldata);
  const [userLoged, setUserLoged] = useState();
  const location = useLocation();
  useEffect(() => {
    setUserLoged(
      JSON.parse(localStorage.getItem("token")) !== null || undefined
        ? true
        : false
    );
  }, [location]);

  return (
    <>
      {userLoged && location.pathname !== "/login" && <Navbar />}

      <Routes>
      <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Profile />}></Route>
        </Route>

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/todo" element={<PrivateRoute />}>
          <Route path="/todo" element={<Todo />}></Route>
        </Route>

        <Route path="/chats" element={<PrivateRoute />}>
          <Route path="/chats" element={<Chat />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};
