// for use as comparator in Array.prototype.sort(comparator)
export default function newestFirst(a, b) {
  const [dateA, dateB] = [
    new Date(a.frontmatter.date),
    new Date(b.frontmatter.date),
  ]

  if (dateA > dateB) return -1 // if a is newer, a comes first
  if (dateB > dateA) return 1 // same with b
  return 0 // it's a tie!
}
