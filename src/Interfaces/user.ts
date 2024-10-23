
export interface IUser{
    
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: string;
        role: string;
        licenseType?: string;  
        licenseNumber?: string; 
        vehicleModel?: string;  
        vehicleMake?: string;   
        vehicleRegistrationNumber?: string; 
      }

    export  interface IUserState {
        user: IUser | null;
        loading: boolean;
        error: string | null;
      }
      