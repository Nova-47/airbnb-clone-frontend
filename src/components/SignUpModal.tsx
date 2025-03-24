import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUserNinja, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { usernameSignUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register, // 입력 필드와 연결
    handleSubmit, // 폼 제출 핸들러
    formState: { errors }, // 폼 상태 (유효성 검사 에러 포함)
    reset, // 폼 리셋 함수
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(usernameSignUp, {
    onSuccess: () => {
      toast({
        title: "welcome, i'm so glad you are here!",
        status: "success",
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      console.log("mutation has an error");
    },
  });
  const onSubmit = ({ name, email, username, password }: IForm) => {
    mutation.mutate({ name, email, username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                required
                {...register("name", {
                  required: "Please write a name",
                })}
                isInvalid={Boolean(errors.name?.message)}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register("email", {
                  required: "Please write your eamil",
                })}
                isInvalid={Boolean(errors.email?.message)}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register("username", {
                  required: "Please write a username",
                })}
                isInvalid={Boolean(errors.username?.message)}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register("password", {
                  required: "Please enter your password",
                })}
                isInvalid={Boolean(errors.password?.message)}
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <Button type="submit" mt={5} colorScheme="red" w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
