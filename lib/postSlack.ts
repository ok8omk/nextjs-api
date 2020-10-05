const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const postSlack = async (payload: string) => {
  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
};
