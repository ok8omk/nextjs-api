import {
  createEventHandler,
  WebhookEvent,
  EventNames,
  EventPayloads,
} from "@octokit/webhooks";
import { postSlack } from "lib/postSlack";
import { NextApiRequest, NextApiResponse } from "next";

const eventHandler = createEventHandler({});

eventHandler.on(
  ["issues.opened"],
  (payloads: EventPayloads.WebhookPayloadIssues) => {
    const body = payloads.issue.body;
    const url = payloads.issue.html_url;

    postSlack(`${body} ${url}`);
  }
);

export default (req: NextApiRequest, res: NextApiResponse) => {
  eventHandler.receive({
    id: req.headers["x-github-delivery"] as string,
    name: req.headers["x-github-event"] as EventNames.StringNames,
    payload: req.body,
  });
  res.status(200).json({ name: "John Doe" });
};
