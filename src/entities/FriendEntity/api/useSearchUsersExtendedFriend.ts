import useSWR from 'swr';
import type { IUser } from 'entities/User';
import axiosInstance from 'shared/api/axiosInstance';
import type { ApiResponse } from 'shared/api/types';
import { useDebounceValue } from 'shared/hooks/useDebounceValue/useDebounceValue';
import { getApiResponseErrorMessage } from 'shared/lib/getApiResponseErrorMessage/getApiResponseErrorMessage';
import type { IFriendEntity } from '../model/types/friendEntity';

interface ISearchUserProps {
	username: IUser['username'];
}

type TSearchUsersExtendedFriendResponse = ApiResponse<IFriendEntity['friends']>;

export const useSearchUsersExtendedFriend = (props: ISearchUserProps) => {
	const { username } = props;
	const debouncedUsername = useDebounceValue(username, 300);

	const fetcher = () =>
		axiosInstance
			.get<TSearchUsersExtendedFriendResponse>('/users', {
				params: {
					username: debouncedUsername,
				},
			})
			.then((response) => response.data.data);

	const { isValidating, data, error, mutate } = useSWR(
		`/api/users?username=${debouncedUsername}`,
		fetcher,
	);

	const foundUsers = data || [];

	return {
		foundUsers,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutateFoundUsers: mutate,
	};
};
