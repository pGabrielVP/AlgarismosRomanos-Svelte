<script lang="ts">
	import { DeRomano } from '$lib/conversores/DeRomano';
	import { ParaRomano } from '$lib/conversores/ParaRomano';

	import type { PageProps } from './$types';

	const VALID_ALGARISMS_REGEX: RegExp =
		/^(_M){0,3}((_C_M)|(_C_D)|(_D)?(_C){0,3})((_X_C)|(_X_L)|(_L)?(_X){0,3})((_I_X)|(_I_V)|(_V)?)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

	let { data }: PageProps = $props();
	let valor: string = $derived.by(() => {
		const query: string = data.query;
		if (query === null || query === undefined || query.trim() === '') {
			return '';
		}

		// Tenta converter como algarismos romanos
		let algarismos: string = query.toUpperCase();
		if (VALID_ALGARISMS_REGEX.test(algarismos)) {
			return DeRomano.paraDecimal(algarismos).toString();
		}

		// Tenta converter como número decimal
		let numero: number = Number(query);
		if (!isNaN(numero) && numero > 0 && numero < 4000000) {
			return ParaRomano.deDecimal(numero);
		} else {
			return 'Somente números entre 1 e 3999999';
		}
	});
</script>

<main class="main">
	<div class="top">
		<p>Digite um valor a ser convertido e aperte o botão "Converter".</p>
		<p>Suporta números até _M_M_M_C_M_X_C_I_XCMXCIX ou 3999999</p>
		<p>_ (underscore) é usado como vinculum</p>
	</div>
	<form action="/" method="get">
		<input type="text" name="q" placeholder="Digite um valor a ser convertido" value={data.query} />
		<button type="submit">Converter</button>
	</form>
	<p class="canhota">Valor Convertido:</p>
	<p>{valor}</p>
</main>

<style>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main .canhota {
		align-self: flex-start;
		margin-left: 15%;
	}
	.main > p {
		margin: 0.4rem;
	}
</style>
