const generateLabels = ({data}) => {
  const result = data.map((item) => {
    return item.index
  })
  return result
}

export { generateLabels }