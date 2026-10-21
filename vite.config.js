import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';

const metadata={
 ops:{role:'产品运营 / 用户运营',description:'岳子豪的运营作品集：软件商业化、用户分层、黑五活动、转化与留存优化。'},
 pm:{role:'产品经理',description:'岳子豪的产品经理作品集：需求分析、产品方案与原型、跨团队交付和上线验证。'}
};
const file=path=>fileURLToPath(new URL(path,import.meta.url));

export default defineConfig(({mode})=>{
 const target=metadata[mode];
 return {
  plugins:[{name:'profile-metadata',transformIndexHtml(html,context){
   const page=target||metadata[context.path.split('/').filter(Boolean)[0]||'ops'];
   if(!page)return html;
   return html.replace(/<title>.*?<\/title>/,`<title>岳子豪 — ${page.role}</title>`)
    .replace(/<meta name="description" content="[^"]*"\/>/,`<meta name="description" content="${page.description}"/>`);
  }}],
  build:{outDir:target?`dist-${mode}`:'dist',rollupOptions:{input:target?file('./index.html'):{original:file('./index.html'),ops:file('./ops/index.html'),pm:file('./pm/index.html')}}}
 };
});
