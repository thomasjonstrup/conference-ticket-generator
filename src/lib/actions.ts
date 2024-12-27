import { contactFormSchema } from './schema';
import { z } from 'zod';

export async function contactFormAction(
  _prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; errors: { [k: string]: string | undefined; }; fields: string[], values: {
    name: string;
    email: string;
    username: string;
} }> {

  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData));

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(data);

    return {
      success: true,
      errors: {},
	  fields: [],
	  values: data
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
		console.log('error.flatten().fieldErrors', error.flatten().fieldErrors)
      return {
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
		fields: Object.keys(error.flatten().fieldErrors)
      };
    }

    return {
      success: false,
      errors: {},
	  fields: [],
	  values: {name: '', email: '', username: ''}
    };
  }
}