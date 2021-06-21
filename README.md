# hexo-butterfly-swiper

给`hexo-theme-butterfly`添加 [侧边栏电子钟](https://akilar.top/posts/4e39cf4a/)

# 安装

1. 安装插件,在博客根目录`[Blogroot]`下打开终端，运行以下指令：
  ```bash
  npm install hexo-butterfly-swiper --save
  ```

2. 添加配置信息，以下为写法示例
  在站点配置文件`_config.yml`或者主题配置文件`_config.butterfly.yml`中添加

  ```yaml
    # hexo-butterfly-swiper
    # see https://akilar.top/posts/4e39cf4a/
    electric_swiper:
      enable: true # 开关
      priority: 5 #过滤器优先权
      enable_page: all # 应用页面
      layout: # 挂载容器类型
        type: class
        name: sticky_layout
        index: 0
      loading: #加载动画自定义
  ```
3. 参数释义

  |参数|备选值/类型|释义|
  |:--|:--|:--|
  |priority|number|【可选】过滤器优先级，数值越小，执行越早，默认为10，选填|
  |enable|true/false|【必选】控制开关|
  |enable_page|path/all|【可选】填写想要应用的页面的相对路径（即路由地址）,如根目录就填'/',分类页面就填'/categories/'。若要应用于所有页面，就填'all'，默认为all|
  |layout.type|id/class|【可选】挂载容器类型，填写id或class，不填则默认为id|
  |layout.name|text|【必选】挂载容器名称|
  |layout.index|0和正整数|【可选】前提是layout.type为class，因为同一页面可能有多个class，此项用来确认究竟排在第几个顺位|
  |loading|URL|【可选】电子钟加载动画的图片|
# 截图
![](https://cdn.jsdelivr.net/npm/akilar-candyassets/image/Card-swiper-b0876bb5.png)
