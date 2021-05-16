exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Rose',
      age: 85,
      email: 'evanpark333@gmail.com'
    })
  }
}