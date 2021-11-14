import React, { useState, useEffect } from 'react'
import { View, Text, Button} from 'react-native'
import Screen from './Screen';
import articlesApi from '../api/articlesApi';
import Articles from './Articles';
import Featured from './Featured';
import ActivityIndicator from './extras/ActivityIndicator';
import axios from 'axios';

const Home = ({ handleLogout, isLoggedIn}) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {

    try {
      const myArticles = await articlesApi.getArticles();
      setArticles(myArticles);
      setIsLoading(false);
    } catch (error) {
        console.error(error);
    }
  }
  
  useEffect(() => {
    fetchArticles();
  }, []);

  handleLogoutButton = () => {
    axios.delete("https://hekani-social-media.herokuapp.com/api/v1/logout", {withCredentials: true})
    .then(response => {
        handleLogout();
    })
    .catch(error => {
        console.log("Logout error ", error);
    });
}

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true}/>
      </View>
    );
  }


  return (
    <Screen>
        {isLoggedIn === "Yes" ? <Button title="LOGOUT" onPress={handleLogoutButton} /> : <Text>You are not logged in</Text>}
        <Featured
          title="Featured"
          item = {{
            title: 'React Native',
            body: 'A framework for building native apps using React',
            image: "https://user-images.githubusercontent.com/45620987/136694624-3c9f9b2d-dc9d-418c-b522-15be6d2eea4b.jpg"
          }}
        />
        <Articles data={articles} />
    </Screen>
  );
}

export default Home
