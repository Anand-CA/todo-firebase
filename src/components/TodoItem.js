import React, { useState } from "react";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { db } from "../firebase";
import Modal from "./Modal";
import { forwardRef } from "react";

const TodoItem = forwardRef(({id,todo}, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [todoId, setTodoId] = useState(null);

  const deleteTodo = (id) => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("delete success");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} id={todoId} />}
      <Container ref={ref}>
        <p>
          <span></span>
          {todo.text}
        </p>

        {/* action  - icons */}
        <IconButton
          onClick={() => {
            setTodoId(id);
            setShowModal(true);
          }}
        >
          <CustomEditIcon />
        </IconButton>

        <IconButton onClick={() => deleteTodo(id)}>
          <CustomDeleteIcon />
        </IconButton>
      </Container>
    </>
  );
});

export default TodoItem;

const Container = styled.div`
  width: 100%;
  border-radius: 6px;
  background: lightgray;
  display: flex;
  align-items: center;
  p {
    text-align: left;
    font-weight: 600;
    span {
      margin-right: 8px;
    }
    flex: 1;
  }
  &:nth-child(4n + 1) {
    background-image: linear-gradient(to right, #42275a, #734b6d);
  }
  &:nth-child(4n + 2) {
    background-image: linear-gradient(to right, #de6262, #ffb88c);
  }
  &:nth-child(4n + 3) {
    background-image: linear-gradient(to right, #eb3349, #f45c43);
  }
  &:nth-child(4n + 4) {
    background-image: linear-gradient(to right, #614385, #516395);
  }
  margin: 20px 0;
  padding: 10px 10px;
`;
const CustomDeleteIcon = styled(DeleteIcon)`
  color: #fff;
`;
const CustomEditIcon = styled(EditIcon)`
  color: #fff;
`;
