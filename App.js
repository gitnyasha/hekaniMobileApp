import React, { useState, useEffect } from 'react';
import Screen from './src/components/Screen';
import { Text } from 'react-native';
import articlesApi from './src/api/articlesApi';
import Articles from './src/components/Articles';
import Featured from './src/components/Featured';
import SearchBar from './src/components/SearchBar';

export default function App() {
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
      <SearchBar />
      <Featured
        title="Featured"
        item = {{ 
          title: 'React Native',
          body: 'A framework for building native apps using React',
          thumbnail: "https://user-images.githubusercontent.com/45620987/136694624-3c9f9b2d-dc9d-418c-b522-15be6d2eea4b.jpg"
         }}
      />
      {/* {isLoading ? (
        <Text>Loading...</Text>
      ) : (
          <Articles data={articles} />
      )} */}
      <Articles data={articles} />
    </Screen>
  );
}