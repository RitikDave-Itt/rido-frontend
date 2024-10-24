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