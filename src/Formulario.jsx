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
					console.log(values)
					setFormularioEnviado(true)
					setTimeout(() => setFormularioEnviado(false), 5000)
				}}
			>
				{({errors}) => (
					<Form className='formulario'>
						<div>
							<label htmlFor="nombre">Nombre</label>
							<Field 
								type="text" 
								id="nombre" 
								name="nombre" 
								placeholder="John Doe"
							/>
							<ErrorMessage name='nombre' component={() => (
								<div className='error'>{errors.nombre}</div>
							)}/>
				
						</div>
						<div>
							<label htmlFor="correo">Correo</label>
							<Field
								type="text" 
								id="correo" 
								name="correo" 
								placeholder="correo@correo.com" 
							/>

							<ErrorMessage name='correo' component={() => (
								<div className='error'>{errors.correo}</div>
							)}/>
						</div>
						<div>
							<Field name="pais" as="select">
								<option value="argentina">Argentina</option>
								<option value="colombia">Colombia</option>
								<option value="mexico">Mexico</option>
								<option value="chile">Chile</option>
								<option value="uruguay">Uruguay</option>
							</Field>
						</div>
						<div>
							<label>
								<Field type='radio' name='sexo' value='hombre'/>
								Masculino
							</label>
							<label>
								<Field type='radio' name='sexo' value='femenino'/>
								Femenino
							</label>
						</div>
						<div>
							<Field name='mensaje' as='textarea' placeholder='Mensaje'/>
						</div>
						<button type='submit'>Enviar</button>
						{formularioEnviado && <p className='exito'>¡Formulario enviado exitosamente!</p>}
					</Form>
				)}
			</Formik>
		</>
	);
}
 
export default Formulario;