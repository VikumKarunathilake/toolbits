/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toolbits.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*', '/_not-found/*'],
};
