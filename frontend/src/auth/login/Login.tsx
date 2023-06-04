import axios from "axios";
import React, { useContext } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../actions";
import { Store } from "../../store/Store";

const Login = () => {
  const loginAPI = "http://localhost:3001/api/v1/users/login";
  const { dispatch }: any = useContext(Store);

  const navigate = useNavigate();

  const submitLoginForm = (event: any) => {
    event.preventDefault();
    const formElement: any = document.querySelector("#loginForm");
    const formData: FormData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);
    const btnPointer: any = document.querySelector("#login-btn");
    btnPointer.innerHTML = "Please wait..";
    btnPointer.setAttribute("disabled", true);
    axios
      .post(loginAPI, formDataJSON)
      .then((response) => {
        btnPointer.innerHTML = "Login";
        btnPointer.removeAttribute("disabled");
        const data = response.data.data;
        const token = data.token;
        console.log(token, "asdasd");
        if (!token) {
          alert("Unable to login. Please try after some time.");
          return;
        }
        axios
          .get("http://localhost:3001/api/v1/users/loggedUser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response, "aa gaya user");
            addUser(response.data, dispatch);
          })
          .catch((erro) => console.log(erro));

        localStorage.clear();
        localStorage.setItem("user-token", token);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        btnPointer.innerHTML = "Login";
        btnPointer.removeAttribute("disabled");
        alert("Oops! Some error occured.");
      });
  };

  return (
    <React.Fragment>
      <Container className="my-5">
        <h2 className="fw-normal mb-5">Login To Todos demo app</h2>
        <Row>
          <Col md={{ span: 6 }}>
            <Form id="loginForm" onSubmit={submitLoginForm}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-username"}>Username</FormLabel>
                <input
                  type={"text"}
                  className="form-control"
                  id={"login-username"}
                  name="username"
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-password"}>Password</FormLabel>
                <input
                  type={"password"}
                  className="form-control"
                  id={"login-password"}
                  name="password"
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn-success mt-2" id="login-btn">
                Login
              </Button>
            </Form>
            <Button
              onClick={() => {
                navigate("/auth/signup");
              }}
              className="btn-success mt-2"
              id="Register-btn"
            >
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
