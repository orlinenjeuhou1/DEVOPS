import React, { useEffect, useState } from 'react';
import PizzaList from './components/PizzaList';
import PizzaForm from './components/PizzaForm';
import axios from 'axios';

function App() {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get('/api/pizzas/');
      setPizzas(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des pizzas :', error);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div>
      <h1>Best Pizza App 🍕</h1>
      <PizzaForm onPizzaAdded={fetchPizzas} />
      <PizzaList pizzas={pizzas} />
    </div>
  );
}

export default App;
