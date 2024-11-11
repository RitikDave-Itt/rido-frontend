export const getGeoLocationCords = async (): Promise<[string, string]> => {
    const isTesting = true; 
  
    return new Promise((resolve, reject) => {
      try {
        if (isTesting) {
          
          const latitude = "26.945700";
          const longitude = "75.777313";
          resolve([latitude, longitude]);
        } 
        else if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve([latitude.toString(), longitude.toString()]);
            },
            (error) => {
              console.error("Error getting location:", error);
              alert("Failed to retrieve location. Please ensure GPS is enabled.");
              reject("Geolocation failed.");
            }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
          reject("Geolocation not supported.");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        reject("Location fetching error.");
      }
    });
  };
  