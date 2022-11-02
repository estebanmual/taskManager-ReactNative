import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import {Searchbar} from 'react-native-paper';

import SessionContext from '../../context/session/sessionContext';
import {theme} from '../../styles/globalStyles';
import {formatearFecha} from '../../helpers';

const Weather = () => {
  const {userInformation} = useContext(SessionContext);
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [notFoundCity, setNotFoundCity] = useState(true);

  const isToday = date => {
    const today = new Date().toLocaleDateString();
    const forecastDate = new Date(date).toLocaleDateString();
    return today === forecastDate;
  };

  const fetchForecast = async cityProp => {
    const appId = '91fb87b7f86e4865a9b54354222810';
    console.log(city);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${appId}&q=${
      cityProp ? cityProp : city
    }&days=7`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCity(data.location.name);
      setForecast(data.forecast.forecastday);
      setNotFoundCity(false);
    } catch (error) {
      console.log(error);
      setNotFoundCity(true);
    }
  };

  useEffect(() => {
    setCity(userInformation.city);
    fetchForecast(userInformation.city);
  }, []);

  return (
    <View>
      <View style={styles.searchbarContainer}>
        <Searchbar
          onChangeText={text => setCity(text)}
          value={city}
          onIconPress={() => fetchForecast()}
          style={styles.searchbar}
          iconColor={theme.colors.primary}
          inputStyle={styles.searchbarInput}
        />
      </View>
      {notFoundCity ? (
        <Text style={styles.error}>City not found</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.forecast}>
            {forecast.map((day, i) => (
              <View
                key={day.date}
                style={[styles.day, isToday(day.date) && styles.today]}>
                <Text
                  style={[
                    styles.dayText,
                    isToday(day.date) && {color: '#FFF'},
                  ]}>
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
                  style={[
                    styles.dayText,
                    isToday(day.date) && {color: '#FFF'},
                  ]}>
                  {day.day.avgtemp_c}°
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: '2.5%',
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
  error: {
    ...theme.fonts.regular,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
    color: theme.colors.error,
    textAlign: 'center',
    marginVertical: 15,
  },
  searchbar: {
    width: '97.5%',
  },
  searchbarInput: {
    ...theme.fonts.regular,
    fontSize: 24,
    color: theme.colors.primary,
    textAlign: 'center',
  },
});

export default Weather;
