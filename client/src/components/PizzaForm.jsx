import React, { useState } from 'react';
import axios from 'axios';

const PizzaForm = ({ onPizzaAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    rating: '',
    comment: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/pizzas/', formData);
      onPizzaAdded(); // Rafraîchir la liste après ajout
      setFormData({ name: '', ingredients: '', rating: '', comment: '' });
    } catch (error) {
      console.error('Erreur lors de l’ajout :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Ajouter une pizza 🍕</h2>

      <label style={styles.label}>Nom</label>
      <input
        name="name"
        placeholder="Nom"
        value={formData.name}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Ingrédients</label>
      <input
        name="ingredients"
        placeholder="Ingrédients"
        value={formData.ingredients}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Note</label>
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Sélectionnez une note</option>
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐⭐</option>
        <option value="3">3 ⭐⭐⭐</option>
        <option value="4">4 ⭐⭐⭐⭐</option>
        <option value="5">5 ⭐⭐⭐⭐⭐</option>
      </select>

      <label style={styles.label}>Commentaire</label>
      <textarea
        name="comment"
        placeholder="Commentaire"
        value={formData.comment}
        onChange={handleChange}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>Envoyer</button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: "#fff8e1",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "400px",
    margin: "30px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif"
  },
  title: {
    textAlign: "center",
    color: "#d35400",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    backgroundColor: "#d35400",
    color: "#fff",
    border: "none",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1em"
  },
  label: {
    display: "block",
    marginBottom: "5px"
  }
};

export default PizzaForm;



