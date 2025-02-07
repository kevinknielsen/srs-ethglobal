import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, transactionHash } = await request.json();

    // Add 30 days to current date for subscription expiration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        transactionHash,
        expiresAt,
      },
    });

    return new Response(JSON.stringify(subscription), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(JSON.stringify({ error: 'Failed to create subscription' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 