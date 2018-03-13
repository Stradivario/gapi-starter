export const FIND_USER_QUERY_TEST = `
query login($id: Int!) {
    findUser(id: $id) {
        id
        settings {
          username
          firstname
        }
      }
}
`;
