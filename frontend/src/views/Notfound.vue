<template>
	<div
		class="page-content d-flex flex-column align-items-center justify-content-center vh-100 vw-100 text-center"
	>
		<h1 class="text-primary display-1 fw-bold">404</h1>
		<h2 class="text-primary mb-3">Page non trouvée</h2>
		<p class="text-muted mb-4">
			Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
		</p>
		<router-link to="/" class="btn btn-primary btn-lg px-4"> Retour à l'accueil </router-link>
		<div>
				<div class="text-4xl font-bold">MatchRoom</div>
	</div>
</template>

<script>
	export default {
		name: "NotFound",
	};
</script>

<style scoped>
	.page-content {
		padding: 20px;
	}
	h1 {
		font-size: 6rem;
	}
	h2 {
		font-size: 2rem;
	}
	p {
		font-size: 1.2rem;
	}
</style>
