
import React, { useState, useEffect } from 'react';
import { getDogBreeds } from '../services/dogApi';
import { Loader2, Dog, Heart } from 'lucide-react';

export const DogBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const data = await getDogBreeds();
        setBreeds(data.slice(0, 12)); // Mostrar 12 razas
      } catch (err) {
        setError('Error al cargar las razas de perros');
        console.error('Error fetching dog breeds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Loader2 className="mx-auto animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-gray-600">Cargando razas de perros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 mb-4">⚠️</div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Dog className="text-blue-500 mr-3" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Razas de Perros Populares</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {breeds.map((breed) => (
          <div
            key={breed.id}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {breed.image?.url && (
              <div className="h-48 overflow-hidden">
                <img
                  src={breed.image.url}
                  alt={breed.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{breed.name}</h3>
              
              {breed.temperament && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Temperamento:</span> {breed.temperament.split(',')[0]}
                </p>
              )}
              
              {breed.life_span && (
                <p className="text-sm text-gray-600 mb-2">
                  <Heart size={14} className="inline mr-1 text-red-500" />
                  <span className="font-medium">Vida:</span> {breed.life_span}
                </p>
              )}
              
              {breed.weight?.metric && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Peso:</span> {breed.weight.metric} kg
                </p>
              )}
              
              {breed.bred_for && (
                <p className="text-xs text-gray-500 bg-gray-100 rounded-lg p-2 mt-3">
                  <span className="font-medium">Criado para:</span> {breed.bred_for}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};