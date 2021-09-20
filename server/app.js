const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(cors());

/* Connect to MongoDB Atlas and if success, launch the server */
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, () => {
      console.log(`Server listen at port: ${PORT}`);
    }))
  .catch((err) => console.log(err));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// app.listen(4000, () => {
//   console.log('Server listen on port ' + PORT);
// });