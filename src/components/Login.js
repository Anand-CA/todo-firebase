import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";

function Login() {
  const dispatch = useDispatch();

//   user signIn
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            name: user.displayName,
            email: user.email,
            profileUrl: user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Container>
      <button onClick={signIn}>
        <span>Sign in</span>
        <img src="/search.png" alt="" />
      </button>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    padding: 10px 15px;
    border-radius: 99px;
    span {
      font-weight: 600;
      font-size: 20px;
    }
    img {
      margin-left: 10px;
      height: 40px;
    }
  }
`;
