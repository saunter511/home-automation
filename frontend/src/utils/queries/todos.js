import { gql } from '@apollo/client';


export const GET_TODOS = gql`
	query getTodos{
  todos{
    id
    description
    completed
    timestamp
  }
  
  
}
`;

export const CREATE_TODO = gql`
mutation createTodo($descripction: String) {
  createTodo(description: $descripction) {
    ok
  }
}`;



export const TOGGLE_TODO = gql`
mutation toggleTodo($id: ID) {
  toggleTodo(id: $id) {
    ok
  }
}`;


