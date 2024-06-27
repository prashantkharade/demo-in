<!-- src/routes/+page.svelte -->
<script>
	import { page } from '$app/stores';

	let email = '';
	let password = '';
	let message = '';


	$: message = $page.status === 200 ? '' : message;
</script>

<!-- For login as user -->
<div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
	<h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
	<form method="post" action="?/login" class="space-y-4">
		<div>
			<label class="block text-sm font-medium text-gray-700">
				Email
				<input
					type="email"
					name="email"
					bind:value={email}
					class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
					required
				/>
			</label>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700">
				Password
				<input
					type="password"
					name="password"
					bind:value={password}
					class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
					required
				/>
			</label>
		</div>
		<div>
			<button
				type="submit"
				class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
				>Login</button
			>
		</div>
		{#if message}
			<div class="mt-4 text-red-500">{message}</div>
		{/if}
	</form>
</div>
