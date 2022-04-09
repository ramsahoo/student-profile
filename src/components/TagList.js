import React from "react";
import Tag from "./Tag";

function TagList({ tags, removeTag }) {
  return (
    <div>
      {tags.map((tag, index) => (
        <Tag tag={tag} removeTag={() => removeTag(index)} key={tag} />
      ))}
    </div>
  );
}

export default TagList;
