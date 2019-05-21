<template>
	<layout-basic>
		<v-container class="about">
			<p>Congratulations! You have authorized successfully.</p>
			<p>
				username: <strong class="mr-3">{{ me.username }}</strong
				>role: <strong>{{ me.role }}</strong>
			</p>
			<pre>
        <code class="language-javascript">{{routerjs}}</code>
      </pre>
		</v-container>
	</layout-basic>
</template>
<script>
import { mapState } from "vuex";
import prismjs from "prismjs";
export default {
	computed: {
		...mapState(["me"]),
		routerjs() {
			return require("!!raw-loader!../router.js").default.trim();
		}
	},
	mounted() {
		prismjs.highlightAll();
	}
};
</script>
