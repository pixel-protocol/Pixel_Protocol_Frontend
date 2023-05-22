import React, { useState } from "react";
import { CompactPicker, ColorResult } from "@hello-pangea/color-picker";

const colorChoices = [
  "#0f0f12",
  '#FFFFFF',
  "#505359",
  "#b6bfbc",
  "#f2fbff",
  "#5ee7ff",
  "#00a1db",
  "#1d5bb8",
  "#1f2c66",
  "#1b5245",
  "#2e8f46",
  "#58d92e",
  "#cbff70",
  "#ffff8f",
  "#ffdf2b",
  "#f0771a",
  "#e32239",
  "#851540",
  "#401a24",
  "#9c3b30",
  "#c95d3c",
  "#ed8a5f",
  "#ffbca6",
  "#eb75be",
  "#77388c",
]

const MintPalette = ({ color, onClick }) => {
  const handleChangeComplete = (c: ColorResult) => {
    onClick(c.hex)
  }

  return (
    <CompactPicker
      color={color}
      colors={colorChoices}
      onChangeComplete={(c: ColorResult) => onClick(c)}
      styles={{ compact: { width: "260px" } }}
    />
  )

}

export default MintPalette;