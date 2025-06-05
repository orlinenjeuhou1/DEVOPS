import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    ingredients: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = () => {
    axios.get('/api/pizzas/')
      .then(response => {
        setPizzas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur de chargement :', error);
        setError(error.message || 'Erreur inconnue');
        setLoading(false);
      });
  };

  const deletePizza = async (id) => {
    try {
      await axios.delete(`/api/pizzas/${id}/`);
      fetchPizzas();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  const startEdit = (pizza) => {
    setEditingId(pizza.id);
    setEditForm({
      name: pizza.name,
      ingredients: pizza.ingredients,
      rating: pizza.rating,
      comment: pizza.comment,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', ingredients: '', rating: '', comment: '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/pizzas/${editingId}/`, editForm);
      setEditingId(null);
      fetchPizzas();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Liste des Pizzas 🍕</h2>
      {pizzas.length === 0 ? (
        <p>Aucune pizza trouvée.</p>
      ) : (
        <ul style={styles.list}>
          {pizzas.map(pizza => (
            <li key={pizza.id} style={styles.card}>
              {editingId === pizza.id ? (
                <form onSubmit={submitEdit}>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    style={styles.input}
                  />
                  <input
                    name="ingredients"
                    value={editForm.ingredients}
                    onChange={handleEditChange}
                    style={styles.input}
                  />
                  <input
                    name="rating"
                    type="number"
                    value={editForm.rating}
                    onChange={handleEditChange}
                    style={styles.input}
                  />
                  <textarea
                    name="comment"
                    value={editForm.comment}
                    onChange={handleEditChange}
                    style={styles.input}
                  />
                  <button type="submit" style={styles.save}>Sauvegarder</button>
                  <button type="button" onClick={cancelEdit} style={styles.cancel}>Annuler</button>
                </form>
              ) : (
                <>
                  <strong>{pizza.name}</strong> ({pizza.rating}/5)<br />
                  <em>Ingrédients :</em> {pizza.ingredients}<br />
                  <em>Commentaire :</em> {pizza.comment}<br />
                  <button onClick={() => startEdit(pizza)} style={styles.edit}>Modifier</button>
                  <button onClick={() => deletePizza(pizza.id)} style={styles.delete}>Supprimer</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '30px auto',
    fontFamily: 'sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#2980b9',
    marginBottom: '20px'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  edit: {
    marginRight: '10px',
    backgroundColor: '#f39c12',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  delete: {
    backgroundColor: '#e74c3c',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  save: {
    backgroundColor: '#27ae60',
    border: 'none',
    color: '#fff',
    padding: '10px 12px',
    borderRadius: '6px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  cancel: {
    backgroundColor: '#7f8c8d',
    border: 'none',
    color: '#fff',
    padding: '10px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default PizzaList;
