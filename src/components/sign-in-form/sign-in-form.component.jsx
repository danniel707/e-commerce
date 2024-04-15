import { useState } from 'react';

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useNavigate } from 'react-router-dom';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

const defaultFormFields = {	
	email: '',
	password: '',	
}

const SignInForm = () => {
	
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const navigate = useNavigate();

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		navigate("/")
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);	
			navigate("/")	
			resetFormFields();
		} catch(error) {
			console.log(error)
      		if (error.code === 'auth/invalid-credential'){
        		alert('incorrect password or email');
      		}
		}
	}

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>											
				<FormInput 
					label="Email"
					type="email" 
					required 
					onChange={handleChange} 
					name="email" 
					value={email}
				/>				
				<FormInput 
					label="Password"
					type="password" 
					required 
					onChange={handleChange} 
					name="password" 
					value={password}
					/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button 
						type='button' buttonType={BUTTON_TYPE_CLASSES.google} 
						onClick={signInWithGoogle}
						>
						Sign In with Google
						</Button>
				</div>								
			</form>
		</div>
	)
}

export default SignInForm;