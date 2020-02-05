import React, { useState, useEffect } from 'react';
import Issue from './components/Issue'

import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  useEffect(()=>{
    fetch("https://api.github.com/repos/rails/rails/issues")
    .then(resp=>resp.json())
    .then(issues=>{
      console.log(issues)
      setIssues(issues)
    })
  },[])
  const issueDisplay= ()=>{
    console.log(issues[0])
    return issues.map(issue=><Issue issue={issue} />)
  }
  return (
    <div className="App">
      <div className="issues-list">
      <table >
        <thead>
          <tr> 
            <th colspan="5">
              {"Rails Github issues"}
            </th>
          </tr>
          <tr>

            <th>Issue Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Labels</th>
            <th>Comment Count</th>
          </tr>
        </thead>
        <tbody>
          {issueDisplay()}
        </tbody>
      </table>
      </div>
    </div>
  );
}



export default App;
