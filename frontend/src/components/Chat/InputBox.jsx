import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { SEND_MESSAGE } from 'Utils/Queries/chat';

const InputBoxForm = styled.form`
	width: 100%;
	height: 20%;

	padding: 7px 0;

	& input {
		border-radius: 5px;
		border: none;

		padding: 0 10px;

		background: ${(p) => p.theme.background};
		color: ${(p) => p.theme.text.primary};

		width: 100%;
		height: 100%;
		&:focus {
			outline: none;
		}
	}
`;

const InputBox = () => {
	const { register, handleSubmit, reset } = useForm();

	const [sendMessage] = useMutation(SEND_MESSAGE);

	const submitMessage = (data) => {
		sendMessage({ variables: { message: data.msg } });
		reset();
	};

	return (
		<InputBoxForm onSubmit={handleSubmit(submitMessage)}>
			<input
				ref={register({ required: true })}
				type="text"
				name="msg"
				placeholder="Type your message"
			/>
		</InputBoxForm>
	);
};

export default InputBox;
