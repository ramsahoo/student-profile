import React from "react";

function TestScores({ scores }) {
  return (
    <table className="test-scores">
      {scores.map((score, i) => (
        <tr>
          <td style={{ paddingRight: "1rem" }}>
            Test {i + 1}: {score}%
          </td>
        </tr>
      ))}
    </table>
  );
}

export default TestScores;
