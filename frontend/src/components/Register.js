import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";


function Register({ registerUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(email, password);
    } catch (error) {
      
    }
  }

  function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  }

  function validatePassword(passwordInput) {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(passwordInput);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setEmailError(
        value.trim() === "" || validateEmail(value)
          ? ""
          : "Digite um endereço de e-mail válido!"
      );
    } else if (name === "password") {
      setPassword(value);
      setPasswordError(
        value.trim() === "" || validatePassword(value)
          ? ""
          : "a senha deve conter no mínimo 8 caracteres"
      );
    }
  }

  return (
    <>
      <div className="register">
        <h2 className="register__title">Inscrever-se</h2>
        <input
          className="register__input-email register__input-email:focus"
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_email-message">{emailError}</span>
        <input
          className="register__input-password"
          type="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_password-message">{passwordError}</span>
        <button
          className={`register__button-confirm ${
            emailError || passwordError || email === "" || password === ""
              ? "register__button-confim--disabled"
              : ""
          }`}
          onClick={handleSubmit}
        >
          Inscrever-se
        </button>
        <div className="register__signup">
          <p>Já é um membro?</p>
          <Link to="/login" className="register__signup_link">
            Faça seu login aqui!
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Register);
