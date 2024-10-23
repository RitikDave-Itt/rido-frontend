export interface IAddress {
    name: string | null;
    houseNumber: string | null;
    road: string | null;
    neighbourhood: string | null;
    suburb: string | null;
    island: string | null;
    city: string | null;
    county: string | null;
    state: string | null;
    stateCode: string | null;
    postcode: string | null;
    country: string | null;
    country_code: string | null;
  }
  
  export interface IAddressResponse {
    displayName: string;
    address: IAddress;
  }
  
  
export interface Ilocation{
    latitude:string;
    longitude:string;

}