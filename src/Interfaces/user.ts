import { VehicleType } from './ride';

export interface IUser{
    
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: string;
        role: string;
       
        vehicleType?:VehicleType
        licenseType?: string;  
        licenseNumber?: string; 
        vehicleModel?: string;  
        vehicleMake?: string;   
        vehicleRegistrationNumber?: string; 
      }

    export  interface IUserState {
        user: IUser | null;
        loading: boolean;
        wallet:IWallet|null;
        error: string | null;
        accessToken: string | null;
        refreshToken: string | null;
        isLoggedIn: boolean;
      }
export interface IWallet{
    balance:number,
    status: "Active"|"Suspended"|"Closed"
}