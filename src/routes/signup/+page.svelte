<script>
	import { page } from '$app/stores';

	let name = '';
	let phone = '';
	let email = '';
	let password = '';
	let message = '';

	// Clear message when the form is re-rendered
	$: message = $page.status === 200 ? '' : message;
</script>

<!-- sign up form -->
<div class="max-w-md mx-auto bg-slate-200 p-8 rounded-md shadow-md h-fit m-20">
	<h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
	<form method="post" action="?/signup" class="space-y-4">
		<div>
			<label class="block text-sm font-medium text-gray-700">
				Name
				<input
					type="text"
					name="name"
					bind:value={name}
					class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
					required
				/>
			</label>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700">
				Phone
				<input
					type="text"
					name="phone"
					bind:value={phone}
					class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
					required
				/>
			</label>
		</div>
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
				>Sign Up</button
			>
		</div>
		{#if message}
			<div class="mt-4 text-red-500">{message}</div>
		{/if}
	</form>
</div>
