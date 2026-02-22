import { defineConfig } from 'rolldown';

const libName = 'delve';

export default defineConfig(() => {
	return [
		// ['esm', 'js']
		['commonjs', 'js']
	].map(([format, fileExt]) => ({
		input: `src/${libName}.ts`,

		output: {
			file: `dist/${libName}.${fileExt}`,
			format,
			name: libName
		}
	}));
});
