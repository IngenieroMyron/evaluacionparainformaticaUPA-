import React, { useState } from 'react';
import Swal from 'sweetalert2';


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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if(formData.age<18){
    Swal.fire({
      title: 'Información',
      text: 'Debes ser mayor de edad para registrarte',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }else{
  const validateForm = (): boolean => {
      console.log("Validando formulario con datos:", formData);
    
      if (!formData.name || formData.name.trim() === '') {
      console.error("El campo 'name' es inválido o está vacío.");
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      console.error("El campo 'email' es inválido.");
      return false;
    }
  
    if (!formData.age || formData.age <= 0) {
      console.error("El campo 'age' debe ser un número mayor a 0.");
      return false;
    }
  
    if (!formData.phoneNumber || formData.phoneNumber.length < 8) {
      console.error("El campo 'phoneNumber' debe tener al menos 8 dígitos.");
      return false;
    }
  
    if (!formData.birthDate || isNaN(Date.parse(formData.birthDate))) {
      console.error("El campo 'birthDate' es inválido.");
      return false;
    }
  
    console.log("Formulario válido");
    return true;
  };

 
  console.log("Datos del formulario antes de validar:", formData);
  const isFormValid = validateForm();
  console.log("¿Formulario válido?:", isFormValid);
    if (isFormValid) {

      const requestData = {
        Nombre: formData.name,  
        Fecha: formData.birthDate,  
        Telefono: formData.phoneNumber, 
        Correo: formData.email,   
      };
  
        //Envio de datos al backend.
        try {
        const response = await fetch('http://localhost:3000/guardar_usuario/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
          
        });
        console.log("Respuesta recibida:", response);

        const data = await response.json();
        console.log("Datos JSON:", data);
        if (data.success) {
          Swal.fire({
            title: 'Información',
            text: 'Registro exitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          handleClear();
        } else {
          Swal.fire({
            title: 'Información',
            text: 'Lo sentimos, ocurrio un error intenta de nuevo',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          title: 'Información',
          text: 'Lo sentimos, ocurrio un error intenta de nuevo',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Información',
        text: 'Lo sentimos, ocurrio un error intenta de nuevo',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };
}

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
