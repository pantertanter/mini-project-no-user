import { useState } from 'react';
import './App.css';
import facade from './util/apiFacade';
import { Link } from 'react-router-dom';
import FillExample from './components/NavBar.jsx';

const App = ({ setIsLoggedIn }) => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const isLoggedInStored = localStorage.getItem('isLoggedIn') === 'true';

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      () => {
        setIsLoggedIn(true); // Set the application state to logged in
        localStorage.setItem('isLoggedIn', 'true'); // Store in localStorage
      }
    );
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set the application state to logged out
    localStorage.setItem('isLoggedIn', 'false'); // Update localStorage
  };

  return (
    <>
    <FillExample />
        <div>
          <h1>Login</h1>

          <div>
            {isLoggedInStored ? (
              <div>
                <p>Du er logget ind, {facade.getUserName()}</p>
                <button onClick={handleLogout}>
                  Log out
                </button>
                <div>
                  <Link to="/images" >Images <br/></Link>
                  <Link to="/savedImg" >Saved Images</Link>
                </div>
              </div>
            ) : (

<form className='loginform' onChange={onChange}>
            <input placeholder="User Name" id="username" className='input' />
            <input placeholder="Password" id="password" className='input' />
            <button onClick={performLogin} className='btn' >Login</button>
          </form>

            )}
          </div>
        </div>
    </>
  );
};

export default App;
