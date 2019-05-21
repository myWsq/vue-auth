<template>
	<v-app>
		<v-content>
			<v-container fill-height>
				<v-layout justify-center align-center>
					<v-card class="login-card">
						<v-container>
							<h1 class="primary--text text-xs-center mb-5">LOGIN</h1>
							<template>
								<v-form v-model="form._valid" ref="form" lazy-validation>
									<v-text-field
										placeholder="any text"
										label="Username"
										v-model="form.username"
										:rules="[v => !!v || 'Username is required']"
										required
									></v-text-field>
									<v-text-field
										placeholder="any text"
										label="Password"
										v-model="form.password"
										type="password"
										:rules="[v => !!v || 'Password is required']"
										required
									></v-text-field>
									<v-btn
										class="mt-4"
										color="primary"
										large
										block
										:loading="loading > 0"
										@click="onSubmit"
										:disabled="!form._valid"
									>
										submit
									</v-btn>
								</v-form>
							</template>
						</v-container>
					</v-card>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import store from "../store.js";

export default {
	data() {
		return {
			form: {
				_valid: false,
				username: "",
				password: ""
			},
			loading: 0
		};
	},
	beforeRouteEnter(to, from, next) {
		next(store.state.me ? from.path : true);
	},
	computed: {
		next() {
			return this.$route.query.next || "/";
		}
	},
	methods: {
		async onSubmit() {
			if (this.$refs.form.validate()) {
				this.loading++;
				console.log(this);
				if (await this.$store.dispatch("login", this.form)) {
					this.$router.replace(this.next);
				}
				this.loading--;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.login-card {
	width: 600px;
	padding: 4%;
}
</style>