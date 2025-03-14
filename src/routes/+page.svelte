<script lang="ts">
	import type { Concert } from '../lib/$types/Concert';

	import { getConcerts, updateConcert } from '$lib/api';
	import { onMount } from 'svelte';

	let concerts: Array<Concert> = $state([]);
	$inspect(concerts);

	onMount(async () => {
		concerts = await getConcerts();
	});

	async function updateConcertCancelled(concert: Concert) {
		concert.cancelled = !concert.cancelled;
		const updatedConcert = await updateConcert(concert.id, concert);

		concerts = concerts.map((c) => {
			if (c.id === updatedConcert.id) {
				return updatedConcert;
			}

			return c;
		});
	}
</script>

<main class="p-6 text-white min-h-screen">
	<h1 class="text-3xl font-bold mb-4">Koncertek</h1>
	<a
		href="/add-concert"
		class="inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-200 mb-4"
	>
		Koncert hozzáadása
	</a>

	{#if concerts.length === 0}
		<p class="text-gray-400">Nincsenek előadások</p>
	{:else}
		<div class="overflow-x-auto">
			<table class="table-auto w-full border-collapse border border-gray-700">
				<thead>
					<tr class="bg-gray-800">
						<th class="border border-gray-700 px-4 py-2 text-left">Név</th>
						<th class="border border-gray-700 px-4 py-2 text-left">Dátum</th>
						<th class="border border-gray-700 px-4 py-2 text-left">Elmarad</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each concerts as concert}
						<tr
							class="hover:bg-gray-600"
							class:bg-gray-800={concert.cancelled}
						>
							<td class="border border-gray-600 px-4 py-2">{concert.band}</td>
							<td class="border border-gray-600 px-4 py-2">{new Date(concert.date).toLocaleString('HU')}</td>
							<td class="border border-gray-600 px-4 py-2">
								{concert.cancelled ? 'Igen' : 'Nem'}
							</td>
							<td class="border border-gray-600 px-4 py-2">
								<button
									class="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 disabled:opacity-50"
									disabled={concert.cancelled}
									onclick={() => updateConcertCancelled(concert)}
								>
									Elmarad
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</main>
