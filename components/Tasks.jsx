import {
  Grid,
  Box,
  Stack,
  Text,
  useColorMode,
  Divider,
  GridItem,
} from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import TaskCard from "./taskCard";
import { data, statuses } from "../pages/data/index";
import BoxTarget from "./BoxTarget";

export const CardContext = createContext({
  isDone: (id) => {},
});

const Tasks = () => {
  const { colorMode } = useColorMode();

  const inProgressBG = { light: "teal.300", dark: "teal.700" };
  const doneBG = { light: "blue.300", dark: "blue.700" };

  const [taskList, setTasksList] = useState(data);

  const isDone = (id) => {
    const draggedTask = taskList.filter((task) => task.id === id)[0];
    draggedTask.status = "DONE";

    setTasksList((prevState) => {
      const newItems = prevState
        .filter((task) => task.id !== id)
        .concat(draggedTask);

      return newItems;
    });
  };

  return (
    <CardContext.Provider value={{ isDone }}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        marginTop="10"
        w="60vw"
        h="40vh"
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
            {taskList
              .filter((task) => task.status === "InProgress")
              .map(({ icon, title, status, content, id }, idx) => (
                <TaskCard
                  id={id}
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
              <Divider />
            </Box>

            <BoxTarget>
              {/* Add Task Card Component Here  */}
              {taskList
                .filter((task) => task.status === "DONE")
                .map(({ icon, title, status, content, id }, idx) => (
                  <TaskCard
                    id={id}
                    key={idx}
                    icon={icon}
                    title={title}
                    status={status}
                    content={content}
                  />
                ))}
            </BoxTarget>
          </Stack>
        </Box>
      </Grid>
    </CardContext.Provider>
  );
};

export default Tasks;
