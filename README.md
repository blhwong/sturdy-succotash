# Simple Survey

A simple survey API that can create, take, and review results of surveys.

## Implementation Notes
The service uses a simple file service to persist data in a JSON file. If I were to do this in production, I would use a NoSQL database like MongoDB and it wouldn't be too difficult to implement since the data store is already in JSON.

The first layer of the data store are the survey names. This handles nicely so that duplicate survey names aren't added into the data store. The `questions` object within survey have the question names and the count of true and false. Using an object for the data store makes it extremely quick when getting and taking surveys, but it does have a time complexity trade-off in the constructors when creating the data store.

## Installation notes
To install service, Open terminal in the root directory and run:
```
npm install
```

Create a `.env` file in the root directory and copy the `dotenv.dist` file for reference.
```
NODE_ENV=development
PORT=3000
```
To run server:
```
npm start
```

## Developer notes
To run dev server:
```
npm run dev
```
To run tests:
```
npm test
```

## API details

- GET
  - `/survey`
    - Gets the results of survey
    - Use `name` in search query to specify name
    - e.g. `localhost:3000/survey?name=survey%201` will get you the results of survey named `survey 1`
- POST
  - `/survey/create`
    - Creates survey
    - Use `name` (string), and `questionValues` (array of string) to determine the name and questions for the survey
    - `Content-Type: application/json`
    - ```json
      // Request body example
      {
        "name": "survey 1",
        "questionValues": ["Do you like coffee?", "Do you like shopping?"]
      }
      ```
  - `/survey/take`
    - Takes survey
    - Use `name` (string) and `answers` (object) to specify survey name and answers. Answers object contains question name as key and true or false as value.
    - `Content-Type: application/json`
    - ```json
      // Request body example
      {
        "name": "survey 1",
        "answers": {
          "Do you like coffee?": true,
          "Do you like shopping?": false
        }
      }
      ```
