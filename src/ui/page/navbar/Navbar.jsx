import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../component/button/common/Button";
import "./Navbar.css";
import { Search } from "../../component/search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarHeight } from "../../redux/slice/generalData/GeneralData";
import { fetch } from "../../redux/thunk/search/search";
import { verifyUser } from "../../redux/thunk/auth/auth";
export const Navbar = () => {
  const [navElements, setNavElements] = useState(["profile", "todo", "chats"]);
  const [searchInput, setSearchInput] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const navbarRef = useRef(null);
  const { todoAddSlice, todoDeleteSlice, todoEditSlice } = useSelector(
    ({ todoAddSlice, todoDeleteSlice, todoEditSlice }) => ({
      todoAddSlice,
      todoDeleteSlice,
      todoEditSlice,
    })
  );
  const { token, login } = useSelector(
    (state) => state?.verification
  );
  useEffect(() => {
    dispatch(verifyUser())
    if(login != null&&login == false){
      localStorage.removeItem("token")
    }
  }, [token,location])
  
  useEffect(() => {
    dispatch(setNavbarHeight(navbarRef.current?.offsetHeight));
  }, [dispatch, navbarRef.current?.offsetHeight]);

  useEffect(() => {
    dispatch(fetch(searchInput));
  }, [
    dispatch,
    searchInput,
    todoAddSlice.status,
    todoDeleteSlice.status,
    todoEditSlice.status,
  ]);

  return (
    <>
      <div className="navbar-container" ref={navbarRef}>
        {navElements.map((data, index) => (
          <Button
            key={index}
            className="navigation-button"
            text={data}
            //action
            action={() => {
              navigate(`/${data}`);
            }}
          />
        ))}
        {location.pathname === "/todo" && (
          <div className="navbar-search">
            <Search onSearchChange={setSearchInput} />
          </div>
        )}
      </div>
    </>
  );
};
