import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Home = ({ user, setUser }) => {
	const [phrase, setPhrase] = useState('');

	console.log('user', user);
	const divRef = useRef(null);
	// console.log('myRef', myRef);


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
				setUser({...user, phrase});
				console.log(err);
			})
	}

	useEffect(() => {
		if (divRef.current && user.name) {
			divRef.current.append = `Your phrase is ${user.phrase}`;
		}
	}, [user])

	console.log('phrase', phrase)
	// ref allows us to grab the element object
	// element.append, element.innerHTML = , element
	return (
		<>
			<h1>Welcome {user.name}</h1>
	
			<div ref={divRef}></div>

			<p>Change phrase</p>
			<form onSubmit={updatePhrase}>
				<label>New phrase: </label>
				<input name="phrase" value={phrase} onChange={(e)=>{setPhrase(e.target.value)}}/>
				<button type="submit">Update phrase</button>
			</form>


		</>
	);
};
export default Home;
