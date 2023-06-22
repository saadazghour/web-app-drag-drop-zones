import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { statuses } from "../pages/data/index";
import itemsTypes from "../utils/itemsTypes";
import { Box } from "@chakra-ui/react";
import { CardContext } from "./Tasks";

const BoxTarget = ({ children, status }) => {
  const { isDone } = useContext(CardContext);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemsTypes.CARD,

    drop: (item, monitor) => isDone(item.ID),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),

    // canDrop: (item, monitor) => {
    //   // opacity: monitor.isDragging() ? 0.5 : 1,
    //   // console.log("Items loggg", item);

    //   const itemIndex = statuses.findIndex((el) => el.status === item.status);

    //   // console.log("itemIndex", itemIndex);

    //   const statusIndex = statuses.findIndex((el) => el.status === status);

    //   return [itemIndex + 1, itemIndex - 1].includes(statusIndex);
    // },
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
