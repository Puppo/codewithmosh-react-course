import React from "react";

const Like = (props) => {
  const cssClass = "fa fa-heart" + (props.liked ? "" : "-o");
  return (
    <i
      className={cssClass}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
