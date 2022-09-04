import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Formulario = () => {
	const [formularioEnviado, setFormularioEnviado] = useState(false)

	return (
		<>
			<Formik
				initialValues={
					{
						nombre: '',
						correo: ''
					}
				}
				validate={(values) => {
					let errors = {};
					
					if(!values.nombre) {
						errors.nombre = 'Por favor ingresa un nombre.'
					} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre)) {
						errors.nombre = 'El nombre solo puede contener letras y espacios'
					}

					if(!values.correo) {
						errors.correo = 'Por favor ingresa un correo electronico.'
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)) {
						errors.correo = 'Ingresa un correo electronico valido.'
					}
					

					return errors;
				}}
				onSubmit={(values,{resetForm}) => {
					resetForm();
					console.log('Formulario enviado')
					setFormularioEnviado(true)
					setTimeout(() => setFormularioEnviado(false), 5000)
				}}
			>
				{({handleSubmit, values, handleChange, handleBlur, errors, touched}) => (
					<form className='formulario' onSubmit={handleSubmit}>
						<div>
							<label htmlFor="nombre">Nombre</label>
							<input 
								type="text" 
								id="nombre" 
								name="nombre" 
								placeholder="John Doe" 
								value={values.nombre}
								onChange={handleChange}
								onBlur={handleBlur}
								/>
								{touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
						</div>
						<div>
							<label htmlFor="correo">Correo</label>
							<input 
								type="text" 
								id="correo" 
								name="correo" 
								placeholder="correo@correo.com" 
								value={values.correo}
								onChange={handleChange}
								onBlur={handleBlur} 
								/>
								{touched.correo && errors.correo && <div className='error'>{errors.correo}</div>}
						</div>
						<button type='submit'>Enviar</button>
						{formularioEnviado && <p className='exito'>¡Formulario enviado exitosamente!</p>}
					</form>
				)}
			</Formik>
		</>
	);
}
 
export default Formulario;