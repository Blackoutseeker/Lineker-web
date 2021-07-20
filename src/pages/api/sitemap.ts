import { NextApiRequest, NextApiResponse } from 'next'
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/login', changefreq: 'daily', priority: 1 }
  ]
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` })
  res.writeHead(200, {
    'Content-Type': 'application/xml'
  })
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data: { toString: () => any }) => data.toString())
  res.end(xmlString)
}
