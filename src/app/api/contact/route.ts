import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  building: z.string().trim().max(200).optional().default(''),
  help: z.string().trim().min(10).max(5000),
  company: z.string().max(0).optional().default(''),
});

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 20_000) return Response.json({ error: 'Request too large.' }, { status: 413 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.company) return Response.json({ error: 'Please check the form fields.' }, { status: 400 });
  const { name, email, building, help } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) return Response.json({ error: 'Contact delivery is not configured yet.' }, { status: 503 });
  const provider = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `New TIX project inquiry from ${name}`, text: [`Name: ${name}`, `Email: ${email}`, `Building: ${building}`, '', help].join('\n') }) });
  if (!provider.ok) return Response.json({ error: 'We could not deliver your message. Please try again.' }, { status: 502 });
  return Response.json({ ok: true });
}

export function GET() { return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } }); }
