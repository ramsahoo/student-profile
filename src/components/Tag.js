import React from "react";
import "./Tag.css";

function Tag({ tag, removeTag }) {
  return (
    <div className="tag" onClick={removeTag}>
      {tag}
    </div>
  );
}

export default Tag;
