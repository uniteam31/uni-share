import React, { memo } from 'react';
import { FriendAction } from 'features/Friendship';
import { FriendEntity, useGetIncomingFriendRequests } from 'entities/FriendEntity';
import s from './IncomingFriendsRequestsList.module.scss';

export const IncomingFriendsRequestsList = memo(() => {
	// TODO состояния!
	const { incomingFriendRequests } = useGetIncomingFriendRequests();

	return (
		<div className={s.IncomingFriendsRequestsList}>
			<FriendEntity.List friends={incomingFriendRequests} ActionComponent={FriendAction} />
		</div>
	);
});