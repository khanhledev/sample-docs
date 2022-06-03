import{_ as s,o as a,c as n,f as l}from"./app.f2779f0d.js";const A='{"title":"Middleware","description":"","frontmatter":{},"headers":[{"level":2,"title":"Kh\u1EDFi t\u1EA1o m\u1ED9t middleware","slug":"khoi-tao-mot-middleware"},{"level":2,"title":"S\u1EED d\u1EE5ng middleware","slug":"su-dung-middleware"},{"level":2,"title":"Th\u1EF1c thi m\u1ED9t middleware","slug":"thuc-thi-mot-middleware"}],"relativePath":"guide/middleware.md","lastUpdated":1654248370000}',e={name:"guide/middleware.md"},o=l(`<h1 id="middleware" tabindex="-1">Middleware <a class="header-anchor" href="#middleware" aria-hidden="true">#</a></h1><p><code>middleware</code> \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng \u0111\u1EC3 gi\u1EA3m s\u1EF1 ph\u1EE5 thu\u1ED9c v\xE0 ph\u1EE9c t\u1EA1m khi x\u1EED l\xFD logic gi\u1EEFa c\xE1c th\xE0nh ph\u1EA7n kh\xE1c nhau. Thay v\xEC d\xF9ng <code>Event Bus</code>, <code>Watch</code> ho\u1EB7c logic t\u1EADp trung, ch\xFAng ta c\xF3 th\u1EC3 t\xE1ch nh\u1ECF v\xE0 ch\u1EC9 \u0111\u1ECBnh ngh\u0129a khi c\u1EA7n thi\u1EBFt.</p><p>M\u1ED7i <code>middleware</code> c\xF3 hai t\xEDnh n\u0103ng:</p><ol><li>Khai b\xE1o <code>callback function</code> s\u1EED d\u1EE5ng <code>middleware</code>.</li><li>Trigger c\xE1c <code>callback function</code> khi di\u1EC5n ra m\u1ED9t <strong>event</strong>.</li></ol><h2 id="khoi-tao-mot-middleware" tabindex="-1">Kh\u1EDFi t\u1EA1o m\u1ED9t middleware <a class="header-anchor" href="#khoi-tao-mot-middleware" aria-hidden="true">#</a></h2><p>\u0110\u1EC3 t\u1EA1o m\u1ED9t <code>middleware</code> b\u1EA1n ch\u1EC9 c\u1EA7n g\u1ECDi function <code>createMiddlewarePipeline</code>. Ch\xFAng t\xF4i \u0111\xE3 khai b\xE1o <code>MiddlewareEvents</code> \u0111\u1EC3 qu\u1EA3n l\xFD theo c\xE1c <strong>events</strong> t\u1ED1t h\u01A1n.</p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> middleware</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MiddlewareEvents</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeAddToCart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMiddlewarePipeline</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">afterAddToCart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMiddlewarePipeline</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">afterCartChange</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMiddlewarePipeline</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">trackingAddToCart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMiddlewarePipeline</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><h2 id="su-dung-middleware" tabindex="-1">S\u1EED d\u1EE5ng middleware <a class="header-anchor" href="#su-dung-middleware" aria-hidden="true">#</a></h2><p>S\u1EED d\u1EE5ng <code>use</code> \u0111\u1EC3 khai b\xE1o function callback cho middleware khi di\u1EC5n ra m\u1ED9t event. C\xF3 th\u1EC3 khai b\xE1o nhi\u1EC1u function callback cho m\u1ED7i middleware.</p><p>V\xED d\u1EE5 c\u1EA7n l\u1EA5y danh s\xE1ch c\xE1c s\u1EA3n ph\u1EA9m cho UpSell khi <code>beforeAddToCart</code></p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> handleBeforeAddToCart </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> (</span></span>
<span class="line"><span style="color:#A6ACCD;">  context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AddCartItemsParams</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  next</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NextFunction</span></span>
<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#82AAFF;">isIgnorePrePurchase</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">route</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">variant_id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">cartItems</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">product</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getProduct</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">variant_id</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">product</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">promise</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setPromise</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">fetchPrePurchase</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">product</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$middleware</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">beforeAddToCart</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(handleBeforeAddToCart)</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Lu\xF4n \u0111\u1EA3m b\u1EA3o function <code>next</code> \u0111\u01B0\u1EE3c g\u1ECDi trong m\u1ED7i callback function.</p></div><h2 id="thuc-thi-mot-middleware" tabindex="-1">Th\u1EF1c thi m\u1ED9t middleware <a class="header-anchor" href="#thuc-thi-mot-middleware" aria-hidden="true">#</a></h2><p>Khi event c\u1EE7a m\u1ED9t middleware \u0111\u01B0\u1EE3c di\u1EC5n ra, ch\xFAng c\u1EA7n \u0111\u01B0\u1EE3c <code>execute</code> c\xE1c callback function \u0111\xE3 \u0111\u01B0\u1EE3c \u0111\u0103ng k\xFD. Callback function n\xE0o \u0111\u0103ng k\xFD tr\u01B0\u1EDBc th\xEC s\u1EBD \u0111\u01B0\u1EE3c execute tr\u01B0\u1EDBc. Khi function <code>next</code> \u0111\u01B0\u1EE3c g\u1ECDi, callback function ti\u1EBFp theo \u0111\u01B0\u1EE3c <code>execute</code></p><div class="language-typescript"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">middleware</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">beforeAddToCart</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">execute</span><span style="color:#A6ACCD;">(payload)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,15),p=[o];function c(t,r,i,d,y,F){return a(),n("div",null,p)}var C=s(e,[["render",c]]);export{A as __pageData,C as default};