import { Container, Flex, Spinner, VStack, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "./Components/post";
import db from "./lib/firebase";
import Navbar from "./Components/navbar";
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

const App = () => {

  // const auth = firebase.auth();
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

    <>
      { user? <Navbar/> : null }
      <Container maxW="md" centerContent p={8}>
      { user ?<VStack spacing={8} w="100%">
          {posts.map((post)=>(
            <Post post={post} key={post.id}/>
          ))}
        </VStack> : <SingIn /> }
      </Container>
    </>
  );
}

function SingIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <Button onClick={ signInWithGoogle }>Sign-in with Google</Button>
  )
}

export default App;
