import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: '#212121',
					350: '#424242',
					300: '#6E6E6E'
				},
				text: {
					DEFAULT: '#F7F7F7'
				},
				primary: {
					DEFAULT: '#5D2BFD',
					300: '#5628E8',
					500: '#4717E1'
				},
				secondary: {
					DEFAULT: '#FAD403',
					300: '#FDE03F',
					500: '#FCE040'
				},
				qItaly: {
					primary: '#13b596'
				},
				white: {
					DEFAULT: '#F7F7F7'
				}
			},
			borderRadius: {
				DEFAULT: '5px'
			},
		}
	},
	plugins: []
};
export default config;
