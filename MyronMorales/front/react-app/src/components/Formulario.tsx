import React, { useState } from 'react';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe algo"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormPage;
