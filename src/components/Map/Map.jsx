import {
   MapContainer, TileLayer, Marker, Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const Map = () => {
   const icon = L.icon({ iconUrl: "./img/mapMarker/marker-icon.png" });
   const position = [50.450919503613015, 30.522919842328225];
   return (
      <MapContainer className="map__container" center={position} zoom={16} scrollWheelZoom={false}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <Marker icon={icon} position={position}>
            <Popup className="map__popup">
               <h3 className="map__title  ">"Innovation Oasis"</h3>
               <p>Майдан Незалежності, 1</p>
               <p>
                  Графік роботи:
                  <br />
                  пн.-пт.: 10:00 - 18:00
                  <br />
                  сб.: 11:00 - 16:00
                  <br />
                  нд.: вихідний</p>
            </Popup>
         </Marker>
      </MapContainer>
   );
};

export default Map;