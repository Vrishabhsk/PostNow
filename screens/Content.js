//imports
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
//Styled Components
import { Layout, Card, Text, Input, Button } from "@ui-kitten/components";
//Icons
import { Feather } from "@expo/vector-icons";
//LocalStorage
import * as SecureStore from "expo-secure-store";

//Component to view individual Post
export default function Content({ navigation }) {
  //current post data
  const [currentPost, setCurrentPost] = useState({});
  //comments for the currentPost
  const [postComments, setPostComments] = useState({});
  //new Comment input
  const [inputComment, setInputComment] = useState("");

  //saving the comments to localStorage
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  //retrieving the comments from localStorage
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setPostComments(JSON.parse(result));
    } else {
      setPostComments({
        comments: [],
      });
    }
  }

  //viewing the title for the Post
  const Header = () => {
    return (
      <Text category="h6" style={{ margin: 25 }}>
        {currentPost.title}
      </Text>
    );
  };

  //viewing the comments for the post
  const Comments = () => {
    return (
      <Layout style={{ padding: 10, marginLeft: 18 }}>
        <Text style={{ marginBottom: 10 }}>Comments</Text>
        {postComments.comments ? (
          postComments.comments.length !== 0 ? (
            postComments.comments.map((val, idx) => {
              return (
                <Text style={{ marginLeft: 10, marginBottom: 10 }} key={idx}>
                  <Feather name="message-square" size={20} color="#fff" />
                  {"  "}
                  {val}
                </Text>
              );
            })
          ) : (
            <Text style={{ marginLeft: 10, marginBottom: 10 }}>
              No Comments
            </Text>
          )
        ) : null}
      </Layout>
    );
  };

  //adding new comment to state
  const handleNewComment = () => {
    setPostComments((prevVal) => {
      return {
        comments: [...prevVal.comments, inputComment],
      };
    });
    setInputComment("");
  };

  useEffect(() => {
    //loading the comments from localStorage for the posts
    if (Object.keys(currentPost).length !== 0) {
      getValueFor(currentPost.id.toString());
    }
    //getting the current post from navigator props
    const values = navigation.getState();
    setCurrentPost(values.routes[1].params.item);
  }, [currentPost]);

  useEffect(() => {
    //saving the comments to localStorage on every new comment
    if (Object.keys(currentPost).length !== 0) {
      save(currentPost.id.toString(), JSON.stringify(postComments));
    }
  }, [postComments]);

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Card header={Header} footer={Comments}>
          <Text category="p1">{currentPost.body}</Text>
        </Card>
      </ScrollView>
      <View
        style={{
          flexDirection: "row-reverse",
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <Button size="small" onPress={handleNewComment}>
          Post
        </Button>
        <Input
          style={{ marginRight: 10 }}
          placeholder="Comment your opinions"
          value={inputComment}
          onChangeText={(nextValue) => setInputComment(nextValue)}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
