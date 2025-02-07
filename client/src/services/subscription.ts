interface SubscriptionData {
  userId: string;
  transactionHash: string;
}

export async function storeSubscription(userId: string, transactionHash: string): Promise<void> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        transactionHash,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to store subscription');
    }
  } catch (error) {
    console.error('Error storing subscription:', error);
    throw error;
  }
}

export async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`/api/subscriptions/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to check subscription status');
    }
    const data = await response.json();
    return data.isSubscribed;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
} 