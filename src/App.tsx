import { useActionState, useRef} from 'react';
import { useDropzone } from 'react-dropzone';

import Logo from './assets/images/logo-full.svg';
import LogoMark from './assets/images/logo-mark.svg';
import IconUpload from './assets/images/icon-upload.svg';
import { contactFormAction } from './lib/actions';

const App = () => {
	const hiddenInputRef = useRef<HTMLInputElement>(null);

	const [state, formAction, pending] = useActionState(contactFormAction, {
		values: {
			name: '',
			email: '',
			username: '',
		},
		success: false,
		errors: {},
		fields: [],
	});

	const onDrop = (acceptedFiles: File[]) => {
		if (hiddenInputRef.current) {
			const dataTransfer = new DataTransfer();
			acceptedFiles.forEach((file) => {
				dataTransfer.items.add(file);
			});

			hiddenInputRef.current.files = dataTransfer.files;
		}
	}
	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, maxFiles: 1, maxSize: 500000, multiple: false });

	const files = acceptedFiles.map((file) => {
		return (
			<img key={file.path} src={URL.createObjectURL(file)} alt="upload" />
		)
	});
	const remove = () => {
		if (hiddenInputRef.current) {
			hiddenInputRef.current.files = null;
		}
	};
	return (
		<main>
			<div className="lines"></div>
			<header className='header'>
				<a href='/' target='_blank'>
					<img src={Logo} className='logo' alt='Coding Conf' />
				</a>
			</header>

			<div className='container'>
				{state.success ? <>
					<div className='content'>
						<h1 className="content__title mb-20">Congrats, <span>{state.values.name}!</span> Your ticket is ready.</h1>
						<p className="content__text">
							We've emailed your ticket to <a href={`mailto:${state.values.email}`}>{state.values.email}</a> and will send updates in the run up to the event.
						</p>
					</div>
					<div className="ticket">
						<div className="ticket__content">
							<div className="ticket__top">
								<img src={LogoMark} className='ticket_logo' alt='Coding Conf' />
								<div className="ticket__info">
									<h3 className="ticket__title">Coding Conf</h3>
									<p className="ticket__subtitle">Jan 31, 2025 / Austin, TX</p>
								</div>
							</div>
							<div className="ticket__bottom">
								{state.values.avatar ? (
									<div className="ticket__avatar">
										<img src={URL.createObjectURL(state.values.avatar)} alt="avatar" />
									</div>
								) : null}
								<div className="ticket__details">
									<p>{state.values.name}</p>
									<div className="ticket__profile">
										<p>{state.values.email}</p>
										<p>{state.values.username}</p>
									</div>
								</div>
							</div>

						</div>
						<div className="ticket__number">
							<p>#{'01609'}</p>
						</div>
					</div>
				</> : <>
					<div className='content'>
						<h1 className='mb-20'>Your Journey to Coding Conf 2025 Starts Here!</h1>
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
									<div className={state.fields?.includes('avatar') ? 'input input--error' : "input"}>
										<div {...getRootProps({ className: 'upload', disabled: files.length === 1 })}>
											<input type="file" aria-hidden tabIndex={-1} aria-label='upload' name="avatar" required style={{ opacity: 0, width: '100%'}} ref={hiddenInputRef} />
											<input {...getInputProps({id: 'avatar'})} />

											<div className="upload__image">
												{files.length === 1 ? files : <img src={IconUpload} alt="upload" />}
											</div>

											{files.length === 1 ? (
												<div className="upload__buttons">
													<button onClick={() => remove()} className="button button--secondary">Remove</button>
													<button onClick={() => remove()} className="button button--secondary">Change image</button>
												</div>
											) : null}

											{
												isDragActive ?
													<p>Drop the files here ...</p> :
													<p>Drag and drop or click to upload</p>
											}
										</div>
										{state.fields?.includes('avatar') && state.errors?.avatar ?
											<span className='help-text'>{state.errors.avatar}</span> : (
												<span className="help-text">
													Upload your photo (JPG or PNG, max size: 500KB).
												</span>
											)}
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
								<button
									type='submit'
									disabled={pending}
									className='button button--primary button--full'
								>
									Generate My Ticket
								</button>
							</div>
						</div>
					</form>
				</>}
			</div>
		</main>
	);
}

export default App;
