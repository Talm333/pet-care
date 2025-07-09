
const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';

export const getDogBreeds = async () => {
  try {
    const response = await fetch(`${DOG_API_URL}?limit=50&has_breeds=1`, {
      headers: {
        'x-api-key': 'live_your_api_key_here' // Opcional: puedes usar una API key gratuita
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dog breeds loaded:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    // Retornar datos de ejemplo en caso de error
    return [
      {
        id: 1,
        name: 'Golden Retriever',
        temperament: 'Amigable, Inteligente, Devoto',
        life_span: '10 - 12 años',
        weight: { metric: '25 - 32' },
        bred_for: 'Recuperar aves acuáticas',
        image: { url: 'https://cdn2.thedogapi.com/images/B1bpqoMGm.jpg' }
      },
      {
        id: 2,
        name: 'Labrador Retriever',
        temperament: 'Extrovertido, Activo, Amigable',
        life_span: '10 - 12 años',
        weight: { metric: '25 - 36' },
        bred_for: 'Pesca',
        image: { url: 'https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg' }
      }
    ];
  }
};