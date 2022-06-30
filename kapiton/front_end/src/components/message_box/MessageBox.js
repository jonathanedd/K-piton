import React from "react";
import Alert from "react-bootstrap/Alert";
import "../message_box/messagebox.css";

const MessageBox = (props) => {
  return (
    <div className="alert-box">
      <Alert className="alert" variant={props.variant || "info"}>
        {props.children}
      </Alert>
    </div>
  );
};

export default MessageBox;
