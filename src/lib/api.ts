import axios from 'axios';
import type { Concert } from './$types/Concert';

export const api = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export async function getConcerts() {
	return (await api.get('/concerts')).data;
}

export async function getConcert(id: number) {
	return (await api.get(`/concerts/${id}`)).data;
}

export async function createConcert(data: Omit<Concert, 'id'>) {
	// @ts-ignore
	delete data.id;

	return await api.post('/concerts', data);
}

export async function updateConcert(id: number, data: Partial<Concert>) {
	delete data.id;
	return (await api.patch(`/concerts/${id}`, data)).data;
}

export async function deleteConcert(id: number) {
	return (await api.delete(`/concerts/${id}`)).data;
}
