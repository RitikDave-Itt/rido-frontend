export interface IFareDetails {
    price: number | null;
    estimatedTime: string | null;
  }
  
  export interface IFareList {
    bike: IFareDetails | null;
    sedan: IFareDetails | null;
    suv: IFareDetails | null;
    coupe: IFareDetails | null;
    van: IFareDetails | null;
    autoRikshaw: IFareDetails | null;
    other: IFareDetails | null;
  }
  
  export type VehicleType = 
  | 'bike' 
  | 'sedan' 
  | 'suv' 
  | 'coupe' 
  | 'van' 
  | 'autoRikshaw';



  export interface  ISelectedVehicle{
    vehicle : VehicleType;
    price : number;
    estimatedTime : string|null;
  }
    

  export interface IRideRequestDetail {
    destinationAddress: string;
    destinationLatitude: string;
    destinationLongitude: string;
    pickupAddress: string;
    pickupLatitude: string;
    pickupLongitude: string;
    vehicleType: string;
    pickupTime: string; 
  }

  export interface IDriverDetail {
    driverAssigned: boolean;
    id: string;
    driverName: string;
    mobileNo: string;
    vehicleType: string;
    latitude?: string;
    longitude?: string;
    otp: string;
  }
  
 
export interface IRideRequestForRider {
  id: string;                         
  userId: string;                    
  driverId?: string | null;          
  pickupLatitude: string;             
  pickupLongitude: string;            
  pickupAddress: string;              
  pickupTime: Date;                   
  destinationLatitude: string;        
  destinationLongitude: string;       
  destinationAddress: string;         
  price: number;                      
  vehicleType: string;                
  geohashCode: string;                
  distanceInKm: number;               
  status: string;                     
}
export type RideRequestStatus = 
| 'Requested'
| 'Accepted'
|"Unpaid"
| 'InProgress'
| 'Completed'
| 'Canceled'
| 'Failed';