import { useState } from "react";

const isFull = () => {
  const [isFull, setIsFull] = useState(false)

  const ScreenOpen = () => {
    setIsFull(true)
  }

  const screenClose = () => {
    setIsFull(false)
  }

  return {
    isFull,
    ScreenOpen,
    screenClose,
  }
}
export default isFull