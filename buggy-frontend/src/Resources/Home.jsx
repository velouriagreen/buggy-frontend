import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as styles from '../BuggyStyles.module.css';

const Home = ({ user, setUser }) => {
	const [phrase, setPhrase] = useState('');
	const divRef = useRef(null);

	const updatePhrase = (e) => {
		e.preventDefault();
		let data = { phrase };
		axios.post('http://localhost:3000/user/update', data)
			.then((res) => {
				console.log('res', res);
			
				if(res.status === 200) {
					setUser({...user, phrase});
				}
			}).catch((err) => {
				console.log(err);
			})
	}

	useEffect(() => {
		console.log('running...', user)
		if (divRef.current && user.name) {
			divRef.current.innerHTML = user.phrase === undefined || user.phrase === '' ? `<h3>Please create a phrase</h3>` : `<h3>Your phrase is ${user.phrase}</h3>`
		}
	}, [user])

	return (
		<>
			<h1>Welcome {user.name}</h1>
			<div ref={divRef} />
			<form onSubmit={updatePhrase}>
				<label>New phrase: </label>
				<input name="phrase" value={phrase} onChange={(e)=>{setPhrase(e.target.value)}}/>
				<button type="submit" className={styles.updateBtn}>Update Phrase</button>
			</form>
		</>
	);
};
export default Home;
