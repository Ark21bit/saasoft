import { defineConfig, transformerVariantGroup, transformerDirectives, presetWind4 } from 'unocss'

export default defineConfig({
	// ...UnoCSS options
	presets: [
		presetWind4()
	],
	transformers: [
		transformerVariantGroup(),
		transformerDirectives(),
	],
	content: {
		pipeline: {
			include: [
				// the default
				/\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
				// include js/ts files
				'src/**/*.{js,ts}',
				'./formkit.theme.ts'
			],
		},
	},
})