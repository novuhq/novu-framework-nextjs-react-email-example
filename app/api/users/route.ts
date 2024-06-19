import { Novu } from '@novu/node';

const novu = new Novu('<NOVU_API_KEY>');

export async function POST(request: Request) {
  const res = await request.json();

  await novu.trigger('new-signup', {
    to: {
      subscriberId: 'novu-sub',
    },
    payload: {
      email: res.email,
      username: res.username,
    },
  });

  console.log('triggered')
  return Response.json({ success: true });
}
