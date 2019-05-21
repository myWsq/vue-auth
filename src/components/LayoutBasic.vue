<template>
	<v-app>
		<v-toolbar dark color="primary">
			<v-toolbar-items>
				<v-btn flat to="/">HOME</v-btn>
				<v-btn flat to="/public">PUBLIC</v-btn>
				<v-btn flat to="/admin">ADMIN</v-btn>
				<v-btn flat to="/both">BOTH</v-btn>
			</v-toolbar-items>
			<v-spacer></v-spacer>
			<v-menu v-if="me" offset-y>
				<template v-slot:activator="{ on }">
					<v-btn flat v-on="on">Hi {{ me.username }}</v-btn>
				</template>

				<v-list>
					<v-list-tile @click="onLogout">
						<v-list-tile-title>LOGOUT</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
			<v-btn v-else flat to="/login">LOGIN</v-btn>
		</v-toolbar>
		<v-content class="pt-3">
			<slot></slot>
		</v-content>
		<v-footer height="64px">
			<v-layout row wrap justify-center align-center>
				<h3>
					&copy;&nbsp;<a href="https://wsq.cool" target="__blank">wsq.cool</a>
				</h3>
				<v-btn flat icon href="https://github.com/myWsq/vue-auth-example">
					<v-icon>fab fa-github</v-icon>
				</v-btn>
			</v-layout>
		</v-footer>
	</v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["me"])
	},
	methods: {
		onLogout() {
			this.$router.push("/");
			this.$store.dispatch("logout");
		}
	}
};
</script>

<style lang="scss" scoped>
</style>