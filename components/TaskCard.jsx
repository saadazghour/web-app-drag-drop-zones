import { Box, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import itemsTypes from "../utils/itemsTypes";
import { useDrag } from "react-dnd";

const TaskCard = ({ status, title, content, icon, id }) => {
  const [{ isDragging }, drag] = useDrag({
    // You have to have a type for the drag and drop
    type: itemsTypes.CARD,
    item: { type: itemsTypes.CARD, ID: id },

    // When monitor is Dragging add prop called isDragging to true
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      opacity={isDragging ? 0.8 : 1}
      bg="whiteAlpha.800"
      rounded="md"
      p={4}
      boxShadow="md"
    >
      <Text fontWeight="semibold" fontSize="xl" textAlign="start">
        {status}
      </Text>
      <Text fontWeight="semibold" fontSize="xl" textAlign="start">
        {title}
      </Text>
      <Text fontWeight="semibold" fontSize="xl" textAlign="start">
        {content}
      </Text>
      <Text fontWeight="semibold" fontSize="xl" textAlign="start">
        Buy 2L Milk finaly is free!!
        <span role="img" aria-label="Emoji">
          {icon}
        </span>
      </Text>
    </Box>
  );
};

export default TaskCard;
