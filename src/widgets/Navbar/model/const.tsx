import { CSSProperties, ReactNode } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Path } from 'app/providers/AppRouter';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import FriendsIcon from 'shared/assets/icons/friends.svg';
import NoteIcon from 'shared/assets/icons/note.svg';

export type TModuleItem = {
	name: string;
	Icon?: ReactNode;
};

const baseIconStyles: CSSProperties = {
	maxHeight: '80px',
};

export const MODULES: Record<Path, TModuleItem> = {
	['/']: {
		name: '',
	},
	['/notes']: {
		name: 'Заметки',
		Icon: <NoteIcon style={baseIconStyles} />,
	},
	['/welcome']: {
		name: 'Добро пожаловать на UniShare!',
	},
	['/friends']: {
		name: 'Друзья',
		Icon: <FriendsIcon style={baseIconStyles} />,
	},
	['/calendar']: {
		name: 'Календарь',
		Icon: <CalendarIcon style={baseIconStyles} />,
	}
};
