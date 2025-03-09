import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "b2339a1851273cc3558d7b95fbd3a0f4",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize="xs"
          as="b"
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href={
            "https://github.com/login/oauth/authorize?client_id=Ov23liI4Hk3luFVeheb5&scope=read:user,user:email"
          }
          w={"100%"}
          leftIcon={<FaGithub />}
          _hover={{ bg: "#111111" }}
          bg={"gray.700"}
          color="white"
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme="yellow"
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
