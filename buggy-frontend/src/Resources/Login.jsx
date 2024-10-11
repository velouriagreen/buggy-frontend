import * as styles from '../BuggyStyles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



const Login = ({ user, setUser }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const loginUser = (e) => {
		e.preventDefault();
		setEmailError("")
		setPasswordError("")
		let data = {user: { email, password }}; 

		axios.post('http://localhost:3000/users/logon', data)
			.then(res => {
				console.log('message', res);
				//This is not the actual message. Fix later
				if(res.data.message === 'one or more fields do not exist' || res.data.message === 'Incorrect information provided') {
					setPasswordError(res.data.message);
				} else {
					setUser(res.data.user);
					navigate('/');
				}
			}).catch(err => {
				console.log('err', err);
				throw new Error('Error in FE');
			});
	};


	return (
		<>
			<h1>Welcome! Please Login</h1>
			<form onSubmit={loginUser}>
				<label>
					Email:
					<input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
					{emailError && <p>{emailError}</p>}
				</label>
				<label>
					Password:
					<input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
					{passwordError && <p>{passwordError}</p>}
				</label>
				<input className={styles.submitButton} type="submit" value="Submit" />
			</form>
			<h3>Don't have an account? <Link to='/register'>Click here</Link></h3>
		</>
	)
};

export default Login