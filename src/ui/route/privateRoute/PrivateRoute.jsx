// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useApi } from "../../hooks/apiHooks";
// import { Login } from "../../page/login/Login";

// export const PrivateRoute = () => {
//   const [authanticate, setAuthanticate] = useState();
//   const token = JSON.parse(localStorage.getItem("token"));
//   useEffect(() => {
//     (async () => {
//       if (authanticate == null) {
//         const status = await varifyToken();
//         setAuthanticate(status);
//       }
//     })();
//   }, [token]);

//   const varifyToken = async () => {
//     try {
//       if (!token) {
//         return false;
//       }
//       const response = await useApi("auth", "post", "login", {
//         body: token,
//       });
//       return response.success;
//     } catch (error) {
//       return false;
//     }
//   };
//   return (
//     <>
//       {authanticate ? <Outlet /> : <Login />}
//     </>
//   );
// };

// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useApi } from "../../hooks/apiHooks";
// import { Login } from "../../page/login/Login";

// export const PrivateRoute = () => {
//   const [authanticate, setAuthanticate] = useState();
//   const token = JSON.parse(localStorage.getItem("token"));
//   useEffect(() => {
//     (async () => {
//       if (authanticate == null) {
//         const status = await varifyToken();
//         setAuthanticate(status);
//       }
//     })();
//   }, [token]);

//   const varifyToken = async () => {
//     try {
//       if (!token) {
//         return false;
//       }
//       const response = await useApi("auth", "post", "login", {
//         body: token,
//       });
//       return response.success;
//     } catch (error) {
//       return false;
//     }
//   };

//   return <>{authanticate ? <Outlet /> : <Login />}</>;
// };





import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/apiHooks";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAuthenticate(false);
        return;
      }
      try {
        const response = await useApi("auth", "post", "login", {
          body: token,
        });
        setAuthenticate(response.success);
      } catch (error) {
        setAuthenticate(false);
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (authenticate === false) {
      navigate("/login"); 
    }
  }, [authenticate]);

  if (authenticate === true) {
    return <Outlet />;
  }  
};
