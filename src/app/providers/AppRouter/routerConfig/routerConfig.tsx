import { RouteProps } from 'react-router-dom';
import { CalendarPage } from 'pages/CalendarPage';
import { FriendsPage } from 'pages/FriendsPage';
import { HomePage } from 'pages/HomePage';
import { NotesPage } from 'pages/NotesPage';
import { WelcomePage } from 'pages/WelcomePage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

/** Конфигурация путей всего приложения */
export enum Routes {
	MAIN = 'main',
	NOTES = 'notes',
	WELCOME = 'welcome',
	FRIENDS = 'friends',
	CALENDAR = 'calendar',
}

export type Path = '/' | '/notes' | '/welcome' | '/friends' | '/calendar';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAIN]: '/',
	[Routes.NOTES]: '/notes',
	[Routes.WELCOME]: '/welcome',
	[Routes.FRIENDS]: '/friends',
	[Routes.CALENDAR]: '/calendar',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	// должна быть главная страница, но сейчас просто редирект на заметки
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <HomePage />,
		authOnly: true,
	},
	[Routes.NOTES]: {
		path: RoutesPaths.notes,
		element: <NotesPage />,
		authOnly: true,
	},
	[Routes.WELCOME]: {
		path: RoutesPaths.welcome,
		element: <WelcomePage />,
	},
	[Routes.FRIENDS]: {
		path: RoutesPaths.friends,
		element: <FriendsPage />,
		authOnly: true,
	},
	[Routes.CALENDAR]: {
		path: RoutesPaths.calendar,
		element: <CalendarPage />,
		authOnly: true,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
