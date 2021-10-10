import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Screen from './Screen';
import articlesApi from '../api/articlesApi';
import Articles from './Articles';
import Featured from './Featured';
import SearchBar from './SearchBar';
import ActivityIndicator from './extras/ActivityIndicator';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchArticles = async () => {

      try {
        const myArticles = await articlesApi.getArticles();
        setArticles(myArticles);
        setIsLoading(false);
      } catch (error) {
          console.error(error);
      }
  }
  fetchArticles();
  }, [])

  return (
    <Screen>
     
      {isLoading ? (
        <View>
            <ActivityIndicator visible={true}/>
        </View>
      ) : (
        <>
          <SearchBar />
          <Featured
            title="Featured"
            item = {{ 
              title: 'React Native',
              body: 'A framework for building native apps using React',
              thumbnail: "https://user-images.githubusercontent.com/45620987/136694624-3c9f9b2d-dc9d-418c-b522-15be6d2eea4b.jpg"
            }}
          />
          <Articles data={articles} />
        </>
      )}
    </Screen>
  );
}

export default Home
