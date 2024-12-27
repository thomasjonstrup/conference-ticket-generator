import { useActionState, useState } from 'react';
import Logo from './assets/images/logo-full.svg';
import { useFormState } from 'react-dom';
import { contactFormAction } from './lib/actions';


/*   <!-- Form starts -->



  Upload Avatar
  Drag and drop or click to upload
  Upload your photo (JPG or PNG, max size: 500KB).

  Full Name

  Email Address
  example@email.com

  GitHub Username
  @yourusername

  Generate My Ticket

  <!-- Form ends -->

  <!-- Generated tickets starts -->

  Congrats, <!-- Full Name -->! Your ticket is ready.

  We've emailed your ticket to <!-- Email Address --> and will send updates in the run up to the event.

  Coding Conf
  Jan 31, 2025 / Austin, TX

  <!-- Generated tickets ends -->

  <div class="attribution">
	Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
	Coded by <a href="#">Your Name Here</a>.
  </div> */

const App = () => {
	const [count, setCount] = useState(0);

	/* const [state, formAction] = useActionState(increment, { name: '', email: '', file: '', username: '' }); */
	/* 	 const [ message, formAction ] = useFormState(submitForm, null)

	 */
	const [state, formAction, pending] = useActionState(contactFormAction, {
/* 		defaultValues: {
			name: '',
			email: '',
			username: '',
		}, // added */
		success: false,
		errors: {},
		fields: [],
	});

	console.log('state', state)

	return (
		<main>
			<div className="lines"></div>
			<header className='header'>
				<a href='https://vite.dev' target='_blank'>
					<img src={Logo} className='logo' alt='Coding Conf' />
				</a>
			</header>

			<div className='container'>
				{state.success ? <>
					<div className='content'>
						<h1>Congrats, {state.values.name}! Your ticket is ready.</h1>
						<p>
							We've emailed your ticket to {state.values.email} and will send updates in the run up to the event.
						</p>
						<h2>Coding Conf</h2>
						<p>Jan 31, 2025 / Austin, TX</p>
					</div>
					<div className="ticket">
						<div className="ticket__content">
							<div className="ticket__top">
								<img src={Logo} className='logo' alt='Coding Conf' />
								<p>Jan 31, 2025 / Austin, TX</p>
							</div>
							<div className="ticket__bottom">
								<div className="ticket__avatar">
								<img src={state.values.avatar} alt="avatar" />
								</div>
								<div className="ticket__details">
									<h3>{state.values.name}</h3>
									<p>{state.values.email}</p>
									<p>{state.values.username}</p>
								</div>
							</div>

						</div>
						<div className="ticket__number">
							<p>#{'01609'}</p>
						</div>
					</div>
				</> : <>
							<div className='content'>
					<h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
					<p>
						Secure your spot at next year's biggest coding
						conference.
					</p>
				</div>
				<form action={formAction}>
					<div className='card'>
						<div className='fields mb-20'>
							<div className='field'>
								<label htmlFor='avatar'>Upload Avatar</label>
								<div className='upload'>
									<input type='file' name="file" id='avatar' />
									<p>Drag and drop or click to upload</p>
								</div>
							</div>

							<div className='field'>
								<label htmlFor='name'>Full Name</label>

								<div className={state.fields?.includes('name') ? 'input input--error' : "input"}>
									<input type='text' name="name" id='name' />
									{state.fields?.includes('name') && state.errors?.name ? <span className='help-text'>{state.errors.name}</span> : null}
								</div>
							</div>

							<div className='field'>
								<label htmlFor='email'>Email Address</label>
								<div className={state.fields?.includes('email') ? 'input input--error' : "input"}>
									<input type='email' name="email" id='email' />
									{state.fields?.includes('email') && state.errors?.email ? <span className='help-text'>{state.errors.email}</span> : null}
								</div>
							</div>

							<div className='field'>
								<label htmlFor='github'>GitHub Username</label>
								<div className={state.fields?.includes('username') ? 'input input--error' : "input"}>
									<input type='text' name="username" id='github' />
									{state.fields?.includes('username') && state.errors?.username ? <span className='help-text'>{state.errors.username}</span> : null}
								</div>
							</div>
						</div>
						<button
							className='button button--primary'
							onClick={() => setCount((count) => count + 1)}
						>
							Generate My Ticket {count}
						</button>
					</div>
				</form>
				</>}
			</div>
		</main>
	);
}

export default App;
