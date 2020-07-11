export const FIND_USER_QUERY_TEST = `
  query findUser($id: Int!) {
    findUser(id: $id) {
      id
      email
      type
      password
      name
      settings {
        sidebar
      }
    }
  }
`;
