import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function App() {

  const [datos, setDatos] = useState();

  const obtenerDatos = async () => {
    try {
      const response = await fetch('https://silver-penguin-235702.hostingersite.com/end_points/index.php',
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"api": "ft_admin","requestType": "getAll"})
        }
      ); // URL de la API
      const json = await response.json(); // convertir respuesta a JSON
      console.log(json)
      setDatos(json.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <View>
      <FlatList
        data={datos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{JSON.stringify(item)}</Text>
        )}
      />
    </View>
  );
}






