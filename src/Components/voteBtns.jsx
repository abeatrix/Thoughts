import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const VoteButtons = ({ post }) => {

    const [isVoting, setVoting] = useState(false);
    const [votedPosts, setVotedPosts] = useState([]);


    const handleClick = async (type) => {

        let upVotesCount = post.upVotesCount;
        let downVotesCount = post.downVotesCount;

        const date = new Date();

        if (type === "upvote") {
        upVotesCount = upVotesCount + 1;
        } else {
        downVotesCount = downVotesCount + 1;
        }

        await db.collection("posts").doc(post.id).set({
        title: post.title,
        upVotesCount,
        downVotesCount,
        createdAt: post.createdAt,
        updatedAt: date.toUTCString(),
        });
    };

    return (
        <>
        <VStack>
            <IconButton
            size="lg"
            colorScheme="blue"
            aria-label="Upvote"
            icon={<FiArrowUp />}
            onClick={() => handleClick("upvote")}
            />
            <Text bg="gray.100" rounded="md" w="100%" p={1}>
            {post.upVotesCount}
            </Text>
        </VStack>
        <VStack>
            <IconButton
            size="lg"
            colorScheme="red"
            aria-label="Downvote"
            icon={<FiArrowDown />}
            onClick={() => handleClick("downvote")}
            />
            <Text bg="gray.100" rounded="md" w="100%" p={1}>
            {post.downVotesCount}
            </Text>
        </VStack>
        </>
    );
};

export default VoteButtons;
