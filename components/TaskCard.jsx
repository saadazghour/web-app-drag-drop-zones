import { Box, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import itemsTypes from "../utils/itemsTypes";
import { useDrag } from "react-dnd";
import { CardContext } from "./Tasks";

const TaskCard = ({ status, title, content, icon, id }) => {
  const { isDone, isInProgress } = useContext(CardContext);

  const [{ isDragging }, drag] = useDrag({
    // You have to have a type for the drag and drop
    type: itemsTypes.CARD,
    item: { type: itemsTypes.CARD, ID: id },

    // When monitor is Dragging add prop called isDragging to true
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // const handleDrag = (status) => {
  //   if (status === "DONE") {
  //     isDone(id);
  //   } else if (status === "InProgress") {
  //     isInProgress(id);
  //   }
  // };

  return (
    <Box
      ref={drag}
      opacity={isDragging ? 0.8 : 1}
      bg="whiteAlpha.800"
      rounded="md"
      textAlign="center"
      p={2}
      mt={2}
      boxShadow="md"
      // onDrag={() => handleDrag(status)}
    >
      <Text fontWeight="semibold" fontSize="md">
        {status}
      </Text>
      <Text fontWeight="semibold" fontSize="md">
        {title}
      </Text>
      <Text fontWeight="semibold" fontSize="md">
        {content}
      </Text>
      <Text fontWeight="semibold" fontSize="md">
        Buy 2L Milk finaly is free!!
        <span role="img" aria-label="Emoji">
          {icon}
        </span>
      </Text>
    </Box>
  );
};

export default TaskCard;
