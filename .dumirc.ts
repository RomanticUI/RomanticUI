import { defineConfig } from 'dumi'
import path from 'path'

export default defineConfig({
  favicons: [
    'https://s1.imagehub.cc/images/2023/02/20/e28db97a308044b70ff79a5d5032928a.png',
  ],
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
    showLineNum: true,
    lastUpdated: true,
  },
  mfsu: false,
  extraBabelPresets: ['@babel/preset-react'],
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
  resolve: {
    // 配置入口文件路径，API解析将从这里开始
    entryFile: path.join(__dirname, 'src/index.ts'),
    atomDirs: [
      {
        type: 'components',
        dir: 'src/components',
      },
      {
        type: 'hooks',
        dir: 'src/hooks',
      },
    ],
  },
  //设置域名前缀
  //   sitemap: { hostname: 'https://d.umijs.org' },
})
