import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { users } from '$lib/stores/users';
// import { users } from '../lib/stores';

/////////////////////////////////////////////////////////////

// Define the login schema
const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

// login action for user login
export const actions = {
    login: async ({ request }) => {

        const formData = await request.formData();

        // Getting form data like email and password
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        // Validate form data
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            // Extract and return validation errors
            const errors = result.error.flatten().fieldErrors;
            const message = Object.values(errors).flat().join(', ');
            return fail(400, { message });
        }

        // check if the user exists in the store
        let userId = null;
        users.subscribe(usersList => {
            const user = usersList.find(user => user.email === email && user.password === password);
            if (user) {
                userId = user.id; // Use the user's ID for redirection
            }
        })();

        if (userId === null) {
            return fail(400, { message: 'Invalid email or password' });
        }

        // Redirect to user's watchlist
        throw redirect(302, `/user/${userId}/watchlist`);
    }
};
