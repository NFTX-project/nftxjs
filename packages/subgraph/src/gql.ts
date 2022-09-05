import type { GraphQueryString } from './utils';

/** Processes a graphql string
 * (in actuality this does absolutely nothing and is just a useful way of denoting a graphql query and enables editor syntax highlighting)
 */
function gql(
  s: TemplateStringsArray,
  ...variables: any[]
): GraphQueryString<any, any>;
function gql<R>(
  s: TemplateStringsArray,
  ...variables: any[]
): GraphQueryString<R, any>;
function gql<R, V>(
  s: TemplateStringsArray,
  ...variables: any[]
): GraphQueryString<R, V>;
function gql(s: TemplateStringsArray, ...variables: any[]) {
  return s
    .map((s, i) => {
      if (i === 0) {
        return s;
      }
      return variables[i - 1] + s;
    })
    .join('') as GraphQueryString<any, any>;
}

export default gql;
