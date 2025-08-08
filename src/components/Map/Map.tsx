// src/components/Maps.tsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

type MapsProps = {
  address: string;
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Maps = ({ address }: MapsProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(apiKey)
  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          setError('Endereço não encontrado ou inválido.');
        }
      } catch (err) {
        setError('Erro ao carregar o mapa.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (address && apiKey) {
      fetchCoordinates();
    } else {
      setError('Endereço ou chave da API inválida.');
      setLoading(false);
    }
  }, [address, apiKey]);

  return (
    <div style={{ minHeight: '400px' }}>
      {loading && <p>Carregando mapa...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && location && (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default Maps;