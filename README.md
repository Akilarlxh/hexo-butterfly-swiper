# hexo-butterfly-swiper

给`hexo-theme-butterfly`添加 [首页轮播图](https://akilar.top/posts/8e1264d1/)

# 安装

1. 安装插件,在博客根目录`[Blogroot]`下打开终端，运行以下指令：
  ```bash
  npm install hexo-butterfly-swiper --save
  ```

2. 添加配置信息，以下为写法示例
  在站点配置文件`_config.yml`或者主题配置文件`_config.butterfly.yml`中添加

  ```yaml
    # hexo-butterfly-swiper
    # see https://akilar.top/posts/8e1264d1/
    swiper:
      enable: true # 开关
      priority: 5 #过滤器优先权
      enable_page: all # 应用页面
      timemode: date #date/updated
      layout: # 挂载容器类型
        type: id
        name: recent-posts
        index: 0
      default_descr: 再怎么看我也不知道怎么描述它的啦！
      custom_css: https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.6/css/swiper.min.css #自定义swiper css依赖
      custom_js: https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.6/js/swiper.min.js #自定义swiper js依赖
  ```
3. 参数释义

  |参数|备选值/类型|释义|
  |:--|:--|:--|
  |priority|number|【可选】过滤器优先级，数值越小，执行越早，默认为10，选填|
  |enable|true/false|【必选】控制开关|
  |enable_page|path/all|【可选】填写想要应用的页面的相对路径（即路由地址）,如根目录就填'/',分类页面就填'/categories/'。若要应用于所有页面，就填'all'，默认为all|
  |timemode|date/updated|【可选】时间显示，date为显示创建日期，updated为显示更新日期,默认为date|
  |layout.type|id/class|【可选】挂载容器类型，填写id或class，不填则默认为id|
  |layout.name|text|【必选】挂载容器名称|
  |layout.index|0和正整数|【可选】前提是layout.type为class，因为同一页面可能有多个class，此项用来确认究竟排在第几个顺位|
  |default_descr|text|【可选】默认文章描述|
  |custom_css|url|【可选】自定义的swiper依赖项css链接|
  |custom_js|url|【可选】自定义的swiper依赖项加js链接|

4. 使用方法
  在文章的`front_matter`中添加`swiper_index`配置项即可。
  ```markdown
  ---
  title: 文章标题
  date: 创建日期
  updated: 更新日期
  cover: 文章封面
  description: 文章描述
  swiper_index: 1 #置顶轮播图顺序，需填非负整数，数字越大越靠前
  ---
  ```

# 截图
![](https://cdn.jsdelivr.net/npm/akilar-candyassets/image/f4783623.png)
