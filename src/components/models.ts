export interface VehicleDto {
  owner_id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
}

export interface Vehicle extends VehicleDto {
  id: string;
}

export interface OwnerDto {
  name: string;
  last_name: string;
  email: string;
  phone: number;
  address?: string;
}

export interface Owner extends OwnerDto {
  id: string;
  vehicles?: Vehicle[];
}

export interface RegistryDto {
  vehicle_id: string;
  date: string;
  time: string;
  preventive: boolean;
  corrective: boolean;
  cost: number;
  description?: string;
}

export interface Registry extends RegistryDto {
  id: string;
}
