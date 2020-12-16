import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const VoteButtons = ({ post }) => {

    const [isVoting, setVoting] = useState(false);
    const [votedPosts, setVotedPosts] = useState([]);


    const handleClick = async (type) => {

        let votesCount = post.votesCount;

        const date = new Date();

        if (type === "upvote") {
            votesCount = votesCount + 1;
        } else {
            votesCount = votesCount - 1;
        }

        await db.collection("posts").doc(post.id).set({
        title: post.title,
        votesCount: votesCount,
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
            <Text bg="gray.100" rounded="md" w="100%" p={1} textAlign={[ 'center' ]}>
            {post.votesCount}
            </Text>

            <IconButton
            size="lg"
            colorScheme="red"
            aria-label="Downvote"
            icon={<FiArrowDown />}
            onClick={() => handleClick("downvote")}
            />
        </VStack>
        </>
    );
};

export default VoteButtons;
