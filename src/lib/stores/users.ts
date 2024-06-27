import { writable } from 'svelte/store';

const initialUsers = [
    {
        id: 1,
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        password: 'password123',
    },
    {
        id: 2,
        name: 'Jane Smith',
        phone: '987-654-3210',
        email: 'jane.smith@example.com',
        password: 'password456',
    },
];

export const users = writable(initialUsers);

export const addUser = (newUser: { id: number; name: string; phone: string; email: string; password: string; }) => {
    users.update((currentUsers) => {
        const nextId = Math.max(0, ...currentUsers.map(user => user.id)) + 1;
        return [...currentUsers, { ...newUser, id: nextId }];
    });
};
