import { CREATE_TODO, GET_TODOS, TOGGLE_TODO, DELETE_TODO, TODO_SUB } from 'Utils/queries/todos';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BoxContent } from 'Theme/Components';

const TodoContainer = styled.span`
	text-decoration: ${(p) => (p.completed ? 'line-through' : 'none')};
`;

const Todo = () => {
	const [task, setTask] = useState('');
	const { data, loading, error, refetch, subscribeToMore } = useQuery(GET_TODOS);
	const [createTodo] = useMutation(CREATE_TODO);

	const [deleteTodo] = useMutation(DELETE_TODO);

	const [toggleTodo] = useMutation(TOGGLE_TODO);

	useEffect(() => {
		refetch();
		subscribeToMore({
			document: TODO_SUB,
			updateQuery: (previousData, { subscriptionData }) => {
				const existing = previousData.todos;
				const incoming = subscriptionData.data.todoCreated;
				const isDuplicate = existing.some(
					(msg) => msg.id == incoming.id && msg.timestamp == incoming.timestamp
				);

				if (isDuplicate) return;

				return {
					todos: [...existing, incoming].sort((a, b) => a.id - b.id),
				};
			},
		});
	}, [refetch, subscribeToMore]);

	if (loading) return null;
	if (error) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		createTodo({ variables: { content: task } });
	};

	const handleDelete = (e, todo) => {
		e.preventDefault();
		deleteTodo({ variables: { id: todo.id } });
	};

	const handleToggle = (e, todo) => {
		e.preventDefault();
		toggleTodo({ variables: { id: todo.id } });
	};

	return (
		<BoxContent>
			{data.todos.map((todo) => (
				<div key={todo.id}>
					<button onClick={(e) => handleToggle(e, todo)}>toggle</button>{' '}
					<TodoContainer completed={todo.completed}>{todo.description}</TodoContainer>{' '}
					<button onClick={(e) => handleDelete(e, todo)}>delete</button>
				</div>
			))}

			<div>
				<form onSubmit={handleSubmit}>
					<input
						placeholder="add a Todo"
						onChange={(e) => setTask(e.target.value)}
						value={task}
					/>
					<button type="submit">Add Todo</button>
				</form>
			</div>
		</BoxContent>
	);
};

export default Todo;
