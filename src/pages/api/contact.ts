export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	try {
		const contentType = request.headers.get('content-type') || '';
		let body: { name?: string; email?: string; subject?: string; message?: string; honeypot?: string };

		if (contentType.includes('application/json')) {
			body = await request.json();
		} else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
			const formData = await request.formData();
			body = {
				name: formData.get('name')?.toString(),
				email: formData.get('email')?.toString(),
				subject: formData.get('subject')?.toString(),
				message: formData.get('message')?.toString(),
				honeypot: formData.get('honeypot')?.toString(),
			};
		} else {
			return new Response(JSON.stringify({ error: 'Formato de contenido no válido' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Anti-spam Honeypot check
		if (body.honeypot) {
			return new Response(JSON.stringify({ success: true, message: 'Mensaje procesado' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const name = body.name?.trim();
		const email = body.email?.trim();
		const subject = body.subject?.trim() || 'Nuevo mensaje desde el Portafolio';
		const message = body.message?.trim();

		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({ error: 'Por favor, completa todos los campos requeridos (nombre, email y mensaje).' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } },
			);
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(JSON.stringify({ error: 'El formato del correo electrónico no es válido.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const resendApiKey =
			import.meta.env.RESEND_API_KEY ||
			(typeof process !== 'undefined' ? process.env.RESEND_API_KEY : undefined);

		const recipientEmail =
			import.meta.env.CONTACT_EMAIL ||
			(typeof process !== 'undefined' ? process.env.CONTACT_EMAIL : undefined) ||
			'contacto@rauldavid.com';

		if (!resendApiKey) {
			console.warn('[Resend Contact API] RESEND_API_KEY no está configurada en .env. Simulando envío.');
			return new Response(
				JSON.stringify({
					success: true,
					message: 'Mensaje recibido correctamente (modo simulación sin API key).',
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		}

		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${resendApiKey}`,
			},
			body: JSON.stringify({
				from: 'Portafolio <onboarding@resend.dev>',
				to: [recipientEmail],
				reply_to: email,
				subject: `[Portfolio Contacto] ${subject}`,
				html: `
					<h2>Nuevo mensaje de contacto</h2>
					<p><strong>Nombre:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Asunto:</strong> ${subject}</p>
					<hr />
					<p><strong>Mensaje:</strong></p>
					<p style="white-space: pre-wrap;">${message}</p>
				`,
			}),
		});

		if (!resendResponse.ok) {
			const errData = await resendResponse.json().catch(() => ({}));
			console.error('[Resend Error]', errData);
			return new Response(
				JSON.stringify({ error: 'No se pudo enviar el correo mediante Resend. Inténtalo más tarde.' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } },
			);
		}

		return new Response(
			JSON.stringify({ success: true, message: '¡Tu mensaje ha sido enviado exitosamente! Te responderé a la brevedad.' }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	} catch (error) {
		console.error('[Contact API Exception]', error);
		return new Response(
			JSON.stringify({ error: 'Ocurrió un error inesperado al procesar tu solicitud.' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		);
	}
};
