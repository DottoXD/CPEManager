import type { NextApiRequest, NextApiResponse } from "next";
import ZteLib from "@/lib/zteLib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const zteLib = new ZteLib();
  const pre = await zteLib.getPre();

  res.status(200).json(pre);
}
