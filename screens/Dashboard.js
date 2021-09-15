//imports
import React, { useState, useEffect } from "react";
//Components
import RenderItem from "../components/RenderItem";
import axios from "axios";
//manual styling
import { StyleSheet } from "react-native";
//Styled Components
import {
  ListItem,
  List,
  Divider,
  Spinner,
  Layout,
  Text,
} from "@ui-kitten/components";

export default function Dashboard({ navigation }) {
  //for navigating btw screens
  const { navigate } = navigation;
  //storing all the posts
  const [postsData, setPostData] = useState([]);
  //for increasing number of post by 10 on reaching end of list
  const [numberOfPosts, setNumberOfPosts] = useState(10);

  useEffect(() => {
    //fetch request to get the posts from the api
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPostData(res.data))
      .catch((err) => console.error(err));
  }, []);

  //fn for rendering each item in the list
  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.title} ${item.id}`}
      description={item.body}
      accessoryRight={() => linkToPost(item)}
    />
  );

  //to show the spinner on reaching the end while loading the next 10 posts
  const loadFooter = () => {
    return (
      <Layout style={styles.spinnerContainer}>
        <Spinner status="success" />
      </Layout>
    );
  };

  return (
    <List
      data={postsData.slice(0, numberOfPosts)}
      renderItem={(props) => (
        <RenderItem item={props.item} navigate={navigate} />
      )}
      ListFooterComponent={
        numberOfPosts !== postsData.length ? loadFooter : null
      }
      ItemSeparatorComponent={Divider}
      //no of units before the end to call the below method
      onEndReachedThreshold={0.2}
      //increasing no of posts by 10 more
      onEndReached={() => {
        if (numberOfPosts < postsData.length) {
          setNumberOfPosts((posts) => posts + 10);
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
