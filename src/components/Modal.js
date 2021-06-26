import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { Button, IconButton, TextField } from "@material-ui/core";
import { useRef } from "react";
import { db } from "../firebase";
function Modal({ setShowModal, id }) {
  const ModalRef = useRef(null);
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState({});

  // get todo by id
  useEffect(() => {
    db.collection("todos")
      .doc(id)
      .get()
      .then((doc) => {
        setTodo(doc.data());
      });
  }, [id]);

  //   function to close modal - when clicked outside the div
  const closeModal = (e) => {
    if (ModalRef.current === e.target) {
      setShowModal(false);
    }
  };

  //   update todo
  const updateTodo = (e) => {
    e.preventDefault();
    db.collection("todos")
      .doc(id)
      .set(
        {
          text: input,
        },
        { merge: true }
      )
      .then(() => setShowModal(false));
  };
  return (
    <Container ref={ModalRef} onClick={closeModal}>
      <Contents>
        <ButtonContainer>
          <IconButton onClick={() => setShowModal(false)}>
            <CloseIcon />
          </IconButton>
        </ButtonContainer>
        <h1>Update Todo</h1>
        <form onSubmit={updateTodo}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="outlined-basic"
            label={todo?.text}
            variant="outlined"
          />
          <Button
            style={{ marginTop: "24px" }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
          >
            update
          </Button>
        </form>
      </Contents>
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0 14px;
  right: 0;
  display: flex;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;
const Contents = styled.div`
  width: 100%;
  padding: 10px;
  max-width: 600px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 13px;
  h1 {
    color: black;
    font-size: 42px;
    text-align: center;
    margin: 40px 0;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
