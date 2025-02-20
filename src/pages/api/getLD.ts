import type { NextApiRequest, NextApiResponse } from "next";
import ZteLib from "@/lib/zteLib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const zteLib = new ZteLib();
  const LD = await zteLib.getLD();

  res.status(200).json(LD);
}
