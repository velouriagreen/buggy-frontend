import * as styles from '../BuggyStyles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Register = ({ user, setUser }) => {

	const navigate = useNavigate();

	const [userForm, setUserForm] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleChange = (e) => {
		setUserForm({ ...userForm, [e.target.name]: e.target.value })
	};

	const registerUser = (e) => {
		console.log('submitting form..')
		e.preventDefault();
		const { name, email, password, confirmPassword } = userForm;
	
		setNameError("")
		setEmailError("")
		setPasswordError("")
		const data = {
			user: {
				name,
				email,
				password
			}
		};
		axios.post('http://localhost:3000/users', data)
			.then(res => {
				console.log('res', res);
				if (res.data.message === `A user record for ${data.user.name} was created.`) {
					setUser({ name, email });
					navigate('/logon');
				} else {
					setPasswordError(res.data.message);
				}
			})
	};

	return (
		<>
			<h1>Welcome! Please Register</h1>
			<form onSubmit={registerUser}>
				<label>
					Name:
					<input
						type="text"
						name="name"
						onChange={handleChange}
						required
						value={user.name}
					/>
					{nameError && <p>{nameError}</p>}
				</label>
				<label>
					Email:
					<input type="text" name="email" onChange={handleChange} value={user.email} />
					{emailError && <p>{emailError}</p>}
				</label>
				<label>
					Password:
					<input type="password" name="password" onChange={handleChange} value={user.password} />

				</label>
				<label>
					Confirm Password:
					<input type="password" name="confirmPassword" onChange={handleChange} value={user.confirmPassword} />
				</label>
				{passwordError && <p>{passwordError}</p>}
				<input className={styles.submitButton} type="submit" value="Submit" />
			</form>
			<h3>Already have an account? <Link to='/logon'>Click here</Link></h3>
		</>
	)
};

export default Register;