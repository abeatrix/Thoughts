import { Box, Container, Flex } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";

export default function footer() {
    return (
        <Box position="sticky" p={4} w={"100%"} bottom={0} bg="gray.100" h={100} p={4}>
            <Container maxW="md" centerContent>
                <p style={{fontSize: "2rem"}}><FiGithub/></p>
            <p>© {new Date().getFullYear()} <a href="https://github.com/abeatrix">Beatrix Woo</a></p>
            </Container>
        </Box>
    )
}
