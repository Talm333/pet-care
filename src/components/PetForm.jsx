
import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Save, X } from 'lucide-react';

export const PetForm = ({ onAddPet, onUpdatePet, editingPet, onCancelEdit }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    color: '',
    nextVaccination: '',
    notes: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (editingPet) {
      setFormData({
        name: editingPet.name || '',
        species: editingPet.species || '',
        breed: editingPet.breed || '',
        age: editingPet.age?.toString() || '',
        weight: editingPet.weight?.toString() || '',
        color: editingPet.color || '',
        nextVaccination: editingPet.nextVaccination || '',
        notes: editingPet.notes || '',
        imageUrl: editingPet.imageUrl || ''
      });
    }
  }, [editingPet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      color: '',
      nextVaccination: '',
      notes: '',
      imageUrl: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.species.trim()) {
      toast({
        title: "Error",
        description: "El nombre y la especie son campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const petData = {
      name: formData.name.trim(),
      species: formData.species.trim(),
      breed: formData.breed.trim(),
      age: parseInt(formData.age) || 0,
      weight: parseFloat(formData.weight) || 0,
      color: formData.color.trim(),
      nextVaccination: formData.nextVaccination,
      notes: formData.notes.trim(),
      imageUrl: formData.imageUrl.trim()
    };

    if (editingPet) {
      onUpdatePet({ ...petData, id: editingPet.id });
      toast({
        title: "¡Éxito!",
        description: `${petData.name} ha sido actualizado correctamente`,
      });
    } else {
      onAddPet(petData);
      toast({
        title: "¡Éxito!",
        description: `${petData.name} ha sido registrado correctamente`,
      });
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center">
          {editingPet ? (
            <>
              <Save className="mr-2" size={24} />
              Editar Mascota
            </>
          ) : (
            <>
              <PlusCircle className="mr-2" size={24} />
              Registrar Nueva Mascota
            </>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nombre *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Max, Luna, Rocky"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="species" className="text-sm font-medium text-gray-700">
                Especie *
              </Label>
              <Input
                id="species"
                name="species"
                type="text"
                value={formData.species}
                onChange={handleInputChange}
                placeholder="Ej: Perro, Gato, Conejo"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed" className="text-sm font-medium text-gray-700">
                Raza
              </Label>
              <Input
                id="breed"
                name="breed"
                type="text"
                value={formData.breed}
                onChange={handleInputChange}
                placeholder="Ej: Golden Retriever, Siamés"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                Edad (años)
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="30"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Ej: 3"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Peso (kg)
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Ej: 25.5"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color" className="text-sm font-medium text-gray-700">
                Color
              </Label>
              <Input
                id="color"
                name="color"
                type="text"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="Ej: Dorado, Negro, Blanco"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nextVaccination" className="text-sm font-medium text-gray-700">
                Próxima Vacunación
              </Label>
              <Input
                id="nextVaccination"
                name="nextVaccination"
                type="date"
                value={formData.nextVaccination}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
                URL de Imagen
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notas Adicionales
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Información adicional sobre tu mascota..."
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="flex gap-4 justify-end">
            {editingPet && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex items-center"
              >
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
            )}
            
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium flex items-center"
            >
              {editingPet ? (
                <>
                  <Save size={16} className="mr-2" />
                  Actualizar Mascota
                </>
              ) : (
                <>
                  <PlusCircle size={16} className="mr-2" />
                  Registrar Mascota
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};