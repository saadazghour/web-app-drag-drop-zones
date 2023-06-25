import {
  Grid,
  Box,
  Stack,
  Text,
  useColorMode,
  Divider,
  GridItem,
  Button,
} from "@chakra-ui/react";
import React, { createContext, useMemo, useState } from "react";
import TaskCard from "./taskCard";
import { data, statuses } from "../pages/data/index";
import BoxTarget from "./BoxTarget";
import TableContent from "./TableContent";

export const CardContext = createContext({
  isDone: (id) => {},
  isInProgress: (id) => {},
});

const Tasks = () => {
  const { colorMode } = useColorMode();

  const inProgressBG = { light: "teal.300", dark: "teal.700" };
  const doneBG = { light: "blue.300", dark: "blue.700" };
  const tableBG = { light: "blue.100" };

  const [taskList, setTasksList] = useState(data);
  const [doneTask, setDoneTask] = useState([]);

  const isDone = (id) => {
    const draggedTask = taskList.filter((task) => task.id === id)[0];
    draggedTask.status = "DONE";

    setTasksList((prevState) => {
      const newItems = prevState
        .filter((task) => task.id !== id)
        .concat(draggedTask);

      return newItems;
    });

    // Set automatically Saved Tasks in the Table without any interaction from Users.

    //  setDoneTask((prevState) => [...prevState, draggedTask]);
  };

  const handleAddTask = () => {
    setDoneTask(() => taskList.filter((task) => task.status === "DONE"));
  };

  const isInProgress = (id) => {
    const draggedTask = taskList.filter((task) => task.id === id)[0];
    draggedTask.status = "InProgress";

    setTasksList((prevState) => {
      const newItems = prevState
        .filter((task) => task.id !== id)
        .concat(draggedTask);

      return newItems;
    });
  };

  return (
    <CardContext.Provider value={{ isDone, isInProgress }}>
      <Grid
        templateColumns="repeat(2, 1fr)" // Two columns for the top section
        marginTop="10"
        w="60vw"
        h="100vh" // Adjust the height to fit the desired space
        gap={10}
      >
        <Box
          bg={inProgressBG[colorMode]}
          rounded="md"
          w="100%"
          p={4}
          boxShadow="md"
          // gridColumn="span " // Span across both columns
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

        <Box
          bg={tableBG[colorMode]}
          rounded="md"
          p={4}
          marginTop="10"
          h="40vh"
          gap={10}
          boxShadow="md"
          overflowY="auto" // Enable vertical scrolling
          gridColumn="span 2" // Span across both columns
        >
          <TableContent doneTask={doneTask} />
        </Box>
      </Grid>

      <Box mt={6} ml={4} w="40px">
        <Button mt={4} colorScheme="purple" onClick={handleAddTask}>
          Save DONE Tasks
        </Button>
      </Box>
    </CardContext.Provider>
  );
};

export default Tasks;
