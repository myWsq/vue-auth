<template>
	<v-app>
		<v-content>
			<v-container fill-height>
				<v-layout column justify-center align-center>
					<img class="icon" src="../assets/lock.svg" alt="lock" />
					<h1 class="text-xs-center">
						I'm sorry <br />but you...can't have that
					</h1>
					<p v-if="me && requiredRoles">
						required role:
						<strong class="mx-1">{{ requiredRoles }} </strong>current role:
						<strong>{{ me.role }}</strong>
					</p>
					<v-btn color="primary" @click="onBack">Go Back</v-btn>
				</v-layout>
			</v-container>
		</v-content>
		<v-footer height="64px">
			<v-layout justify-center wrap class="px-2">
				Icons made by&nbsp;
				<a
					href="https://www.flaticon.com/authors/pixel-perfect"
					title="Pixel perfect"
					>Pixel perfect</a
				>
				&nbsp; from &nbsp;
				<a href="https://www.flaticon.com/" title="Flaticon"
					>www.flaticon.com</a
				>
				&nbsp; is licensed by &nbsp;
				<a
					href="http://creativecommons.org/licenses/by/3.0/"
					title="Creative Commons BY 3.0"
					target="_blank"
					>CC 3.0 BY</a
				>
			</v-layout>
		</v-footer>
	</v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["me"]),
		requiredRoles() {
			return this.$route.query.required;
		}
	},
	methods: {
		onBack() {
			this.$router.back();
		}
	}
};
</script>


<style lang="scss" scoped>
.icon {
	width: 300px;
	margin-bottom: 30px;
}
</style>