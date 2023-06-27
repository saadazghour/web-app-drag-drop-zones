import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import itemsTypes from "../utils/itemsTypes";
import { Box } from "@chakra-ui/react";
import { CardContext } from "./Tasks";

const BoxTarget = ({ children }) => {
  const { isDone, isInProgress } = useContext(CardContext);

  const [{ isOver }, drop, canDrop] = useDrop({
    accept: itemsTypes.CARD,

    drop: (item, monitor) => isDone(item.ID),
    // canDrop: (item, monitor) => isInProgress(item.ID),

    // canDrop: (item, monitor) => {
    //   if (isInProgress(item.ID)) {
    //     isInProgress(item.ID);
    //   }
    // },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      // canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <Box
      ref={drop}
      minH="600px"
      w="100%"
      p={4}
      rounded="md"
      bg={isOver ? "green.300" : "transparent"}
    >
      {children}
    </Box>
  );
};

export default BoxTarget;
