export interface Property {
  isDeleted: boolean;
  id: number;
  title: string;
  propertyType: PropertyType;
  propertyPrice: number;
  mainPhotoUrl: string;
  description: string;
  governorate: string;
  city: string;
  street: string;
  isRented: boolean;
  averageRating: number;
  ownerPhoto: string;
  ownerFullName: string;
}

export enum PropertyType {
  Room = 1,
  Bed = 2,
  Apartment = 3
}