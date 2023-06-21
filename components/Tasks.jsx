import {
  Grid,
  Box,
  Stack,
  Text,
  useColorMode,
  Divider,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TaskCard from "./taskCard";
import { data, statuses } from "../pages/data/index";

const Tasks = () => {
  const { colorMode } = useColorMode();

  const inProgressBG = { light: "teal.300", dark: "teal.700" };
  const doneBG = { light: "blue.300", dark: "blue.700" };

  const [taskList, setTasksList] = useState(data);

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      marginTop="20"
      w="60vw"
      h="80vh"
      gap={10}
    >
      <Box
        bg={inProgressBG[colorMode]}
        rounded="md"
        w="100%"
        p={4}
        boxShadow="md"
      >
        <Stack spacing={3}>
          <Box>
            {/* {statuses.map(({ status }, idx) => (
              <Text
                key={idx}
                fontWeight="semibold"
                fontSize="2xl"
                textAlign="center"
              >
                {status}
              </Text>
            ))} */}

            <Text fontWeight="semibold" fontSize="2xl" textAlign="center">
              In Progress
            </Text>
          </Box>
          <Divider />

          {/* Add Task Card Component Here  */}
          {taskList.map(({ icon, title, status, content }, idx) => (
            <TaskCard
              key={idx}
              icon={icon}
              title={title}
              status={status}
              content={content}
            />
          ))}
        </Stack>
      </Box>

      <Box bg={doneBG[colorMode]} rounded="md" w="100%" p={4} boxShadow="md">
        <Stack spacing={3}>
          <Box>
            <Text fontWeight="semibold" fontSize="2xl" textAlign="center">
              DONE
            </Text>
          </Box>
          <Divider />
        </Stack>
      </Box>
    </Grid>
  );
};

export default Tasks;
