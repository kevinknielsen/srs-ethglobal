interface Message {
  text: string;
  isUser: boolean;
}

export const sampleMessages: Message[] = [
  {
    text: "Welcome to the Steel River Saints fan chat! We're excited to have you here.",
    isUser: false
  },
  {
    text: "Thanks! Love the new single!",
    isUser: true
  },
  {
    text: "Glad you're enjoying it! We've got more coming soon. Stay tuned for some behind-the-scenes content from our latest recording session.",
    isUser: false
  },
  {
    text: "Can't wait to hear what's next!",
    isUser: true
  },
  {
    text: "Working on something special for our members. It's going to be a game-changer!",
    isUser: false
  }
];
