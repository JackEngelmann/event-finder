import { useEffect, useState } from "react";

type Dimensions = {
  width: number | undefined
  height: number | undefined
}

export function useDimensions() {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: undefined, height: undefined })

  useEffect(() => {
    function updateDimensions() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return dimensions
}