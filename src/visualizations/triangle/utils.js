// simple wrapper for x/y coordinates
export const Point = (x, y) => ({ x, y })

// does what it says on the tin, really
export const halfwayPoint = (pointA, pointB) => {
  const newX = (pointA.x + pointB.x) / 2
  const newY = (pointA.y + pointB.y) / 2

  return Point(newX, newY)
}

// given an array, returns a random member of that array. No cleverness for
// handling sparse arrays or anything like that.
export const sample = arr => arr[Math.floor(Math.random() * arr.length)]

// Essentially a size-bounded collection with FIFO semantics for ejecting
// overflow contents once the maximum size has been reached. The name is a
// misnomer, since I don't bother implementing circular iteration, but the
// inspiration came from the emacs kill-ring
// (https://www.gnu.org/software/emacs/manual/html_node/emacs/Kill-Ring.html)
export class Ring {
  constructor(initialContents = [], { maxSize, minSize }) {
    this.data = initialContents
    this.actualMax = maxSize || 2000
    this.actualMin = minSize || 60
    this.maxSize = this.actualMax
  }

  removeOverflow() {
    // Drop the oldest item(s) as needed. Uses a while loop to handle the case
    // where the maxSize is dynamically updated
    while (this.data.length >= this.maxSize) this.data.shift()
  }

  push(item) {
    this.data.push(item)

    this.removeOverflow()
  }

  resize(proposedMax) {
    const aboveMin = Math.max(proposedMax, this.actualMin)
    const safeMax = Math.min(aboveMin, this.actualMax)

    this.maxSize = safeMax
    this.removeOverflow()
  }

  resizeToPct(percent) {
    const newMax = (percent / 100) * this.actualMax
    this.resize(newMax)
  }

  resizeBy(count) {
    this.resize(this.maxSize + count)
  }

  length() {
    return this.data.length
  }
}
