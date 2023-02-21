import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['https://s1.imagehub.cc/images/2023/02/20/e28db97a308044b70ff79a5d5032928a.png'],
  //   autoAlias: false,
  //   outputPath: 'docs-dist',
  themeConfig: {
    // hd: { rules: [] },
    rtl: true,
    name: 'RomanticUI',
    logo: 'https://s1.imagehub.cc/images/2023/02/20/e28db97a308044b70ff79a5d5032928a.png',
    footer: `Open-source MIT Licensed | Copyright © 2023-present
<br />
Powered by Romantic team`,
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: 'https://github.com/RomanticUI/RomanticUI',
    },
  },
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),

  //设置域名前缀
  //   sitemap: { hostname: 'https://d.umijs.org' },
});
