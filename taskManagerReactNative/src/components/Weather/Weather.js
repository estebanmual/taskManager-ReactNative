import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import {IconButton} from 'react-native-paper';

import SessionContext from '../../context/session/sessionContext';
import {globalStyles, theme} from '../../styles/globalStyles';
import {formatearFecha} from '../../helpers';

const Weather = () => {
  const {userInformation} = useContext(SessionContext);
  const [city, setCity] = useState(userInformation.city);
  const [search, setSearch] = useState(true);
  const [forecast, setForecast] = useState([]);

  const isToday = date => {
    const today = new Date().toLocaleDateString();
    const forecastDate = new Date(date).toLocaleDateString();
    return today === forecastDate;
  };

  useEffect(() => {
    if (search) {
      const getData = async () => {
        const appId = '91fb87b7f86e4865a9b54354222810';
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${appId}&q=${city}&days=7`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setForecast(data.forecast.forecastday);
          setSearch(false);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <View>
      <View style={styles.searchbar}>
        <Text style={globalStyles.subtitle}>{city}</Text>
        <IconButton
          icon="magnify"
          iconColor={theme.colors.secondary}
          size={30}
          style={styles.magnifier}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.forecast}>
          {forecast.map((day, i) => (
            <View
              key={day.date}
              style={[styles.day, isToday(day.date) && styles.today]}>
              <Text
                style={[styles.dayText, isToday(day.date) && {color: '#FFF'}]}>
                {isToday(day.date)
                  ? 'Today'
                  : formatearFecha(day.date, 'corta')}
              </Text>
              <Image
                style={styles.image}
                source={{
                  uri: `http:${day.day.condition.icon}`,
                }}
              />
              <Text
                style={[styles.dayText, isToday(day.date) && {color: '#FFF'}]}>
                {day.day.avgtemp_c}°
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  forecast: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  day: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 83,
    height: 166,
  },
  dayText: {
    ...theme.fonts.regular,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
  },
  today: {
    backgroundColor: theme.colors.primary,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  image: {
    width: 61,
    height: 61,
  },
});

export default Weather;
