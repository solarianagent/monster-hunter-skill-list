class Neo4JQueryService {
  /**
   * 
   * @param {string} query - neo4j query to run
   * @param {*} parameters - parameters in key, value (json object) form
   * @returns {Promise<any[]>} - list of results
   */
  async query(query, parameters={}) {
    const searchBody = {
      "statements": [
        { "statement": query, parameters }
      ]
    };

    const response = await fetch('/query', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(searchBody)
    });

    return (await response.json()).results[0].data.map(({row}) => row);
  }
}

export const neo4JQueryService = new Neo4JQueryService();