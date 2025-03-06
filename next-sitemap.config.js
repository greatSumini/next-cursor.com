/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://next-cursor.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  outDir: './public',
  // 추가 설정을 원하시면 아래 주석을 해제하고 수정하세요
  // changefreq: 'daily',
  // priority: 0.7,
  // sitemapSize: 5000,
  // exclude: ['/protected-page', '/private-page'],
  // alternateRefs: [
  //   {
  //     href: 'https://es.example.com',
  //     hreflang: 'es',
  //   },
  // ],
};
