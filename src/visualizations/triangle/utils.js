export const Point = (x, y) => ({ x, y })

export const halfwayBetween = (pointA, pointB) => {
  const newX = (pointA.x + pointB.x) / 2
  const newY = (pointA.y + pointB.y) / 2

  return Point(newX, newY)
}

export const sample = arr => arr[Math.floor(Math.random() * arr.length)]
