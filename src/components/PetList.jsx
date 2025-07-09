import React from 'react';
import { PetCard } from './PetCard';
import { PawPrint } from 'lucide-react';

export const PetList = ({ pets, onEdit, onDelete }) => {
  if (pets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <PawPrint className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No hay mascotas registradas
        </h3>
        <p className="text-gray-500">
          ¡Comienza registrando tu primera mascota usando el formulario de arriba!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Mis Mascotas ({pets.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};