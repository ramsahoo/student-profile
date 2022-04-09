import React, { useRef, useState } from "react";
import TestScores from "./TestScores";
import TagList from "./TagList";
import "./StudentProfile.css";

const average = (...arr) =>
  arr.map((e) => +e).reduce((acc, e) => acc + e, 0) / arr.length;

function StudentProfile({
  student: { pic, firstName, lastName, email, company, skill, grades, tags },
  addTag,
  removeTag,
}) {
  const tagInputRef = useRef(null);

  const [expanded, setExpanded, shouldBePlus] = useState(false);
  const [collapsed, setCollapsed, shouldBeMinus] = useState(true);
  const [tagInput, setTagInput] = useState("");

  const toggleExpanded = () => setExpanded(!expanded);
  const toggleCollapsed = () => setCollapsed(!collapsed);


  const submitTag = (e) => {
    e.preventDefault();
    addTag(tagInputRef.current.value);
    setTagInput("");
  };

  return (
    <div className="student-profile">
      <div className="profile-pic">
        <img src={pic} alt="Profile" />
      </div>
      <div className="data">
        <h1>
          {firstName} {lastName}
        </h1>
        <div className="details">
          <div>Email: {email}</div>
          <div>Company: {company}</div>
          <div>Skill: {skill}</div>
          <div>Average: {average(...grades)}%</div>
          {tags.length > 0 && <TagList tags={tags} removeTag={removeTag} />}
          <form onSubmit={submitTag}>
            <input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              ref={tagInputRef}
            />
          </form>
          {expanded && <TestScores scores={grades} />}
        </div>
      </div>
      {shouldBePlus && (<button className="plus" onClick={toggleExpanded}>
        +
      </button>)}
      {shouldBeMinus && (<button className="minus" onClick={toggleCollapsed}>
        -
      </button>)}
    </div>
  );
}

export default StudentProfile;
