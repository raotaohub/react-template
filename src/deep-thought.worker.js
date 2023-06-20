function computeCount() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 5000)
  })
}
self.onmessage = async ({ data: { question } }) => {
  const count = await computeCount()

  self.postMessage({
    answer: count,
  })
}
