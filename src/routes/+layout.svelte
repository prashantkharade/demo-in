<script>
	import '../app.css';
</script>

<!-- Navbar -->
<header class="bg-blue-600 text-white p-4 w-full fixed">
	<div class="container mx-auto flex justify-between items-center">
		<h1 class="text-2xl font-bold">Movie Listing App</h1>
		<nav>
			<a href="/" class="mr-4">Home</a>
			<a href="/user" class="mr-4">Login</a>
			<a href="/signup" class="mr-4">Signup</a>
		</nav>
	</div>
</header>

<slot />

