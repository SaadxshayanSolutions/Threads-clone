import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config();

async function start() {
  const app = express();
  const PORT = process.env.PORT;

  //Create Graphql server

  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world",
      },
    },
  });

  //Start gql server

  app.use(express.json());

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server is started at PORT: ${PORT}`);
  });
}

start();
