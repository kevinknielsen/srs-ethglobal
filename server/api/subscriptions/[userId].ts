import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: params.userId,
        isActive: true,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return new Response(JSON.stringify({ isSubscribed: !!subscription }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error checking subscription:', error);
    return new Response(JSON.stringify({ error: 'Failed to check subscription' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 