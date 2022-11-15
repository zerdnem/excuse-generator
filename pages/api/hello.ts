// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  const data = await fetch(`https://excuses.ai/api/trpc/generate.generateExcuse?batch=1`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "0": {
        "json": {
          "messup": req.query.excuse,
          "request": "",
          "professionalism": 100,
          "target": req.query.target
        }
      }
    })

  })
  const result = await data.json()
  console.log(result)

  res.status(200).json(result)
}
