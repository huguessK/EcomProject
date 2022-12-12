
import React, {useEffect, useState} from 'react';

function App() {
  const [backendData, setBackendData]=useState([{}]);

useEffect(() => {
fetch("/api/home").then(
response=> response.json()
).then(
data => {
	setBackendData(data)
	}
)
}, []);

  return (
    <div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          Learn React
        </a>

      {(typeof backendData.home==='undifined' ? (<p>loading...</p>):
( backendData.home.map((item,i) => <p key={i}> {item}</p>))

)};
    </div>

  );
}

export default App;
