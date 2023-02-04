import React, { useRef, useState } from "react";
import "./ForgotPassword.scss";
import ReactDOM from "react-dom/client";
import linkImg from "./images/link.png";

const ForgotPassword = () => {
  const emailInputRef = useRef();
  const [message, setMessage] = useState(false);
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3001/password/forgotpassword`,
      {
        method: "POST",
        body: JSON.stringify({ email: emailInputRef.current.value }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      setMessage(() => true);
      emailInputRef.current.value = "";
      setTimeout(closeForgotPasswordHandler, 5000);
    }
  };

  const closeForgotPasswordHandler = () => {
    const modal = ReactDOM.createRoot(document.getElementById("modals"));
    modal.render("");
  };

  return (
    <div className="forgt-ps-outer-cl-dv">
      <div
        className="forgotPasswordForm"
        onClick={closeForgotPasswordHandler}
      ></div>
      <form onSubmit={formSubmitHandler}>
        {!message ? (
          ""
        ) : (
          <div className="link-sent-to-mailbox-msg-cntnr">
            <h2>Kindly Check your mailbox</h2>
          </div>
        )}
        <div className="text-cnt-forgt-psd">
          <img src={linkImg} alt="" />
          <h2>Forgot your password</h2>
          <h4>
            Please enter the email address you'd like your password reset
            information sent to
          </h4>
        </div>
        <label htmlFor="email-add">Enter email address</label>
        <input
          placeholder="Type..."
          id="email-add"
          ref={emailInputRef}
          required
        />
        <button>Request reset link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
