const GraphDatabase = require('neo4j').GraphDatabase;
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const util = require('util');
const readFile = util.promisify(require('fs').readFile);

async function startService() {
  const app = express();

  const neo4jClient = new GraphDatabase('http://monster-hunter-data:7474/db/neo4j/tx');
  const query = util.promisify(neo4jClient.cypher.bind(neo4jClient));
  const schema = buildSchema((await readFile('./schema.graphql', 'utf-8')).toString());

  const rootValue = {
    skills: async ({name, limit}) => {
      let params = {};
      let queryBuilder = ['MATCH(skill:Skill {language:"en"})'];

      // Add Query Part to do Live search by name
      if (name) {
        queryBuilder = [...queryBuilder, 'WITH skill WHERE skill.name =~ $skillName'];
        params = {skillName: `(?i).*${name}.*`}
      }

      queryBuilder = [...queryBuilder, 'RETURN skill'];

      if (limit) {
        queryBuilder = [...queryBuilder, `LIMIT ${limit}`]
      }

      return (await query({ query:`${queryBuilder.join(' ')};`, params}))
        .map(result => result.skill.properties);
    },
    skill: async ({name}) => {
      const results = await query({
        query: 'MATCH(skill:Skill {language:"en"}) WHERE skill.name =~ $skillName RETURN skill',
        params: {skillName: `(?i)${name}`}
      });

      return results[0].skill.properties;
    }
  }

  app.use(express.static(__dirname + '/ui'));

  app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));

  app.get('*', async (req, res) => res.send((await readFile(__dirname + '/ui/index.html')).toString()));

  app.listen(8000, () => console.log('Server started on port 8000'));
}

startService().catch(e => console.log(e));