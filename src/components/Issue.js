import React from 'react';


function Issue(props){
    let issue = props.issue
    let labels = "none"
    
    if (issue.labels.length > 0 ){
        labels =  issue.labels.map(label=>`${label.name}`).toString() 
    }

    return(
        <tr key={issue.id}>
            
            <td><a href={issue.url}>{issue.title}</a></td>
            <td>{issue.user.login}</td>
            <td>{issue.body.slice(0,100)+"..."}</td>
            <td>{labels}</td>
            <td>{issue.comments}</td>
        </tr>
    )
}
export default Issue