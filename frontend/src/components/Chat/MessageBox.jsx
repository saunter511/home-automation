import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { format, isToday } from 'date-fns';

import { Loading } from 'Theme/Components';
import { GET_MESSAGES, MESSAGE_SUB } from 'Utils/Queries/chat';

const MessageBoxWrapper = styled.div`
	overflow-y: scroll;
	height: 80%;
`;

const MessageWrapper = styled.div`
	display: flex;

	& div:first-child {
		font-weight: 400;
		margin-right: 5px;
	}

	& div:nth-child(2) {
		font-weight: 700;
		margin-right: 5px;
	}
`;

const Message = ({ msg }) => {
	const timestamp = isToday(msg.timestamp)
		? format(msg.timestamp, 'HH:mm:ss')
		: format(msg.timestamp, 'yyyy-MM-dd HH:mm:ss');

	return (
		<MessageWrapper>
			<div>{timestamp}</div>
			<div title={msg.author.fullName}>{msg.author.shortName}</div>
			<div>{msg.content}</div>
		</MessageWrapper>
	);
};

Message.propTypes = {
	msg: PropTypes.obj,
};

const MessageBox = () => {
	const { data, loading, error, refetch, subscribeToMore } = useQuery(GET_MESSAGES);
	const messageContainer = useRef();

	useEffect(() => {
		refetch();
		subscribeToMore({
			document: MESSAGE_SUB,
			updateQuery: (previousData, { subscriptionData }) => {
				const existing = previousData.chatMessages;
				const incoming = subscriptionData.data.chatMessageSent;

				const isDuplicate = existing.some(
					(msg) => msg.id == incoming.id && msg.timestamp == incoming.timestamp
				);

				if (isDuplicate) return;

				return {
					chatMessages: [...existing, incoming].sort((m1, m2) => m1.id - m2.id),
				};
			},
		});
	}, [refetch, subscribeToMore]);

	useEffect(() => {
		if (messageContainer.current) {
			messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
		}
	}, [data]);

	if (loading || error) return <Loading />;

	const messages = data.chatMessages.map((msg) => {
		return { ...msg, timestamp: new Date(msg.timestamp) };
	});

	return (
		<MessageBoxWrapper ref={messageContainer}>
			{messages.map((msg) => (
				<Message key={msg.timestamp} msg={msg} />
			))}
		</MessageBoxWrapper>
	);
};

export default MessageBox;
