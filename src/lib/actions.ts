import { contactFormSchema } from './schema';
import { z } from 'zod';

export async function contactFormAction(
	_prevState: unknown,
	formData: FormData
): Promise<{
	success: boolean; errors: { [k: string]: string | undefined; }; fields: string[], values: {
		name: string;
		email: string;
		username: string;
		avatar?: File | null;
	}
}> {

	try {
		const data = contactFormSchema.parse(Object.fromEntries(formData));

		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			success: true,
			errors: {},
			fields: [],
			values: data
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const data = contactFormSchema.parse(Object.fromEntries(formData));

			return {
				success: false,
				errors: Object.fromEntries(
					Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
						key,
						value?.join(', '),
					])
				),
				fields: Object.keys(error.flatten().fieldErrors),
				values: data
			};
		}

		const data = contactFormSchema.parse(Object.fromEntries(formData));

		return {
			success: false,
			errors: {},
			fields: [],
			values: data
		};
	}
}