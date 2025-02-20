import type { NextApiRequest, NextApiResponse } from "next";
import ZteLib from "@/lib/zteLib";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { pass } = req.body;
  if (!pass || req.method != "POST")
    return res.status(400).json({ result: "No password parameter provided." });

  const zteLib = new ZteLib();

  const hashPass = crypto
    .createHash("sha256")
    .update(pass)
    .digest("hex")
    .toUpperCase();
  const { LD } = await zteLib.getLD();
  const actualPass = crypto
    .createHash("sha256")
    .update(hashPass + LD)
    .digest("hex")
    .toUpperCase();

  const Cookie = await zteLib.getCookie(actualPass);
  if (Cookie && Cookie[0]) {
    res
      .setHeader(
        "set-cookie",
        Cookie[0]
          .replace("stok", "session")
          .replace(";HttpOnly", ";Max-Age=" + 60 * 60 * 24 * 365),
      )
      .status(200)
      .json({ result: "0" });
  } else res.status(401).json({ result: "Invalid credentials provided." });
}
