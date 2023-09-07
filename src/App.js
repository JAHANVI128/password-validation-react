// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useMemo, useState } from 'react'

export const PasswordInput = () => {

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [allRequirementsMet, setallRequirementsMet] = useState(false);

  const requirements = useMemo(() => [
    {
      regex:/.{8,}/,
      text:'Atleast 8 characters required'
    },{
      regex:/[0-9]/,
      text:'Atleast 1 number required (0...9)'
    },{
      regex:/[a-z]/,
      text:'Atleast 1 lowercase letter required'
    },{
      regex:/[A-Z]/,
      text:'Atleast 1 uppercase letter required'
    },{
      regex:/[^A-Za-z0-9]/,
      text:'Atleast 1 special symbol required'
    },
  ], [])

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const allMet = requirements.every((req) => req.regex.test(password));
    setallRequirementsMet(allMet);
  }, [password,requirements]);

  return (
    <div className='wrapper'>
      <div className='field'>
        <input type={showPassword ? 'text' : 'password'} placeholder='Create Password' value={password} onChange={handlePasswordChange}/>
        <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`} onClick={tooglePasswordVisibility}></i>
      </div>

      <div className='content'>
        <p>
          Password must contain : 
        </p>
        <ul className='req-list'>
          {requirements.map((req,index) => (
            <li key={index} className={req.regex.test(password) ? 'valid' : ''}>
              <i className={`fa-solid ${req.regex.test(password) ? 'fa-check' : 'fa-circle'}`}></i>
              <span>
                {req.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='wrapper'>
        <button disabled = {!allRequirementsMet}>Submit</button>
      </div>
    </div>
  );
};

