import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { users } from '$lib/stores/users';

// Define the user schema
const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

//action for adding the user in store
export const actions = {
    signup: async ({ request }) => {
        const formData = await request.formData();

        //parsing the form data 
        const name = formData.get('name')?.toString() || '';
        const phone = formData.get('phone')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        // Validate form data
        const result = userSchema.safeParse({ name, phone, email, password });

        if (!result.success) {
            // Extract and return validation errors
            const errors = result.error.flatten().fieldErrors;
            const message = Object.values(errors).flat().join(', ');
            return fail(400, { message });
        }

        // Add new user to the store with the next available ID
        users.update((currentUsers) => {
            const nextId = Math.max(0, ...currentUsers.map(user => user.id)) + 1;
            return [
                ...currentUsers,
                { id: nextId, name, phone, email, password }
            ];
        });

        return { status: 200 };
    }
};
