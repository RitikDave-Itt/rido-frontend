export interface IRideRequestForDriver {
    id: string;
    pickupLatitude: string;
    pickupLongitude: string;
    pickupAddress: string;
    pickupTime: string|null; 
    destinationLatitude: string;
    destinationLongitude: string;
    destinationAddress: string;
    price: number;
    vehicleType: number; 
    geohashCode: string|null;
    distanceInKm: number;
    userName: string;
    status:string,
    gender: string;
    phoneNumber: string;
}

export type Drivestatus =
| 'Requested'
| 'InProgress'
| 'Accepted'
| 'Completed'
| 'Canceled'
| 'Failed';

export type RideTransactionStatus = | 'Pending' | 'Completed' | 'Failed';


export interface IRideTransactionDetail {
    amount: number;
    riderName: string;
    transactionId: string;
    transactionStatus: string;
    createdAt: string; 
  }
  