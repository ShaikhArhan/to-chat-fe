import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import { Button } from "../../component/button/common/Button";
import { Checkbox } from "../../component/checkbox/Checkbox";
import { Textarea } from "../../component/input/textarea/Textarea";
import edit_icon from "../../assets/image/edit_icon.png";
import trash_icon from "../../assets/image/trash_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { add, deleted, edit, fetch } from "../../redux/thunk/todo/todo";
import { Popup } from "../../component/popup/Popup";

export const Todo = () => {
  const [actionIcon] = useState([edit_icon, trash_icon]);
  const [showPopup, setShowPopup] = useState({
    addTodo: { display: false },
    editTodo: {
      editTodoId: null,
      text: "",
      display: false,
    },
    textarea: {
      textareaTodoId: null,
      display: false,
    },
  });
  const [todoText, setTodoText] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const todoContainerRef = useRef(null);
  const userId = JSON.parse(localStorage.getItem("token"))?._id;

  const {
    generaldata,
    searchFetchSlice,
    todoFetchSlice,
    todoAddSlice,
    todoDeleteSlice,
    todoEditSlice,
  } = useSelector(
    ({
      generaldata,
      searchFetchSlice,
      todoFetchSlice,
      todoAddSlice,
      todoDeleteSlice,
      todoEditSlice,
    }) => ({
      generaldata,
      searchFetchSlice,
      todoFetchSlice,
      todoAddSlice,
      todoDeleteSlice,
      todoEditSlice,
    })
  );
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    dispatch(fetch(userId));
  }, [dispatch]);

  // Update todo list when data changes
  useEffect(() => {
    if (searchFetchSlice.searchDataFetch) {
      setTodoList(searchFetchSlice.searchDataFetch);
    } else {
      setTodoList(todoFetchSlice.todoDataFetch);
    }
  }, [todoFetchSlice.todoDataFetch, searchFetchSlice.searchDataFetch]);

  // Update todo list when add, delete, or edit actions are performed
  useEffect(() => {
    dispatch(fetch(userId));
  }, [
    todoAddSlice.status,
    todoDeleteSlice.status,
    todoEditSlice.status,
    dispatch,
  ]);

  useEffect(() => {
    if (generaldata.navbarHeight !== null) {      
      todoContainerRef.current.style.height = `${
        window.innerHeight - generaldata.navbarHeight - 40
      }px`;
    }
    console.log('window.innerHeight: ', window.innerHeight);
  }, [generaldata.navbarHeight]);

  useEffect(() => {
    setTodoText(showPopup.editTodo.text);
  }, [showPopup.editTodo.text]);

  const todoAdd = (message) => {
    // dispatch(add({ message: message.trim() }));
    // const id = JSON.parse(localStorage.getItem("token"))?._id;
    if (userId) {
      dispatch(add({ userId: userId, message: message.trim() }));
    } else {
      alert("Please login to add todo");
    }
  };

  const todoEdit = (data) => {
    dispatch(edit(data));
  };

  const todoDelete = (id) => {
    dispatch(deleted(id));
  };

  const todoToggleCheckbox = (e) => {
    e.target.checked = e.target.checked;
  };

  return (
    <div className="todo-container" ref={todoContainerRef}>
      <div className="todo-list">
        {console.log("todoList: ", todoList)}
        {todoList?.map((data, todoIndex) => (
          <div key={todoIndex} className="todo-form">
            <Checkbox
              width="1rem"
              accentColor="#000000"
              margin="0% 0% 0% 1%"
              cursor="pointer"
              left="0%"
              zIndex={"4"}
              checked={data.checked}
              action={() => {
                todoToggleCheckbox;
                todoEdit({
                  id: data.id,
                  checked: !data.checked,
                  message: data.message,
                });
              }}
            />
            <Textarea
              textCarry={data.message}
              className="textarea-variant-1 textarea-focus"
              focusborder="2px solid yellowgreen"
              readOnly={true}
              placeholder="no message loaded ..."
              textDecoration={data.checked ? "line-through" : null}
              action={() =>
                setShowPopup((prevData) => ({
                  ...prevData,
                  textarea: {
                    textareaTodoId: data.id,
                    display: true,
                  },
                }))
              }
            />
            {showPopup.textarea.display &&
              showPopup.textarea.textareaTodoId == data.id &&
              !showPopup.addTodo.display &&
              !showPopup.editTodo.display && (
                <div className="textareaPopup">
                  <Button
                    text="🗙"
                    className="close-button"
                    action={() => {
                      setShowPopup((prevData) => ({
                        ...prevData,
                        textarea: {
                          display: false,
                        },
                      }));
                    }}
                  />

                  <Textarea
                    textCarry={data.message}
                    className="textarea-variant-2"
                    focusborder="none"
                    readOnly={true}
                    placeholder="no message loaded ..."
                    textDecoration={data.checked ? "line-through" : null}
                    action={() =>
                      setShowPopup((prevData) => ({
                        ...prevData,
                        textarea: {
                          textareaTodoId: data.id,
                          display: true,
                        },
                      }))
                    }
                  />
                </div>
              )}
            {actionIcon.map((icon, indexIcon) => (
              <Button
                text=" "
                key={indexIcon}
                className={`icon-button ${
                  icon === trash_icon ? "trash" : "edit"
                }`}
                backgroundImage={icon}
                action={() => {
                  if (icon === trash_icon) {
                    todoDelete(data.id);
                    setShowPopup((prevData) => ({
                      ...prevData,
                      textarea: {
                        display: false,
                      },
                    }));
                  } else if (icon === edit_icon) {
                    setShowPopup((prevData) => ({
                      ...prevData,
                      editTodo: {
                        editTodoId: data.id,
                        text: data.message,
                        display: true,
                      },
                    }));
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <Button
        text="+"
        className={`add-button ${
          buttonClicked ? "rotating-border-onclicked" : "rotating-border"
        }`}
        enableRotateBorder={true}
        enableClickedAnimation={buttonClicked}
        //action
        action={() => {
          setButtonClicked(true);
          showPopup.addTodo.display = true;
          setShowPopup((prevData) => ({
            ...prevData,
            addTodo: {
              display: true,
            },
          }));
        }}
      />

      {/* popups */}

      {/* add popup */}
      {showPopup.addTodo.display && (
        <Popup
          content={
            <div className="prop-content-style-1">
              <h3>new to-do </h3>
              <Textarea
                setText={setTodoText}
                textCarry={todoText}
                className="textarea-variant-3"
                placeholder="Write to-do message ..."
              />
              <Button
                text="🗙"
                className="close-button"
                action={() => {
                  setButtonClicked(false);
                  setTodoText("");
                  setShowPopup((prevData) => ({
                    ...prevData,
                    addTodo: {
                      display: false,
                    },
                  }));
                }}
              />
              <div>
                <Button
                  className="todo-button"
                  text="To-Do !!!"
                  disable={!todoText}
                  action={() => {
                    todoAdd(todoText);
                    setTodoText("");
                    setShowPopup((prevData) => ({
                      ...prevData,
                      addTodo: {
                        display: false,
                      },
                    }));
                    setButtonClicked(false);
                  }}
                />
                <Button
                  className="clear-text-button"
                  text="Clear Text"
                  disable={!todoText}
                  action={() => {
                    setTodoText("");
                  }}
                />
              </div>
            </div>
          }
          style={{
            "--width": "500px",
            "--height": "400px",
            "--display": "flex",
            "--flexDirection": "column",
            "--position": "relative",
            "--backgroundColor": "white",
            "--padding": "0px",
            "--borderRadius": "10px",
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
      {/* edit popup */}
      {showPopup.editTodo.display && (
        <Popup
          content={
            <div className="prop-content-style-1">
              <h3>edit to-do </h3>
              <Textarea
                setText={setTodoText}
                textCarry={todoText}
                className="textarea-variant-3"
                placeholder="Edit to-do message ..."
              />
              <Button
                text="🗙"
                className="close-button"
                action={() => {
                  setButtonClicked(false);
                  setTodoText("");
                  setShowPopup((prevData) => ({
                    ...prevData,
                    editTodo: {
                      display: false,
                    },
                  }));
                }}
              />
              <div>
                <Button
                  text="Edit To-Do !!!"
                  className="todo-button"
                  disable={!todoText}
                  action={() => {
                    todoEdit({
                      id: showPopup.editTodo.editTodoId,
                      checked: false,
                      message: todoText,
                    });
                    setTodoText("");
                    setShowPopup((prevData) => ({
                      ...prevData,
                      editTodo: {
                        display: false,
                      },
                    }));
                    setButtonClicked(false);
                  }}
                />
                <Button
                  className="clear-text-button"
                  text="Clear Text"
                  disable={!todoText}
                  action={() => {
                    setTodoText("");
                  }}
                />
              </div>
            </div>
          }
          style={{
            "--width": "500px",
            "--height": "400px",
            "--display": "flex",
            "--flexDirection": "column",
            "--position": "relative",
            "--backgroundColor": "white",
            "--padding": "0px",
            "--borderRadius": "10px",
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
    </div>
  );
};
