import React, { useState, useEffect } from 'react';
import Issue from './components/Issue'

import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [sort, setSort] = useState("title");
  useEffect(()=>{
    fetch("https://api.github.com/repos/rails/rails/issues")
    .then(resp=>resp.json())
    .then(issues=>{
      console.log(issues)
      setIssues(issues)
    })
  },[])

  // a function to make a simple sort for any property of an object
  const propertySort= (property)=>{
    return function(a,b){
      if (a[property]>b[property]){return 1}
      if (a[property]<b[property]){return -1}
      return 0 
    }
  }

  const issueSort = () =>{
    let returnArray = [...issues]
    switch (sort){
      case "title":
        returnArray.sort(propertySort('title'))
        break
      case "comments":
        returnArray.sort((i1,i2)=>{
          return i1.comments-i2.comments
        })
        break
      case "created_at":
        
        break
      case "updated_at":
        
        break
      default:

    }
    return returnArray
  }
  const sortChangeHandler = (event)=>{
    setSort(event.target.value)
    console.log(sort)
  }
  const issueDisplay= ()=>{
    console.log(issues[0])
    return issueSort().map(issue=><Issue issue={issue} />)
  }
  let sorts = ["title", "comments", "created_at", "updated_at"]
  return (
    <div className="App">
      <h3>{"Sort or Filter Issues"}</h3>
      <div className="sort">
        <select onChange={sortChangeHandler} value={sort}>
          {sorts.map(sortKey=><option key={sortKey} value={sortKey}>{sortKey}</option>)}
        </select>
      </div>

      <div className="issues-list">
        <table >
          <thead>
            <tr> 
              <th colSpan="5">
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
