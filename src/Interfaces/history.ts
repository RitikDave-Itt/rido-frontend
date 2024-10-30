export interface IHistory {
    id: string;
    pickupAddress: string;
    destinationAddress: string;
    vehicleType: string; 
    amount: number;      
    pickupTime: string; 
    status :string; 
}
export interface BookingData {
  id: string;
  riderId: string;
  driverId?: string;
  pickupAddress: string;
  pickupLatitude: string;
  pickupLongitude: string;
  pickupTime: string;
  dropoffAddress: string;
  destinationLatitude: string;
  destinationLongitude: string;
  dropoffTime?: string;
  status: string;
  vehicleType: string;
  distanceInKm: number;
  amount: number;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  cancelBy?: string;
  cancelReason?: string | null;
}
export interface Driver {
    name: string;
  }
export interface Rider {
  name: string;
}

export interface BookingResponseForRider {
  bookingData: BookingData;
  driver?: Driver;
}
export interface BookingResponseForDriver {
    bookingData: BookingData;
    rider?: Rider;
}