
import React from 'react';
import { Edit, Trash2, Calendar, Weight, Palette } from 'lucide-react';

export const PetCard = ({ pet, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${pet.name}?`)) {
      onDelete(pet.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isVaccinationSoon = () => {
    if (!pet.nextVaccination) return false;
    const today = new Date();
    const vaccineDate = new Date(pet.nextVaccination);
    const diffTime = vaccineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {pet.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {pet.species}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {pet.breed && (
            <p className="text-gray-600">
              <span className="font-medium">Raza:</span> {pet.breed}
            </p>
          )}
          
          <p className="text-gray-600">
            <span className="font-medium">Edad:</span> {pet.age} año{pet.age !== 1 ? 's' : ''}
          </p>

          {pet.weight > 0 && (
            <div className="flex items-center text-gray-600">
              <Weight size={16} className="mr-1" />
              <span>{pet.weight} kg</span>
            </div>
          )}

          {pet.color && (
            <div className="flex items-center text-gray-600">
              <Palette size={16} className="mr-1" />
              <span>{pet.color}</span>
            </div>
          )}

          {pet.nextVaccination && (
            <div className={`flex items-center ${isVaccinationSoon() ? 'text-red-600' : 'text-gray-600'}`}>
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">
                Vacuna: {formatDate(pet.nextVaccination)}
                {isVaccinationSoon() && <span className="ml-1 text-red-500">¡Próxima!</span>}
              </span>
            </div>
          )}
        </div>

        {pet.notes && (
          <div className="mb-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">{pet.notes}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(pet)}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Edit size={16} className="mr-2" />
            Editar
          </button>
          
          <button
            onClick={handleDelete}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};