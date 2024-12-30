import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
// import { YaMap, Marker } from 'react-native-yamap';

const CustomerOnMap = ({ location, title, description }) => {
  const map = React.createRef();
  const [mapInited, setMapInited] = useState(true);

  //   const initMap = async (key) => {
  //     await YaMap.init('b9011490-c148-406d-a52f-39c7d8c26fdb');
  //     return true;
  //   };

  //   useEffect(async () => {
  //     try {
  //       await initMap('b9011490-c148-406d-a52f-39c7d8c26fdb');
  //       setMapInited(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  // //функция getCamera возвращает нам объект с поворотом камеры по азимуту,
  // // наклон камеры, координаты на которых находится центр камеры и зум.
  // // Будем использовать эту функцию для реализации других функций.
  // const getCamera = () => {
  //   return new Promise((resolve, reject) => {
  //     if (map.current) {
  //       map.current.getCameraPosition((position) => {
  //         resolve(position);
  //       });
  //     } else {
  //       reject('ERROR');
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      {/* {mapInited && (
        <YaMap
          ref={map}
          showUserPosition={false}
          rotateGesturesEnabled={false}
          nightMode={true}
          mapType={'vector'}
          style={styles.map}
          initialRegion={{
            lat: 55.751244, // Пример: центр Москвы
            lon: 37.618423,
            zoom: 10,
          }}
        >
          {/* {locations.map((location, index) => ( */}
      {/* <Marker
        //   children={
        //     <Image
        //       style={styles.marker}
        //       source={{ uri: 'ВАШЕ_ИЗОБРАЖЕНИЕ' }}
        //     />
        //   }
        //   key={index}
        point={{
          lat: location.latitude,
          lon: location.longitude,
        }}
        title={title}
        description={description}
      /> */}

      {/* <Circle
          center={{ lat: 30, lon: 30 }}
          radius={60000}
          fillColor='#5789d9'
          strokeColor='#154ca3'
          strokeWidth={4}
          zIndex={5}
        /> */}
      {/* <Polygon
          points={[
            { lat: 30.540273, lon: 31.182331 },
            { lat: 30.070791, lon: 31.928108 },
            { lat: 29.233658, lon: 31.228942 },
            { lat: 29.983355, lon: 30.622998 },
          ]}
          fillColor='#5789d9'
          strokeColor='#154ca3'
          strokeWidth={4}
          zIndex={5}
        /> */}
      {/* <Polyline
          points={[
            { lat: 29.98866, lon: 31.207694 },
            { lat: 29.364817, lon: 31.176281 },
            { lat: 28.634771, lon: 30.862143 },
            { lat: 27.490336, lon: 30.839704 },
          ]}
          fillColor='#5789d9'
          strokeColor='#154ca3'
          strokeWidth={4}
          zIndex={4}
        /> */}
      {/* ))} */}
      {/* </YaMap>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CustomerOnMap;
