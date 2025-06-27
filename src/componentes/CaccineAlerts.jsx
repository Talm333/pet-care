
import React from 'react';
import { AlertTriangle, Calendar } from 'lucide-react';

export const VaccineAlerts = ({ pets }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 mb-8 text-white">
      <div className="flex items-center mb-4">
        <AlertTriangle className="mr-3 animate-pulse" size={24} />
        <h2 className="text-xl font-bold">¡Alertas de Vacunación!</h2>
      </div>
      
      <p className="mb-4 opacity-90">
        Las siguientes mascotas tienen vacunas programadas para esta semana:
      </p>
      
      <div className="space-y-3">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{pet.name}</h3>
                <p className="text-sm opacity-90">{pet.species} - {pet.breed}</p>
              </div>
              <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-1" />
                {pet.nextVaccination && formatDate(pet.nextVaccination)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};