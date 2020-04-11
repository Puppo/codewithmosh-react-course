import React from "react";

const Like = ({ liked, onClick }) => {
  const cssClass = "fa fa-heart" + (liked ? "" : "-o");
  return (
    <i className={cssClass} style={{ cursor: "pointer" }} onClick={onClick}></i>
  );
};

export default Like;
