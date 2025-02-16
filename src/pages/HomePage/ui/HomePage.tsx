import React, { memo, useEffect } from 'react';
import { CalendarWidget } from 'widgets/CalendarWidget';
import { FriendsWidget } from 'widgets/FriendsWidget';
import { NoteWidget } from 'widgets/NoteWidget';
import { UserWidget } from 'widgets/UserWidget';
import { useNavigationStore } from 'entities/Navigation';
import s from './HomePage.module.scss';

const HomePage = memo(() => {
	const { setCurrentService } = useNavigationStore();

	/** Для отрисовки хлебных крошек в навбаре при выборе сервиса */
	useEffect(() => {
		setCurrentService('/');
	}, [setCurrentService]);

	return (
		<div className={s.HomePage}>
			<UserWidget />
			<NoteWidget />
			<CalendarWidget />
			<FriendsWidget />
		</div>
	);
});

export default HomePage;
