import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <NaverMapView
        center={{ latitude: 37.47800, longitude: 126.88047, zoom: 14 }}
      >
        <Marker
          coordinate={{ latitude: 37.47800, longitude: 126.88047 }}
          image={{ uri: 'https://i.im.ge/2022/07/14/ueZe8z.png' }}
          onClick={() => console.log(1)}
        />
        <Marker
          coordinate={{ latitude: 37.48500, longitude: 126.88047 }}
          onClick={() => console.log(2)}
        />
      </NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
