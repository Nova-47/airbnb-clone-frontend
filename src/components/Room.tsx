import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const grayMoney = useColorModeValue("gray.900", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box position={"relative"} overflow={"hidden"} mb="3" rounded={"2xl"}>
          {imageUrl ? (
            <Image minH="280" src={imageUrl} />
          ) : (
            <Box minH={"280"} h="100%" w="100%" p={128} bg="green.400" />
          )}

          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            onClick={onCameraClick}
            color="white"
          >
            {isOwner ? <FaCamera size={"20px"} /> : <FaRegHeart size={20} />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize={"md"}>
              {name}
            </Text>
            <HStack
              _hover={{
                color: "red.100",
              }}
              spacing={1}
              alignItems={"center"}
            >
              <FaStar size={15} />
              <Text fontSize={"sm"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={"gray.600"}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={"gray.400"}>
          <Text color={grayMoney} as="b">
            ${price}
          </Text>
          /night
        </Text>
      </VStack>
    </Link>
  );
}
