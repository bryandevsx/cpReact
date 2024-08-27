import React, { useState } from 'react';

function Input() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCep(e.target.value);
  };

  const handleSearch = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar o CEP');
        }
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          setError('CEP não encontrado');
          setAddress(null);
        } else {
          setAddress(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError('Erro ao buscar o CEP');
        setAddress(null);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <label>
        Digite seu CEP: 
        <input 
          type="text" 
          name="CEP" 
          value={cep} 
          onChange={handleChange} 
          placeholder="00000-000"
          style={{ padding: '8px', margin: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>
      <button onClick={handleSearch} style={{ padding: '8px 16px', cursor: 'pointer' }}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {address && (
        <div style={{ marginTop: '20px' }}>
          <h3>Endereço:</h3>
          <p>Rua: {address.logradouro}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Cidade: {address.localidade}</p>
          <p>Estado: {address.uf}</p>
        </div>
      )}
    </div>
  );
}

export default Input;