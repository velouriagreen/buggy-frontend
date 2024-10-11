import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as styles from '../BuggyStyles.module.css';
import { useCookies } from 'react-cookie';


const Home = ({ user, setUser }) => {
	const [phrase, setPhrase] = useState('');
	const [cookies] = useCookies(['CSRF_TOKEN']);
	const divRef = useRef(null);

	const updatePhrase = (e) => {
		e.preventDefault();
		let data = { phrase };
		const headers = {
			'X-CSRF-TOKEN': cookies['CSRF_TOKEN']
		};
		axios.post('http://localhost:3000/user/update', data, { withCredentials: true, headers: headers })
			.then((res) => {
				if(res.status === 200) {
					setUser({...user, phrase});
				}
			}).catch((err) => {
				console.log(err);
			})
	};

	useEffect(() => {
		console.log('running...', user)
		if (divRef.current && user.name) {
			divRef.current.innerHTML = user.phrase === undefined || !user.phrase.length ? '<h3>Please create a phrase</h3>' : `<h3>Your phrase is ${user.phrase}<h3>`;
			// divRef.current.dangerouslySetInnerHTML = !user.phrase.length ? `<h3>Please insert phrase</h3>` : `<h3>Your phrase is: ${user.phrase}</h3>`;
			console.log('divRef', divRef.current)
		}
	}, [user])

	return (
		<>
			<h1>Welcome {user.name}</h1>
			<div ref={divRef} className={styles.phrase} />
			{/* <div dangerouslySetInnerHTML={{__html: user.phrase}} ref={divRef} /> */}
			<form onSubmit={updatePhrase}>
				<label>Update Phrase: </label>
				<input name="phrase" value={phrase} onChange={(e)=>{setPhrase(e.target.value)}}/>
				<button type="submit" className={styles.updateBtn}>Submit</button>
			</form>


		</>
	);
};
export default Home;
