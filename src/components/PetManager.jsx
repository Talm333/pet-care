
import React, { useState, useEffect } from 'react';
import { PetForm } from './PetForm';
import { PetList } from './PetList';
import { VaccineAlerts } from './VaccineAlerts';
import { DogBreeds } from './DogBreeds';
import { getPetsFromStorage, savePetsToStorage } from '../utils/localStorage';
import { Heart, PawPrint } from 'lucide-react';

const PetManager = () => {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [activeTab, setActiveTab] = useState('pets');

  useEffect(() => {
    const storedPets = getPetsFromStorage();
    setPets(storedPets);
  }, []);

  useEffect(() => {
    savePetsToStorage(pets);
  }, [pets]);

  const addPet = (pet) => {
    const newPet = {
      ...pet,
      id: Date.now().toString(),
    };
    setPets([...pets, newPet]);
  };

  const updatePet = (updatedPet) => {
    setPets(pets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
    setEditingPet(null);
  };

  const deletePet = (id) => {
    setPets(pets.filter(pet => pet.id !== id));
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setActiveTab('pets');
  };

  const getUpcomingVaccinations = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return pets.filter(pet => {
      if (!pet.nextVaccination) return false;
      const vaccineDate = new Date(pet.nextVaccination);
      return vaccineDate >= today && vaccineDate <= nextWeek;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="text-pink-500 mr-2 animate-pulse" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestor de Mascotas
          </h1>
          <PawPrint className="text-blue-500 ml-2 animate-bounce" size={32} />
        </div>
        <p className="text-gray-600 text-lg">Cuida y gestiona la información de tus mascotas queridas</p>
      </div>

      {/* Vaccine Alerts */}
      {getUpcomingVaccinations().length > 0 && (
        <VaccineAlerts pets={getUpcomingVaccinations()} />
      )}

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-lg p-1 flex space-x-1">
          <button
            onClick={() => setActiveTab('pets')}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'pets'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Mis Mascotas
          </button>
          <button
            onClick={() => setActiveTab('breeds')}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'breeds'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Razas de Perros
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'pets' && (
        <div className="space-y-8">
          <PetForm
            onAddPet={addPet}
            onUpdatePet={updatePet}
            editingPet={editingPet}
            onCancelEdit={() => setEditingPet(null)}
          />
          <PetList
            pets={pets}
            onEdit={handleEdit}
            onDelete={deletePet}
          />
        </div>
      )}

      {activeTab === 'breeds' && <DogBreeds />}
    </div>
  );
};

export default PetManager;