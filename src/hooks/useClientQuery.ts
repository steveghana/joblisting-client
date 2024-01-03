// // hooks.ts
// import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
// import { IClient } from '../types/client';
// import { clientData } from '../lib/data/clientData';

// export function useCreateClient() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (user: IClient) => {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             return Promise.resolve();
//         },
//         onMutate: (newUserInfo: IClient) => {
//             queryClient.setQueryData(
//                 ['users'],
//                 (prevUsers: any) =>
//                     [
//                         ...prevUsers,
//                         {
//                             ...newUserInfo,
//                             id: (Math.random() + 1).toString(36).substring(7),
//                         },
//                     ] as IClient[]
//             );
//         },
//     });
// }

// export function useGetClients() {
//     return useQuery<IClient[]>({
//         queryKey: ['users'],
//         queryFn: async () => {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             return Promise.resolve(clientData);
//         },
//         refetchOnWindowFocus: false,
//     });
// }

// export function useUpdateClient() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (user: IClient) => {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             return Promise.resolve();
//         },
//         onMutate: (newUserInfo: IClient) => {
//             queryClient.setQueryData(['users'], (prevUsers: any) =>
//                 prevUsers?.map((prevUser: IClient) => (prevUser.email === newUserInfo.email ? newUserInfo : prevUser))
//             );
//         },
//     });
// }

// export function useDeleteClient() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (userId: string) => {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             return Promise.resolve();
//         },
//         onMutate: (userId: string) => {
//             queryClient.setQueryData(['users'], (prevUsers: any) =>
//                 prevUsers?.filter((user: IClient) => user.email !== userId)
//             );
//         },
//     });
// }
