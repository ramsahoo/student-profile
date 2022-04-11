import React, { useState, useEffect } from "react";
import StudentProfile from "./StudentProfile";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Scrollbar.css";
import "./StudentDemographics.css";

function StudentDemographics() {
  const [filters, setFilters] = useState({});
  const [students, setStudents] = useLocalStorage("students", []);

  useEffect(() => {
    const retrieveStudents = async () => {
      try {
        const studentResponse = await fetch(
          "https://api.hatchways.io/assessment/students"
        );
        const studentData = await studentResponse.json();
        setStudents(
          studentData.students.map((student) => ({ ...student, tags: [] }))
        );
      } catch (err) {
        console.error(
          "Unable to retrieve the student demographics from the API."
        );
      }
    };
    if (students.length === 0) {
      retrieveStudents();
    }
  }, [setStudents, students.length]);

  const updateFilter = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value.toLowerCase(),
    });
  };

  const retrieveFilteredStudents = () => {
    return students
      .filter(
        ({ firstName, lastName }) =>
          !filters.name ||
          `${firstName} ${lastName}`.toLowerCase().includes(filters.name)
      )
      .filter(
        ({ tags }) =>
          !filters.tag ||
          tags.some((tag) => tag.toLowerCase().includes(filters.tag))
      );
  };

  const addTag = (index, tag) => {
    const newStudents = [...students];
    newStudents[index].tags = [...new Set([...newStudents[index].tags, tag])];
    setStudents(newStudents);
  };

  const removeTag = (studentIndex, tagIndex) => {
    const newStudents = [...students];
    newStudents[studentIndex].tags = newStudents[studentIndex].tags.filter(
      (tag, index) => tagIndex !== index
    );
    setStudents(newStudents);
  };

  return (
    <div className="student-demographics-container">
      <input
        placeholder="Search by name"
        name="name"
        value={filters.name}
        onChange={updateFilter}
      />
      <input
        placeholder="Search by tag"
        name="tag"
        value={filters.tag}
        onChange={updateFilter}
      />
      <div className="student-demographics">
        {retrieveFilteredStudents().map((student, index) => (
          <StudentProfile
            student={student}
            addTag={(tag) => addTag(index, tag)}
            removeTag={(tagIndex) => removeTag(index, tagIndex)}
            key={`student-demographics-${student.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentDemographics;
