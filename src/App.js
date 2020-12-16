import { Container, Flex, Spinner, VStack, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "./Components/post";
import db from "./config/firebase";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

function SingIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
    <h1 style={{margin: "10%"}}>Tell us what you think, anonymously</h1>
    <Button onClick={ signInWithGoogle }>Sign-in with Google</Button>
    </>
  )
}

const App = () => {
  const [user] = useAuthState(auth);

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

    <Flex direction={"column"} minH="100vh">
      <Navbar user={user} />
      <Container maxW="md" centerContent p={8} minH={"85vh"}>
      { user
      ?
      <VStack spacing={8} w="100%">
          {posts.map((post)=>(
            <Post post={post} key={post.id} user={user}/>
          ))}
        </VStack>
        :
        <SingIn />
        }
      </Container>
      <Footer />
      </Flex>
  );
}



export default App;
