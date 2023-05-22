import merge from "lodash/merge";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  color: string;
  active: boolean;
  onClick: any;
  index: number;
  styles?: Record<string, React.CSSProperties>;
};

export default function BlockCell({
  color,
  onClick = () => { },
  active,
  index,
  styles: passedStyles = {}
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseEnter = () => {
    console.log(index)
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
    //if (!active) {
    onClick(index);
    //}
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >({
    color: {
      width: "21px",
      height: "21px",
      position: "relative",
      cursor: "pointer",
      border: "0.5px solid",
      borderColor: "gray",
      background: color,
    },
    dot: {
      position: "absolute",
      inset: "6px",
      background: "#FFFFFF",
      borderRadius: "50%",
      opacity: active ? 1 : 0,
    },
  }, passedStyles);

  return (
    <Box
      style={styles.color}
      onClick={() => onClick(index)}
      key={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div style={styles.dot} />
    </Box>
  );
}
