import { describe, expect, test } from 'vitest'
import cheerio from 'cheerio'

import { get, getDOM } from '@/tests/helpers/e2etest'
import enterpriseServerReleases from '@/versions/lib/enterprise-server-releases'
import { allVersions } from '@/versions/lib/all-versions'

describe('autotitle', () => {
  test('internal links with AUTOTITLE resolves', async () => {
    const $: cheerio.Root = await getDOM('/get-started/foo/autotitling')
    const links = $('#article-contents a[href]')
    links.each((i: number, element: any) => {
      if ($(element).attr('href')?.includes('/get-started/start-your-journey/hello-world')) {
        expect($(element).text()).toBe('Hello World')
      }
    })
    // There are 4 links on the `autotitling.md` content.
    expect.assertions(4)
  })

  test('typos lead to error when NODE_ENV !== production', async () => {
    // The fixture typo-autotitling.md contains two different typos
    // of the word "AUTOTITLE", separated by `{% if version ghes %}`
    {
      const res = await get('/get-started/foo/typo-autotitling', { followRedirects: true })
      expect(res.statusCode).toBe(500)
    }
    {
      const res = await get('/enterprise-server@latest/get-started/foo/typo-autotitling', {
        followRedirects: true,
      })
      expect(res.statusCode).toBe(500)
    }
  })

  test('AUTOTITLE on anchor links should fail', async () => {
    const res = await get('/get-started/foo/anchor-autotitling', { followRedirects: true })
    expect(res.statusCode).toBe(500)
  })
})

describe('cross-version-links', () => {
  test.each(Object.keys(allVersions))(
    'links to free-pro-team should be implicit even on %p',
    async (version: string) => {
      const URL = `/${version}/get-started/foo/cross-version-linking`
      const $: cheerio.Root = await getDOM(URL)
      const links = $('#article-contents a[href]')

      // Tests that the hardcoded prefix is always removed
      const firstLink = links.filter(
        (i: number, element: any) => $(element).text() === 'Hello world always in free-pro-team',
      )
      expect(firstLink.attr('href')).toBe('/en/get-started/start-your-journey/hello-world')

      // Tests that the second link always goes to enterprise-server@X.Y
      const secondLink = links.filter(
        (i: number, element: any) =>
          $(element).text() === 'Autotitling page always in enterprise-server latest',
      )
      expect(secondLink.attr('href')).toBe(
        `/en/enterprise-server@${enterpriseServerReleases.latest}/get-started/start-your-journey/hello-world`,
      )
    },
  )
})

describe('link-rewriting', () => {
  test('/en is injected', async () => {
    const $: cheerio.Root = await getDOM('/get-started/start-your-journey/link-rewriting')
    const links = $('#article-contents a[href]')

    {
      const link = links.filter(
        (i: number, element: any) => $(element).text() === 'Cross Version Linking',
      )
      expect(link.attr('href')).toMatch('/en/get-started/')
    }

    // Some links are left untouched

    {
      const link = links.filter((i: number, element: any) =>
        $(element).text().includes('Enterprise 11.10'),
      )
      expect(link.attr('href')).toMatch('/en/enterprise/')
    }
    {
      const link = links.filter((i: number, element: any) => $(element).text().includes('peterbe'))
      expect(link.attr('href')).toMatch(/^https:/)
    }
    {
      const link = links.filter((i: number, element: any) => $(element).text().includes('Picture'))
      expect(link.attr('href')).toMatch(/^\/assets\//)
    }
    {
      const link = links.filter((i: number, element: any) =>
        $(element).text().includes('GraphQL Schema'),
      )
      expect(link.attr('href')).toMatch(/^\/public\//)
    }
  })

  test('/en and current version (latest) is injected', async () => {
    const $: cheerio.Root = await getDOM(
      '/enterprise-cloud@latest/get-started/start-your-journey/link-rewriting',
    )
    const links = $('#article-contents a[href]')

    const link = links.filter(
      (i: number, element: any) => $(element).text() === 'Cross Version Linking',
    )
    expect(link.attr('href')).toMatch('/en/enterprise-cloud@latest/get-started/')
  })

  test('/en and current version number is injected', async () => {
    // enterprise-server, unlike enterprise-cloud, use numbers
    const $: cheerio.Root = await getDOM(
      '/enterprise-server@latest/get-started/start-your-journey/link-rewriting',
    )
    const links = $('#article-contents a[href]')

    const link = links.filter(
      (i: number, element: any) => $(element).text() === 'Cross Version Linking',
    )
    expect(link.attr('href')).toMatch(
      `/en/enterprise-server@${enterpriseServerReleases.latestStable}/get-started/`,
    )
  })
})

describe('subcategory links', () => {
  test('no free-pro-team prefix', async () => {
    const $: cheerio.Root = await getDOM('/rest/actions')
    const links = $('[data-testid="table-of-contents"] a[href]')
    links.each((i: number, element: any) => {
      expect($(element).attr('href')).not.toContain('/free-pro-team@latest')
    })
  })
  test('enterprise-server prefix', async () => {
    const $: cheerio.Root = await getDOM('/enterprise-server@latest/rest/actions')
    const links = $('[data-testid="table-of-contents"] a[href]')
    links.each((i: number, element: any) => {
      expect($(element).attr('href')).toMatch(/\/enterprise-server@\d/)
    })
  })
})
