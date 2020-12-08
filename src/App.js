import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "./Components/post";
import db from "./lib/firebase";
import Navbar from "./Components/navbar";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      });

  }, []);

  useEffect(() => {
    //hook to handle live time update of post where there are changes in the firestore db

    db.collection("posts")
    .orderBy("createdAt", "desc")
    .onSnapshot((querySnapshot) => {
      const _posts =[];

      querySnapshot.forEach((doc) => {
        _posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPosts(_posts);
    })
  }, []);

  return (
    <>
    <Navbar/>
    <Container maxW="md" centerContent p={8}>
      <VStack spacing={8} w="100%">
        {posts.map((post)=>(
          <Post post={post} key={post.id}/>
        ))}
      </VStack>
    </Container>
    </>
  );
}

export default App;
