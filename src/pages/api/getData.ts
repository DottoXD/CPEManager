import type { NextApiRequest, NextApiResponse } from "next";
import ZteLib from "@/lib/zteLib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookie = req.headers["cookie"];
  if (!cookie)
    return res.status(400).json({ result: "No cookie header provided." });

  const zteLib = new ZteLib();
  const response = await zteLib.getData(cookie);

  return res.status(200).json(response);
}
