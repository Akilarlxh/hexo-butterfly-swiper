'use strict'
// 全局声明插件代号
const pluginname = 'butterfly_swiper'
// 全局声明依赖
const pug = require('pug')
const path = require('path')
const urlFor = require('hexo-util').url_for.bind(hexo)
const util = require('hexo-util')
// 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是10。
const pre_priority = hexo.config.swiper.priority || hexo.theme.config.swiper.priority
const priority = pre_priority ? pre_priority : 10

hexo.extend.filter.register('after_generate', function (locals) {
  // 首先获取整体的配置项名称
  const config = hexo.config.swiper || hexo.theme.config.swiper
  // 如果配置开启
  if (!(config && config.enable)) return
  // 集体声明配置项
    const data = {
      enable_page: config.enable_page ? config.enable_page : "all",
      layout_type: config.layout.type,
      layout_name: config.layout.name,
      layout_index: config.layout.index ? config.layout.index : 0,
      plus_style: config.plus_style ? urlFor(config.plus_style) : ""
    }
  // 渲染页面
  const temple_html_text = config.temple_html ? config.temple_html : pug.renderFile(path.join(__dirname, './lib/html.pug'),data)
  //cdn资源声明
    //样式资源
  const css_text = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hexo-butterfly-swiper/lib/swiper.min.css">`
    //脚本资源
  const js_text = `<script src="https://pv.sohu.com/cityjson?ie=utf-8"></script><script data-pjax src="https://cdn.jsdelivr.net/npm/hexo-butterfly-swiper/lib/swiper.min.js"></script>`
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
                          // parent_div_git.innerHTML=item_html+parent_div_git.innerHTML // 无报错，但不影响使用(支持pjax跳转)
                          parent_div_git.insertAdjacentHTML("afterbegin",item_html) // 有报错，但不影响使用(支持pjax跳转)
                          }
                        if( ${get_layout} && (location.pathname ==='${data.enable_page}'|| '${data.enable_page}' ==='all')){
                        ${pluginname}_injector_config()
                        }
                      </script>`
  // 注入用户脚本
  // 此处利用挂载容器实现了二级注入
  hexo.extend.injector.register('body_end', user_info_js, "default");
  // 注入样式资源
  hexo.extend.injector.register('body_end', js_text, "default");
  // 注入脚本资源
  hexo.extend.injector.register('head_end', css_text, "default");
},priority)



// 
// function priority_swiper(){
//     var priority = 0
//     if(hexo.config.swiper.priority){
//         priority = hexo.config.swiper.priority
//     }
//     else{
//         priority = 0
//     }
//     return priority
// }

hexo.extend.filter.register('after_generate',function() {
    var swiper = hexo.config.swiper.enable;
    if(swiper){
        var temple = hexo.config.swiper.temple_html.split("${temple_html_item}")
        var layout_name ='';
        var layout_type ='';
        var layout_index =0;
        layout_name = hexo.config.swiper.layout.name;
        layout_type = hexo.config.swiper.layout.type;
        layout_index =  hexo.config.swiper.layout.index;
        var get_layout = ''
        if (layout_type == 'class'){
            get_layout =  `document.getElementsByClassName('${layout_name}')[${layout_index}]`
        }else if (layout_type == 'id'){
            get_layout =  `document.getElementById('${layout_name}')`
        }else {
            get_layout =  `document.getElementById('${layout_name}')`
        }
        var temple_html_item = ''
        var posts_list = hexo.locals.get('posts').data;
        var new_posts_list =[]
        for (item of posts_list){
            if(item.swiper_index && item.swiper_desc){
                new_posts_list.push(item)
            }}
        function sortNumber(a,b)
        {
            return a.swiper_index - b.swiper_index
        }
        new_posts_list = new_posts_list.sort(sortNumber);
        new_posts_list = new_posts_list.reverse();
        for (item of new_posts_list){
            if(item.swiper_index && item.swiper_desc){
                temple_html_item += `<div class="blog-slider__item swiper-slide" style="width: 750px; opacity: 1; transform: translate3d(0px, 0px, 0px); transition-duration: 0ms"><div class="blog-slider__img"><img src="${item.swiper_cover||item.cover}" alt="${item.swiper_cover||item.cover}"/></div><div class="blog-slider__content"><span class="blog-slider__code">${item.date.format('YYYY-MM-DD')}</span><a class="blog-slider__title" href="${item.path}">${item.title}</a><div class="blog-slider__text">${item.swiper_desc}</div><a class="blog-slider__button" href="${item.path}">详情</a></div></div>`;
            }
        }
        var temple_html =`${temple[0]}<div class="blog-slider__wrp swiper-wrapper" style="transition-duration: 0ms">${temple_html_item}</div><div class="blog-slider__pagination swiper-pagination-clickable swiper-pagination-bullets"></div>${temple[1]}`;
        var script_text = ` <script data-pjax>if(${get_layout} && location.pathname =='${hexo.config.swiper.enable_page}'){

    var parent = ${get_layout};
    var child = '${temple_html}';
    console.log('已挂载swiper')
    parent.insertAdjacentHTML("afterbegin",child)}
     </script>
<script data-pjax src="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-swiper/swiper/swiper.min.js"></script>
<script data-pjax src="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-swiper@0.18/swiper/swiperindex.js"></script>
<style>${hexo.config.swiper.plus_style}</style>`;
        hexo.extend.injector.register('head_end',`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-swiper/swiper/swiper.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-swiper/swiper/swiperstyle.css">`, "default");
        hexo.extend.injector.register('body_end',script_text, "default");
    }

},priority_swiper())
