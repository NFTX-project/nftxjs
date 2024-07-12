/** Processes a graphql string
 * (in actuality this does absolutely nothing and is just a useful way of denoting a graphql query and enables editor syntax highlighting)
 */
function gql(s: TemplateStringsArray, ...variables: any[]): string {
  return s
    .map((s, i) => {
      if (i === 0) {
        return s;
      }
      return variables[i - 1] + s;
    })
    .join('');
}

export default gql;
