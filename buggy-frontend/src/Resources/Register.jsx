import * as styles from '../BuggyStyles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const USER_REGEX = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/);


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
		// if (!USER_REGEX.test(name)) {
		// 	console.log(1)
		// 	setNameError('Name has to be between 3 characters and 23 characters and only include letters');
		// 	return;
		// }
		// if (password.length < 8 || password.length > 24) {
		// 	console.log(2)
		// 	setPasswordError('Password must be between 8 and 24 characters');
		// 	return;
		// }

		// if (email.length < 3 || !email.includes('@')) {
		// 	console.log(3)
		// 	setEmailError('Please provide a valid email addresss');
		// 	return;
		// }
		// if (password !== confirmPassword) {
		// 	console.log(4)
		// 	setPasswordError('Passwords do not match');
		// 	return;
		// }

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
					navigate('/');
				} else {
					// Redirect the user back to the home page
					setPasswordError(res.data.message);
					// localStorage.setItem('csrfToken', res.data.csrfToken);

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