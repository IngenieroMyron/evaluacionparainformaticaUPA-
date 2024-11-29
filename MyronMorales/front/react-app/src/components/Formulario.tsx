import React, { useState } from 'react';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    age: 0
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Formulario enviado:', formData);
    } else {
      console.log('Formulario con errores, no se envió');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      birthDate,
      age: calculateAge(birthDate)
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', phoneNumber: '', email: '' };

    if (!/^[A-Za-z]+$/.test(formData.name)) {
      errors.name = 'El nombre solo puede contener letras.';
      isValid = false;
    }

    if (!/^\d{8}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'El número de teléfono debe tener 8 dígitos.';
      isValid = false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'El correo electrónico no tiene un formato válido.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleClear = () => {
    setFormData({
      name: '',
      birthDate: '',
      phoneNumber: '',
      email: '',
      age: 0
    });
    setFormErrors({
      name: '',
      phoneNumber: '',
      email: ''
    });
  };

  return (
    <div className="form-container">
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            className='Inputs'
            autoComplete='off'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            required
            pattern="^[A-Za-z\s]+$"
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>

        <div>
          <label htmlFor="birthDate">Fecha de Nacimiento:</label>
          <input
            className='Inputs'
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleBirthDateChange}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            readOnly
            disabled
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Número de Teléfono:</label>
          <input
            className='Inputs'
            maxLength={8}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Ingrese su número de teléfono"
            required
            pattern="^\d{8}$"
          />
          {formErrors.phoneNumber && <span className="error">{formErrors.phoneNumber}</span>}
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            className='Inputs'
            autoComplete='off'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese su correo electrónico"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>

        <button type="submit">Enviar</button>
        <button type="button" className='button' onClick={handleClear}>Limpiar</button>
      </form>
    </div>
  );
};

export default FormPage;
