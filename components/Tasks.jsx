import {
  Grid,
  Box,
  Stack,
  Text,
  useColorMode,
  Divider,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
} from "@chakra-ui/react";
import React, { createContext, useMemo, useState } from "react";
import TaskCard from "./taskCard";
import { data, statuses } from "../pages/data/index";
import { useTable } from "react-table";
import BoxTarget from "./BoxTarget";

export const CardContext = createContext({
  isDone: (id) => {},
  isInProgress: (id) => {},
});

const Tasks = () => {
  const { colorMode } = useColorMode();

  const inProgressBG = { light: "teal.300", dark: "teal.700" };
  const doneBG = { light: "blue.300", dark: "blue.700" };
  const tableBG = { light: "gray.300" };

  const [taskList, setTasksList] = useState(data);
  const [doneTask, setDoneTask] = useState([]);
  const [draggedOk, setDraggedOk] = useState([]);

  const isDone = (id) => {
    const draggedTask = taskList.filter((task) => task.id === id)[0];
    draggedTask.status = "DONE";

    setTasksList((prevState) => {
      const newItems = prevState
        .filter((task) => task.id !== id)
        .concat(draggedTask);

      return newItems;
    });

    setDraggedOk(draggedTask);

    // Set automatically Saved Tasks in the Table without any interaction from Users.

    //  setDoneTask((prevState) => [...prevState, draggedTask]);
  };

  const handleAddTask = () => {
    setDoneTask((prevState) => {
      const isDuplicate = prevState.some((task) => task.id === draggedOk.id);

      if (!isDuplicate) {
        return [...prevState, draggedOk];
      }

      return prevState;
    });
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

  // Using useMemo Hooks to avoid!
  // re-rendering the table every time.

  // The useMemo hook is used for memoization in React. It allows you to memoize the result of a computation and only recompute it when its dependencies change. By using useMemo, you can optimize the performance of your application by avoiding unnecessary computations.

  const columns = useMemo(
    () => [
      {
        Header: "Unique Identifier",
        accessor: "id",
      },
      {
        Header: "Values",
        accessor: "content",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: doneTask });

  return (
    <CardContext.Provider value={{ isDone, isInProgress }}>
      <Grid
        templateColumns="repeat(2,1fr)"
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

        <Box
          bg={tableBG[colorMode]}
          rounded="md"
          templateColumns="1fr"
          p={4}
          marginTop="10"
          h="40vh"
          gap={10}
          boxShadow="md"
        >
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
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
