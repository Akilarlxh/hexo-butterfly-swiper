'use strict'
// 全局声明插件代号
const pluginname = 'butterfly_swiper'
// 全局声明依赖
const pug = require('pug')
const path = require('path')
const urlFor = require('hexo-util').url_for.bind(hexo)
const util = require('hexo-util')

hexo.extend.filter.register('after_generate', function () {
  // 获取所有文章
  var posts_list = hexo.locals.get('posts').data;
  var swiper_list = []
  // 若文章的front_matter内设置了index和描述，则将其放到swiper_list内
  for (var item of posts_list) {
    if (item.swiper_index) {
      swiper_list.push(item)
    }
  }
  // 对swiper_list进行处理，使其按照index大小进行排序
  function sortNumber(a, b) {
    return a.swiper_index - b.swiper_index
  }
  swiper_list = swiper_list.sort(sortNumber);
  // 排序反转，使得数字越大越靠前
  swiper_list = swiper_list.reverse();
// =====================================================================
  // 首先获取整体的配置项名称
  const config = hexo.config.swiper || hexo.theme.config.swiper
  // 如果配置开启
  if (!(config && config.enable)) return
  // 集体声明配置项
    const data = {
      pjaxenable: hexo.theme.config.pjax.enable,
      enable_page: config.enable_page ? config.enable_page : "all",
      exclude: config.exclude,
      timemode: config.timemode ? config.timemode : "date",
      layout_type: config.layout.type,
      layout_name: config.layout.name,
      layout_index: config.layout.index ? config.layout.index : 0,
      error_img: config.error_img ? urlFor(config.error_img) : "https://unpkg.zhimg.com/akilar-candyassets/image/loading.gif",
      insertposition: config.insertposition ? config.insertposition : "afterbegin",
      swiper_list: swiper_list,
      default_descr: config.default_descr ? config.default_descr : "再怎么看我也不知道怎么描述它的啦！",
      swiper_css: config.swiper_css ? urlFor(config.swiper_css) : "https://unpkg.zhimg.com/hexo-butterfly-swiper/lib/swiper.min.css",
      swiper_js: config.swiper_js ? urlFor(config.swiper_js) : "https://unpkg.zhimg.com/hexo-butterfly-swiper/lib/swiper.min.js",
      custom_css: config.custom_css ? urlFor(config.custom_css) : "https://unpkg.zhimg.com/hexo-butterfly-swiper/lib/swiperstyle.css",
      custom_js: config.custom_js ? urlFor(config.custom_js) : "https://unpkg.zhimg.com/hexo-butterfly-swiper/lib/swiper_init.js"
    }
  // 渲染页面
  const temple_html_text = config.temple_html ? config.temple_html : pug.renderFile(path.join(__dirname, './lib/html.pug'),data);

  //cdn资源声明
    //样式资源
  const css_text = `<link rel="stylesheet" href="${data.swiper_css}" media="print" onload="this.media='all'"><link rel="stylesheet" href="${data.custom_css}" media="print" onload="this.media='all'">`
    //脚本资源
  const js_text = `<script defer src="${data.swiper_js}"></script><script defer data-pjax src="${data.custom_js}"></script>`

  //注入容器声明
  var get_layout
  //若指定为class类型的容器
  if (data.layout_type === 'class') {
    //则根据class类名及序列获取容器
    get_layout = `document.getElementsByClassName('${data.layout_name}')[${data.layout_index}]`
  }
  // 若指定为id类型的容器
  else if (data.layout_type === 'id') {
    // 直接根据id获取容器
    get_layout = `document.getElementById('${data.layout_name}')`
  }
  // 若未指定容器类型，默认使用id查询
  else {
    get_layout = `document.getElementById('${data.layout_name}')`
  }

  //挂载容器脚本
  var user_info_js = `<script data-pjax>
  function ${pluginname}_injector_config(){
    var parent_div_git = ${get_layout};
    var item_html = '${temple_html_text}';
    console.log('已挂载${pluginname}')
    parent_div_git.insertAdjacentHTML("${data.insertposition}",item_html)
    }
  var elist = '${data.exclude}'.split(',');
  var cpage = location.pathname;
  var epage = '${data.enable_page}';
  var flag = 0;

  for (var i=0;i<elist.length;i++){
    if (cpage.includes(elist[i])){
      flag++;
    }
  }

  if ((epage ==='all')&&(flag == 0)){
    ${pluginname}_injector_config();
  }
  else if (epage === cpage){
    ${pluginname}_injector_config();
  }
  </script>`
  // 注入用户脚本
  // 此处利用挂载容器实现了二级注入
  hexo.extend.injector.register('body_end', user_info_js, "default");
  // 注入样式资源
  hexo.extend.injector.register('body_end', js_text, "default");
  // 注入脚本资源
  hexo.extend.injector.register('head_end', css_text, "default");
},
hexo.extend.helper.register('priority', function(){
  // 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是10
  const pre_priority = hexo.config.swiper.priority || hexo.theme.config.swiper.priority
  const priority = pre_priority ? pre_priority : 10
  return priority
})
)
