function setResponse(response, json) {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.json(json);
  return response;
}
