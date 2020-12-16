import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./voteBtns"

const Post = ({post, user}) => {
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons user={user} post={post}/>
      <Box bg="gray.100" p={4} rounded="md" w="100%" minH="200px">
        <Text>{post.title}</Text>
      </Box>
    </HStack>
  );
};

export default Post;
