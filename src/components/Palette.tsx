import React, { useState } from "react";
import { CompactPicker, ColorResult } from "@hello-pangea/color-picker";

const colorChoices = [
  "#0f0f12",
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
  "#77388c"
]

const Palette = () => {
  const [color, setColor] = useState('#ffffff');
  const handleChangeComplete = (c: ColorResult) => {
    setColor(c.hex)
  }

  return (
    <CompactPicker
      color={color}
      colors={colorChoices}
      onChangeComplete={handleChangeComplete}
    />
  )

}

export default Palette;