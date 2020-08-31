class GraphQlQueryService {
  async query(graphQlQuery) {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({query: graphQlQuery})
    });

    return (await response.json()).data;
  }
}

export const graphQlQueryService = new GraphQlQueryService();