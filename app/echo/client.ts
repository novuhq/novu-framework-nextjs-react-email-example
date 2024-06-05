import { Echo } from "@novu/echo";
import { renderReactEmail } from "./vercel-example";
import { renderReactAWSEmail } from "./awsEx";
import { renderReactAppleEmail } from "./apple";



export const echo = new Echo({
  apiKey: '<NOVU_API_KEY>',
  /**
   * Enable this flag only during local development
   */

  // backendUrl: 'https://api.novu.co',
  devModeBypassAuthentication: process.env.NODE_ENV === "development",
});


const newSignup = echo.workflow('new-signup', async ({ step, payload }) => {
  // Send a welcome email
  await step.email('send-email', async (inputs) => {
    return {
      subject: `Welcome to Novu, ${payload.username}`,
      body: renderReactEmail(inputs, payload),
    };
  }, {
    inputSchema: {
      type: "object",
      properties: {
        showJoinButton: { type: "boolean", default: true },
        buttonText: { type: "string", default: "Join the team" },
        userImage: {
          type: "string",
          default: "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-user.png",
          format: "uri",
        },
        invitedByUsername: { type: "string", default: "Alan" },
        invitedByEmail: {
          type: "string",
          default: "alan.turing@example.com",
          format: "email",
        },
        teamName: { type: "string", default: "Team Awesome" },
        teamImage: {
          type: "string",
          default: "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-team.png",
          format: "uri",
        },
        inviteLink: {
          type: "string",
          default: "https://vercel.com/teams/invite/foo",
          format: "uri",
        },
        inviteFromIp: { type: "string", default: "204.13.186.218" },
        inviteFromLocation: {
          type: "string",
          default: "São Paulo, Brazil",
        },
      },
    },
  });
  // JSON Schema for validation and type-safety. Zod, and others coming soon.
}, { payloadSchema: { properties: { text: { type: 'string' } } } });


// const awsEx = echo.workflow('aws-example', async ({ step, payload }) => {
//   // Send a welcome email
//   await step.email('send-email', async () => {
//     return {
//       subject: `Welcome to Novu, ${payload.email}`,
//       body: renderReactAWSEmail(payload.text),
//     }
//   });
//   // JSON Schema for validation and type-safety. Zod, and others coming soon.
// }, { payloadSchema: { properties: { email: { type: 'string' }, text: { type: 'string' } } } });



// const appleEx = echo.workflow('apple-receipt', async ({ step, payload }) => {
//   // Send a welcome email
//   await step.email('send-email', async () => {
//     return {
//       subject: `Welcome to Novu, ${payload.email}`,
//       body: renderReactAppleEmail(payload.text),
//     }
//   });
//   // JSON Schema for validation and type-safety. Zod, and others coming soon.
// }, { payloadSchema: { properties: { email: { type: 'string' }, text: { type: 'string' } } } });
