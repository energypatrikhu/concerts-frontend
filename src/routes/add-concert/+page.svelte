<script lang="ts">
	import { goto } from '$app/navigation';
	import { createConcert } from '../../lib/api';

	async function addConcert(e: SubmitEvent) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const band = formData.get('band') as string;
		const date = formData.get('date') as string;
		const length = formData.get('length') as string;
		const cancelled = formData.get('cancelled') as string;

		try {
			await createConcert({
				band,
				date: new Date(date),
				length: parseInt(length),
				cancelled: !!cancelled,
			});

			alert('Koncert hozzáadva!');

			goto('/');
		} catch (error: any) {
			alert(error.response?.data.message.join('\n') || 'Hiba történt!');
		}
	}
</script>

<main class="text-white min-h-screen p-4 flex items-center justify-center">
	<div class="w-full max-w-md">
		<h1 class="text-2xl font-bold text-center">Koncert hozzáadása</h1>
		<a
			href="/"
			class="inline-block mb-4 text-indigo-400 hover:underline"
		>
			Vissza
		</a>

		<form
			onsubmit={addConcert}
			class="space-y-4"
		>
			<label class="block">
				<span class="text-gray-300">Név</span>
				<input
					type="text"
					name="band"
					placeholder="Adja meg a zenekar nevét"
					class="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</label>
			<label class="block">
				<span class="text-gray-300">Dátum</span>
				<input
					type="date"
					name="date"
					placeholder="Válassza ki a dátumot"
					class="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</label>
			<label class="block">
				<span class="text-gray-300">Hossz (perc)</span>
				<input
					type="number"
					name="length"
					placeholder="Adja meg a koncert hosszát percben"
					class="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</label>
			<label class="inline-flex items-center space-x-2">
				<input
					type="checkbox"
					name="cancelled"
					class="rounded-md border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
				/>
				<span class="text-gray-300">Elmarad</span>
			</label>

			<div class="mt-4">
				<button
					type="submit"
					class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Hozzáad
				</button>
			</div>
		</form>
	</div>
</main>
