import { serve } from "@novu/framework/next";
import { client, signupWorkflow } from "../../novu/workflows";

export const { GET, POST, PUT } = serve({ client, workflows: [signupWorkflow] });
