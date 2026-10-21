# 岳子豪 · 运营与产品经理作品集

React 19 + Vite 7。包含运营版和产品经理版，支持电脑和手机。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。在项目根目录执行：

```sh
npm install
npm run dev
```

也可使用 pnpm：`pnpm install`、`pnpm dev`，仓库附带 pnpm 锁文件。

- 运营版：http://127.0.0.1:5173/ops/
- 产品经理版：http://127.0.0.1:5173/pm/
- 根路径默认展示最新版运营页面，产品经理版仍通过 `/pm/` 访问。

## 构建

```sh
npm run build
```

生成 `dist/`，包含上述全部入口。运行 `npm run preview` 可查看构建结果。

如需将两个版本分别部署到独立域名的根路径：

```sh
npm run build:ops
npm run build:pm
```

分别生成 `dist-ops/` 和 `dist-pm/`。`npm run build:all` 可一次生成三份构建。构建产物为静态网站，可部署到支持静态托管的平台；当前资源路径按域名根目录部署配置。GitHub Pages 的仓库子路径部署需要额外配置资源基址和页面路由。

## 内容维护

- `src/profiles.js`：两版定位、标题、项目顺序、工作经历、能力与案例差异。
- `src/base-content.js`：基础履历与项目数据。
- `src/case-studies.js`：共用案例事实与详细内容。
- `src/main.jsx`：页面结构与交互入口。
- `src/resume-updates.css`：两个新版共用的布局与视觉调整。
- `src/components/`：图库、案例弹层、微信入口、动态背景、卡片和光标组件。
- `src/gallery-images.json`：三类相册共 39 张个人图片的映射。
- `public/assets/gallery/personal/`：个人图片压缩版与缩略图。
- `public/assets/gallery/`：当前相册封面及图库资源。
- `public/assets/`：头像、二维码、项目插图及其他页面资源。

两版已共用最新导航、卡片光效、经历平滑展开、微信入口、相册封面、图库入场旋转与拖拽减速。图片按需加载，后台及离屏暂停不必要的动画。产品版保留产品经理视角及项目顺序。更详细的同步说明见 `产品版同步说明.md`。

## 上传 GitHub

将本目录中的全部文件（包括 `.gitignore`、`.npmrc`）上传到同一个仓库，保持目录结构。无需上传 `node_modules/`、`.pnpm-store/`、测试截图或本地构建产物；`.gitignore` 已排除这些目录。

页面使用的姓名、邮箱、电话、微信二维码和个人相册会随网站源码资源一同提供，均为当前作品集的展示内容。


## 最新界面与简历下载

首屏试用 React Bits MoltenMetal 流动金属背景，共用暂停、离屏暂停及手机渲染限制；保留 MicroSlats 源文件以便后续切换。

工作与教育经历采用纵向时间线，年份为 2024、2022、2018，节点随经历展开与收起保持对齐。个人介绍与联系区各提供一个“下载简历 PDF”入口：运营版下载 `public/assets/resumes/yuezihao-operations.pdf`，产品版下载 `public/assets/resumes/yuezihao-product-manager.pdf`。PDF 已根据网站及最新确认的业务事实重写，均为浅色底两页简历，按运营与产品方向分别组织；后续替换对应 PDF 时保持文件路径不变。

