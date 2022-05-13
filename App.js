import React, {useState, useCallback} from 'react';
import { View, ActivityIndicator, TextInput, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { setWarningFilter } from 'react-native/Libraries/LogBox/Data/LogBoxData';


const App = () => {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const API = {
    key: 'daff9629262a4ac189e204606220502',
    baseURL: 'https://api.weatherapi.com/v1/current.json?key='
}

  const fetchData = useCallback(() =>{
    setLoading(true);
    setInput("")
    axios({
        method: "GET", 
        url: `${API.baseURL}${API.key}&q=${input}&aqi=no`, 
    })
    .then(res => {
      console.log(res.data);
      setData(res.data);
    })
    .catch(e => console.dir(e))
    .finally(() => setLoading(false)); 
}, [API.key, input]);  


  return (
    <View 
      style={styles.root}>
       <ImageBackground 
          source={require('./assets/background.jpeg')} 
          resizeMode = "cover" 
          style = {styles.backgroundImage}>
            <View>
         <TextInput 
          style = {styles.input} 
          placeholder='Enter a city' 
          onChangeText={text => setInput(text)} 
          value = {input} 
          placeholderTextColor = 'black' 
          onSubmitEditing={fetchData}>
         </TextInput>
       </View>
       {loading && 
       (<View>
         <ActivityIndicator 
         size = {'large'} 
         color = 'black'
         ></ActivityIndicator>
       </View>)}

        {data && <View style = {styles.info}>
          <Text style ={styles.cityText}>
            {`${data?.location?.name}, ${data?.location?.country}`}
          </Text>
          <Text style = {styles.dateTxt}>
            {new Date().toLocaleString()}
          </Text>
          <Text style = {styles.temperature}>{`${Math.round(data?.current?.temp_c)} °C`}</Text>
          
          </View>}
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    flex: 1
  },
  backgroundImage:{
    flex: 1, 
    flexDirection: 'column' 
  }, 
  input:{
    borderBottomWidth: 3,
    padding: 5, 
    paddingVertical: 20, 
    marginHorizontal: 10, 
    marginVertical: 100,
    backgroundColor: '#D9D9D9', 
    fontSize: 18, 
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 15, 
    borderBottomColor: '#D9D9D9'
  },
  info:{
    alignItems: 'center'
  }, 
  cityText:{
    marginTop: 100,
    color: 'white',
    fontSize: 40, 
    fontWeight: 'bold', 
  },
  dateTxt:{
    color: 'white', 
    fontSize: 19,
    padding: 20
  }, 
  temperature:{
    color: 'white',
    fontWeight:'bold',
    fontSize: 40,
    padding: 20
  },
  condition:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'normal'
  }, 
});

export default App;





//<Image style = {styles.conditionIcon} source = {{uri:`${data?.current.condition.icon}`}}></Image> 

//<Text style = {styles.condition}> {`${data?.current.condition.text}`}</Text>