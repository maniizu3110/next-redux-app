import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { startClock } from "../src/timer/actions";
import Examples from "../components/examples";
import { useAuth } from "../auth";
import FirebaaseContainer from "../components/firebaseloginconteiner";
import { Flex, Box, Button, Text, Heading, Stack } from "@chakra-ui/core";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startClock());
  }, [dispatch]);

  return (
    <>
      <FirebaaseContainer>
        <Flex>
          <Box w={500} p={4} my={12} mx="auot">
            <Heading as="h2" textAlign="center">
              Welcome to the home page
            </Heading>
          </Box>
        </Flex>
        <Text mt={8} textAlign="center">
          {`User ID:${user ? user.uid : "no user"}`}
        </Text>
        <Stack
          mt={8}
          alignItems="center"
          justifyContent="center"
          isInline
          width="100%"
        >
          <Button
            variant="solid"
            variantColor="blue"
            wodthj="100%"
            isDisabled={!user}
          >
            <Link href="/authenticated">
              <a>go to authenticated route</a>
            </Link>
          </Button>
          <Button
            variant="solid"
            variantColor="blue"
            wodthj="100%"
            isDisabled={user}
          >
            <Link href="/login">
            <a>go to authenticated route</a>
            </Link>
          </Button>
        </Stack>
      </FirebaaseContainer>

      {/* <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link> */}
    </>
  );
};

export default Index;
