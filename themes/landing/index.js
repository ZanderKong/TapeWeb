
'use client'

/**
 * 这是一个空白主题，方便您用作创建新主题时的模板，从而开发出您自己喜欢的主题
 * 1. 禁用了代码质量检查功能，提高了代码的宽容度；您可以使用标准的html写法
 * 2. 内容大部分是在此文件中写死，notion数据从props参数中传进来
 * 3. 您可在此网站找到更多喜欢的组件 https://www.tailwind-kit.com/
 */
import NotionPage from '@/components/NotionPage'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Features from './components/Features'
import FeaturesBlocks from './components/FeaturesBlocks'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import CommonHead from '@/components/CommonHead'
import { useRouter } from 'next/router'
import CONFIG from './config'
import Loading from '@/components/Loading'
import { isBrowser } from '@/lib/utils'
import { siteConfig } from '@/lib/config'
// import { Pricing } from './components/Pricing'

// new import
import Join from "./components/Join";
import FAQ from "./components/FAQ";
import GetStarted from "./components/GetStarted";

/**
 * 布局框架
 * Landing 主题用作产品落地页展示
 * 结合Stripe或者lemonsqueezy插件可以成为saas支付订阅
 * @param {*} props
 * @returns
 */
const LayoutBase = (props) => {
  // const { children } = props
  const { meta, siteInfo, children } = props
  const router = useRouter()
  const currentPath = router.asPath;  // Current URL path.
  const isZhHomePage = currentPath === '/zh';
  const i18n = isZhHomePage ? 'zh' : 'en'

  return <div id='theme-landing' className="overflow-hidden flex flex-col justify-between bg-white">

        {/* 网页SEO */}
        <CommonHead meta={meta} siteInfo={siteInfo} />

        {/* 顶部导航栏 */}
        <Header i18n={i18n}/>

        {/* 内容 */}
        <div id='content-wrapper'>
            {children}
        </div>

        {/* 底部页脚 */}
        <Footer i18n={i18n}/>
    </div>
}
/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  const router = useRouter()
  const currentPath = router.asPath;  // Current URL path.
  const isZhHomePage = currentPath === '/zh';
  const i18n = isZhHomePage ? 'zh' : 'en'

  return (
        <LayoutBase {...props}>
            <Hero i18n={i18n}/>
            <Join i18n={i18n}/>
            <Features i18n={i18n}/>
            <FAQ i18n={i18n}/>
            <Newsletter />
            <GetStarted i18n={i18n}/>
        </LayoutBase>
  )
}

/**
 * 文章详情页布局
 * @param {*} props
 * @returns
 */
const LayoutSlug = (props) => {
  // 如果 是 /article/[slug] 的文章路径则进行重定向到另一个域名
  const router = useRouter()
  if (JSON.parse(siteConfig('LANDING_POST_REDIRECT_ENABLE', null, CONFIG)) && isBrowser && router.route === '/[prefix]/[slug]') {
    const redirectUrl = siteConfig('LANDING_POST_REDIRECT_URL', null, CONFIG) + router.asPath.replace('?theme=landing', '')
    router.push(redirectUrl)
    return <div id='theme-landing'><Loading /></div>
  }

  return <>
        <div id='container-inner' className='mx-auto max-w-screen-lg p-12'>
            <NotionPage {...props} />
        </div>
    </>
}

// 其他布局暂时留空
const LayoutSearch = (props) => <><Hero /></>
const LayoutArchive = (props) => <><Hero /></>
const Layout404 = (props) => <><Hero /></>
const LayoutCategoryIndex = (props) => <><Hero /></>
const LayoutPostList = (props) => <><Hero /></>
const LayoutTagIndex = (props) => <><Hero /></>

export {
  CONFIG as THEME_CONFIG,
  LayoutBase,
  LayoutIndex,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutPostList,
  LayoutCategoryIndex,
  LayoutTagIndex
}
