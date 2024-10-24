import { IFareList } from '@/Interfaces/ride';
import React from 'react';
import { vehicleData } from '@/data/fareListVehicleData';
import useHome from '../useHome';



const FareList: React.FC<{ fareList: IFareList | null }> = ({fareList}) => {
//   const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const {selectedVehicle ,handleSelectVehicle} = useHome();

  



  return (

    <div className="p-4 bg-white rounded-md shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Fare List</h2>
      {!fareList?<div>loading...</div>:
      <ul className="space-y-4">
        {vehicleData.map((vehicle) => {
          const fareDetails = fareList[vehicle.type.toLowerCase() as keyof IFareList];
          
          return (
            fareDetails && (
              <li
                key={vehicle.type}
                className={`flex items-center justify-between p-2 rounded-md transition duration-200 ${
                  selectedVehicle === vehicle.type ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={()=>{handleSelectVehicle(vehicle.type)
                
                
                }
              }
              >
                <div className="flex items-center space-x-2">
                  <img src={vehicle.image} alt={vehicle.type} className="w-12 h-12 rounded" />
                  <div>
                    <h3 className="font-semibold">{vehicle.type}</h3>
                    <p className="text-sm text-gray-500">{vehicle.tagline}</p>
                  </div>
                </div>
                <div>
                  <p>
                    Price: {fareDetails.price?.toFixed(2) || 'N/A'}
                  </p>
                </div>
              </li>
            )
          );
        })}
      </ul>
}
    </div>
    
    
  );
};

export default FareList;
