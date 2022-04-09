import React from "react";

function TestScores({ scores }) {
  return (
    <table className="test-scores">
      {scores.map((score, index) => (
        <tr>
          <td style={{ paddingRight: "1rem" }}>Test {index + 1}:</td>
          <td>{score}%</td>
        </tr>
      ))}
    </table>
  );
}

export default TestScores;
