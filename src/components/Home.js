import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IconButton } from "@material-ui/core";
import TodoItem from "./TodoItem";
import { auth, db } from "../firebase";
import firebase from "firebase/app";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  // get all todo
  useEffect(() => {
    const unsubscribe = db
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, []);
 
  // add todo
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      text: input,
      finished: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  // user signOut
  const signOut = () => {
    auth.signOut();
    dispatch(logout());
  };
  return (
    <Container>
      <Contents>
        
        {/* head section */}
        <Header>
          <h1>{user?.name} Todo List</h1>
        </Header>

        <UserImage>
          <img src={user?.profileUrl} alt="" />
        </UserImage>

        {/* input - add todo */}
        <InputContainer>
          <form className="container" onSubmit={addTodo}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add todo..."
            />
            <IconButton disabled={!input} type="submit">
              <AddCircleIcon />
            </IconButton>
          </form>
        </InputContainer>

        {/* todo list */}
        <TodoContainer>
          {todos.map(({ id, todo }) => (
            <TodoItem key={id} id={id} todo={todo} />
          ))}
        </TodoContainer>

        {/* logout  user */}
        <Logout>
          <button onClick={signOut}>Logout</button>
        </Logout>
      </Contents>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Contents = styled.div`
  max-width: 800px;
  width: 100%;
`;

const Header = styled.div`
  padding-top: 40px;
  h1 {
    width: 100%;
    text-align: center;
    font-size: 3.5em;
    padding-bottom: 10px;
    @media (max-width: 600px) {
      font-size: 30px;
    }
  }
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  .container {
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    width: 100%;
    max-width: 500px;
    align-items: center;
    background-color: white;
    input {
      padding: 12px 13px;
      border: none;
      flex: 1;
      outline: none;
      font-size: 19px;
      font-family: poppins, sans-serif;
    }
  }
`;
const TodoContainer = styled.div`
  padding-top: 30px;
  padding: 0 10px;
`;
const Logout = styled.div`
  padding: 30px 0px;
  display: flex;
  justify-content: center;
  button {
    padding: 13px 18px;
    border-radius: 99px;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;
const UserImage = styled.div`
  display: flex;
  justify-content: center;
  img {
    object-fit: contain;
    border-radius: 99px;
    height: 60px;
  }
`;
