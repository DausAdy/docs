import { describe, expect, test } from 'vitest'

import { SURROGATE_ENUMS } from '@/frame/middleware/set-fastly-surrogate-key'
import { get } from '@/tests/helpers/e2etest'

describe('honeypotting', () => {
  test('any GET with survey-vote and survey-token query strings is 400', async () => {
    const res = await get('/en?survey-vote=1&survey-token=2')
    expect(res.statusCode).toBe(400)
    expect(res.body).toMatch(/Honeypotted/)
    expect(res.headers['cache-control']).toMatch('private')
  })
})

describe('junk paths', () => {
  test('junk full pathname', async () => {
    const res = await get('/xmlrpc.php')
    expect(res.statusCode).toBe(404)
    expect(res.headers['content-type']).toMatch('text/plain')
    expect(res.headers['cache-control']).toMatch('public')
  })

  test('junk base name', async () => {
    const res = await get('/en/get-started/.env.local')
    expect(res.statusCode).toBe(404)
    expect(res.headers['content-type']).toMatch('text/plain')
    expect(res.headers['cache-control']).toMatch('public')
  })

  test.each(['/_nextanything', '/_next/data', '/_next/data/', '/_next/cgi/bin.foo'])(
    'invalid requests for _next prefix %s',
    async (path) => {
      const res = await get(path)
      expect(res.statusCode).toBe(404)
      expect(res.headers['content-type']).toMatch('text/plain')
      expect(res.headers['cache-control']).toMatch('public')
    },
  )

  test('just _next', async () => {
    const res = await get('/_next')
    expect(res.statusCode).toBe(404)
  })

  test('with a starting /en/ but with a junk end', async () => {
    const res = await get('/en/package-lock.json')
    expect(res.statusCode).toBe(404)
    expect(res.headers['content-type']).toMatch('text/plain')
  })
})

describe('index.md and .md suffixes', () => {
  test('any URL that ends with /index.md redirects', async () => {
    // With language prefix
    {
      const res = await get('/en/get-started/index.md')
      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toBe('/en/get-started')
    }
    // Without language prefix
    {
      const res = await get('/get-started/index.md')
      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toBe('/get-started')
    }
    // With query string
    {
      const res = await get('/get-started/index.md?foo=bar')
      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toBe('/get-started?foo=bar')
    }
  })

  // TODO-ARTICLEAPI: unskip tests or replace when ready to ship article API
  test('any URL that ends with /.md redirects', async () => {
    // With language prefix
    {
      const res = await get('/en/get-started/hello.md')
      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toBe('/api/article/body?pathname=/en/get-started/hello')
    }
    // Without language prefix
    {
      const res = await get('/get-started/hello.md')
      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toBe('/api/article/body?pathname=/get-started/hello')
    }
    // With query string
    {
      const res = await get('/get-started/hello.md?foo=bar')
      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toBe('/api/article/body?pathname=/get-started/hello')
    }
  })
})

describe('404 pages and their content-type', () => {
  const exampleNonLanguage404plain = ['/_next/image/foo']
  test.each(exampleNonLanguage404plain)(
    'non-language 404 response is plain text and cacheable: %s',
    async (pathname) => {
      const res = await get(pathname)
      expect(res.statusCode).toBe(404)
      expect(res.headers['content-type']).toMatch('text/plain')
      expect(res.headers['cache-control']).toMatch('public')
    },
  )

  const exampleNonLanguage404s = [
    '/wp-content/themes/seotheme/db.php?u',
    '/enterprise/3.1/_next/static/chunks/616-910d0397bafa52e0.js',
    '/~root',
  ]
  test.each(exampleNonLanguage404s)(
    'non-language 404 response is html text and cacheable: %s',
    async (pathname) => {
      const res = await get(pathname)
      expect(res.statusCode).toBe(404)
      expect(res.headers['content-type']).toMatch('text/html; charset=utf-8')
      expect(res.headers['cache-control']).toMatch('public')
    },
  )
  test('valid language prefix 404 response is HTML', async () => {
    const res = await get('/en/something-that-doesnt-existent')
    expect(res.statusCode).toBe(404)
    expect(res.headers['content-type']).toMatch('text/html')
    expect(res.headers['cache-control']).toMatch('public')
    expect(res.headers['cache-control']).toMatch(/max-age=\d\d+/)
    const surrogateKeySplit = res.headers['surrogate-key'].split(/\s/g)
    // The default is that it'll be purged at the next deploy.
    expect(surrogateKeySplit.includes(SURROGATE_ENUMS.DEFAULT)).toBeTruthy()
    expect(res.headers['surrogate-control']).toContain('public')
    expect(res.headers['surrogate-control']).toMatch(/max-age=[1-9]/)
  })
})

describe('/_next/data/... paths', () => {
  test('invalid build ID', async () => {
    const res = await get('/_next/data/madeupbutnotvalid/en/free-pro-team%40latest/pages.json')
    expect(res.statusCode).toBe(404)
    expect(res.headers['content-type']).toMatch('text/plain')
    expect(res.headers['cache-control']).toMatch('public')
  })
})
