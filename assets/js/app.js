/* 手机端：窗口是卡片流，开窗后滚动到该卡片，避免用户找不到
   （桌面端窗口是浮层，不需要滚动） */
var __mScroll = function (id) {
  try {
    if (!window.matchMedia('(max-width:680px)').matches) return;
    var el = document.getElementById('win-' + id);
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
  } catch (_) {}
};

/* ============ 开机启动动画 ============ */
const biosLines=[
  'CTBU-OS v2.0.0 (c) 2026 Y2K Systems',
  'Checking memory... 640K OK',
  'Loading pink.sys... OK',
  'Loading silver.drv... OK',
  'Mounting /dev/butterfly... OK',
  'Starting window-manager.exe...',
  'Welcome back,friend♥'];
const biosEl=document.getElementById('biosText');
let bi=0;
function typeBios(){
  if(bi<biosLines.length){
    const line=document.createElement('div');
    line.className='bios-line';
    line.style.animationDelay=(bi*0.05)+'s';
    line.textContent=biosLines[bi];
    biosEl.appendChild(line);
    bi++;
    setTimeout(typeBios,220);
  }
}
typeBios();

/* BIOS结束 → 显示进入世界界面（CRT显示器） */
setTimeout(()=>{
  const boot=document.getElementById('bootScreen');
  boot.classList.add('fadeout');
  setTimeout(()=>{
    boot.style.display='none';
    document.getElementById('worldGate').classList.add('show');
  },700);
},4200);

/* 点击"进入" → 显示器放大过渡 → CRT扫描线 → 大显示器桌面 */
document.getElementById('gateEnter').addEventListener('click',()=>{
  const gate=document.getElementById('worldGate');
  gate.classList.add('entering');
  setTimeout(()=>{
    gate.classList.add('hide');
    document.getElementById('monitorFrame').classList.add('show');
    const po=document.getElementById('crtPoweron');
    po.style.display='flex';
    setTimeout(()=>{
      document.getElementById('desktop').classList.add('ready');
      po.classList.add('fadeout');
      setTimeout(()=>{po.style.display='none';},600);
    },1000);
  },1000);
});

/* 点击"再想想" → 显示器抖动 + 文字变化 */
const leaveTexts=[
  '再想想？确定吗？♡',
  '真的要离开吗？这里有星星哦 ✦',
  '再考虑一下嘛～',
  '好吧，我等你回来 (｡•́︿•̀｡)',
  '那就再陪你一会儿～'
];
let leaveIdx=0;
document.getElementById('gateLeave').addEventListener('click',()=>{
  const monitor=document.getElementById('crtMonitor');
  monitor.classList.remove('shake');
  void monitor.offsetWidth;
  monitor.classList.add('shake');
  const q=document.getElementById('gateQuestion');
  if(leaveIdx<leaveTexts.length){
    q.innerHTML='&gt; '+leaveTexts[leaveIdx]+'<span class="gate-cursor"></span>';
    leaveIdx++;
  }
});

/* ============ 闪粉星光效果 ============ */
(function(){
  const count=28;
  for(let i=0;i<count;i++){
    const s=document.createElement('div');
    s.className='sparkle'+(Math.random()>0.6?' star':'');
    s.style.left=Math.random()*100+'vw';
    s.style.top=Math.random()*100+'vh';
    s.style.setProperty('--dur',(1.5+Math.random()*2.5)+'s');
    s.style.setProperty('--delay',(Math.random()*3)+'s');
    const size=2+Math.random()*4;
    s.style.width=size+'px';s.style.height=size+'px';
    document.body.appendChild(s);
  }
})();

/* ============ 自定义光标 ============ */
const cursor=document.getElementById('cursorStar');
let trailTimer=0;
document.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';
  cursor.style.top=e.clientY+'px';
  trailTimer++;
  if(trailTimer%3===0){
    const t=document.createElement('div');
    t.className='cursor-trail';
    t.style.left=e.clientX+'px';
    t.style.top=e.clientY+'px';
    t.style.opacity='.6';
    document.body.appendChild(t);
    setTimeout(()=>{t.style.transition='opacity .5s';t.style.opacity='0';},50);
    setTimeout(()=>t.remove(),600);
  }
});
document.addEventListener('mousedown',()=>cursor.classList.add('clicking'));
document.addEventListener('mouseup',()=>cursor.classList.remove('clicking'));

/* ============ 点击闪粉粒子 ============ */
const particleColors=['#f5c8d6','#e8c5cf','#9be8ff','#ffc6e6','#e8e6e2','#d99fb0','#f0dde4'];
document.addEventListener('click',e=>{
  if(e.target.closest('.theme-toggle'))return;
  for(let i=0;i<12;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=3+Math.random()*6;
    p.style.width=size+'px';p.style.height=size+'px';
    p.style.left=e.clientX+'px';p.style.top=e.clientY+'px';
    p.style.background=particleColors[Math.floor(Math.random()*particleColors.length)];
    p.style.setProperty('--dx',(Math.random()-0.5)*140+'px');
    p.style.setProperty('--dy',(Math.random()-0.5)*140+'px');
    p.style.animationDelay=(Math.random()*0.1)+'s';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),900);
  }
});

/* ============ 双击桌面便签彩蛋 ============ */
const stickyQuotes=[
  '今天也要温柔地对待自己呀 ♡',
  '慢一点没关系，你已经很棒了',
  '窗台的光，是免费的浪漫',
  '记录，就是反抗遗忘',
  '同路人，不独行',
  '把复杂讲清楚，是种温柔',
  '你值得被好好对待 ✦',
  '今天的你，也在发光呀',
  '深呼吸，一切都来得及',
  '你比想象中更勇敢'
];
document.getElementById('desktop').addEventListener('dblclick',e=>{
  if(e.target.closest('.desk-icon')||e.target.closest('.win')||e.target.closest('.taskbar')||e.target.closest('.start-menu'))return;
  const sr=screenEl.getBoundingClientRect();
  const note=document.createElement('div');
  note.className='sticky-note';
  note.style.left=Math.max(10,Math.min(e.clientX-sr.left-95,sr.width-210))+'px';
  note.style.top=Math.max(10,Math.min(e.clientY-sr.top-70,sr.height-220))+'px';
  note.style.setProperty('--sr',(Math.random()*10-5)+'deg');
  note.textContent=stickyQuotes[Math.floor(Math.random()*stickyQuotes.length)];
  screenEl.appendChild(note);
  setTimeout(()=>{note.classList.add('fadeout');setTimeout(()=>note.remove(),600);},4500);
});

/* ============ 窗口数据 ============ */
const WINDOWS=[
  {id:'exp',title:'projects.folder',cn:'项目作品',icon:'projects',x:200,y:100},
  {id:'about',title:'resume.txt',cn:'经历简历',icon:'work',x:140,y:140},
  {id:'today',title:'about.me',cn:'关于我',icon:'about',x:70,y:80},
  {id:'contact',title:'contact_msg.exe',cn:'找到我',icon:'contact',x:260,y:180},
  {id:'note',title:'writings.txt',cn:'文字作品',icon:'study',x:100,y:220},
];

/* ============ 项目详情数据（图片/视频后续自己填） ============ */
const PROJECTS={
  peiyang:{tag:'方案',title:'项目化学习培养方案',meta:'角色：项目负责人｜时间：大一寒假｜状态：暂停中',
    desc:'学院老师委托的项目，我把它当成完整项目来做。寒假期间同时兼顾计财股实习和支教，时间很紧，仍然坚持先调研再动笔：访谈了两位获奖较多的学长和我的指导老师，拿到真实需求后再倒推方案结构，独立完成整套培养方案撰写。',
    images:[],video:'',
    result:'完成整套培养方案撰写；访谈2位学长 + 1位指导老师；因精力有限项目后续暂停，未推进到落地阶段，也无获奖。'},
  hangyan:{tag:'竞赛',title:'潮流盲盒玩具行研报告',meta:'角色：团队队长｜时间：大一下｜赛事：2026第四届全国大学生预见未来行研大赛（复赛）',
    desc:'4人团队，我任队长，负责选题、分工与进度统筹，带队从0到1完成潮流盲盒玩具行业研究。零基础起步，自学AI智能体搭建与自动化工作流，用AI辅助完成Python数据清洗与行业分析。过程中确立了一条原则：AI做执行，人做判断——所有分析结论必须回到原始数据校验。',
    images:[],video:'',
    result:'进入复赛（决赛未进）；产出《潮流盲盒玩具行研报告》完整PDF；零基础掌握AI智能体搭建与Python数据清洗；沉淀出「人做判断、AI做分析」的协作原则，成为后续AI Skill设计的方法论基础。'},
  skill:{tag:'AIGC',title:'求职面试AI Skill',meta:'角色：设计者｜时间：2026暑期｜项目：北辰青年实习',
    desc:'北辰青年实习期间产出。把「精准投递」做成5步工作流：岗位拆解 → 经历匹配 → 简历定制 → 面试准备 → 面试官视角复盘。每一步都明确划分AI做什么、人做什么。四条不可违背的原则：一岗一策、证据导向（不编造）、诚实面对缺口、人做判断。',
    images:[],video:'',
    result:'产出可复用的AI Skill文档（v1.1，Step5 为迭代新增）；已用阿里巴巴产品经理-用户研究方向岗位完成真实测试验证；协作原则可迁移到其他工作流设计。',doc:'skill_doc.html'},
  workflow:{tag:'AIGC',title:'AI智能体与工作流搭建',meta:'角色：自主学习者｜时间：持续进行中',
    desc:'从零基础自学AI智能体搭建与自动化工作流设计，把AI从「一次性工具」升级为「可复用的工作流」。实践包括Hermes本地化部署、WorkBuddy工具联动等。我的判断标准：重复做超过3次的事，就该固化成工作流。',
    images:[],video:'',
    result:'掌握AI智能体搭建与自动化工作流设计；求职面试AI Skill是这套能力的实际产出。'},
  brand:{tag:'品牌',title:'《一只喵》品牌战略推演',meta:'角色：品牌主理人｜时间：2026暑期｜版本：V1.0',
    desc:'26个部分的完整战略推演，从"账号为什么存在"到品牌宪法、长期系统设计。核心定位：帮助大学生减少信息差，把复杂信息讲成能行动的方法。品牌价值观：清晰、可靠、有温度、成长。从"做账号"升级为"做品牌"，从"流量变现"升级为"可持续价值交换系统"。',
    images:[],video:'',
    result:'完成品牌战略文件V1.0；确立品牌定位和价值观；推翻线性转化路径，重新设计私域逻辑；对"伸手党"完成从抱怨到系统设计的认知升级。',doc:'yizhimiao_brand.html'},
  navsite:{tag:'网站',title:'CTBU一只喵学习干货导航站',meta:'角色：独立开发者｜状态：已上线｜对象：CTBU新生',
    desc:'面向新生的校园信息导航网站，把分散在各个群和公众号里的信息，按「入学 / 学习 / 生活」重组为能按场景检索的结构，减少新生信息差。从信息梳理到设计开发独立完成。',
    images:[],video:'',
    result:'网站已上线；作为CTBU一只喵品牌的内容载体之一。',website:'https://belyn13301-ops.github.io/ctbu-guide/'},
  teachsite:{tag:'网站',title:'小余老师专属网站',meta:'角色：独立开发者｜状态：已上线｜对象：数学老师',
    desc:'这是为喜欢花的小余老师定制的个人网站，从发现需求到设计完成，均为独立进行。做成温馨的花园风格——因为她爱花；页面里还留了护嗓小贴士，讲几节课，嗓子最辛苦。',
    images:[],video:'',
    result:'网站已上线；获得老师认可。',website:'xiaoyulaoshi.html'},
  speech:{tag:'演讲',title:'《我和你，是一样的中华魂》',meta:'角色：演讲者｜状态：已公开演讲',
    desc:'从重庆"四公里站"站名切入抗日战争运输坐标——这些数字不是丈量城市的距离，是当年卡车碾过碎石路、士兵扛着弹药箱时刻在土地上的运输坐标。到渣滓洞、白公馆的红岩信仰，最后落到"我们和先辈是一样的中华魂"。将在地历史知识与情感传达结合。',
    images:[],video:'',
    result:'完成公开演讲；锻炼表达能力和在地知识研究能力；演讲文稿可作为文字作品展示。'},
  insight:{tag:'研究',title:'校园招募洞察报告',meta:'角色：主笔｜时间：2026暑期｜北辰青年实习产出',
    desc:'面向Z世代大学生群体的系统化洞察，覆盖消费行为、社交习惯、学习方式、职业焦虑四个维度。方法上我没有做问卷和正式访谈——而是把自己放在一线：一边做校园账号、卖校园卡，一边在评论区接触大量学生和家长，再和同在一线的同事交流，把真正碰到的问题和痛点沉淀成用户画像与商业建议。',
    images:[],video:'',
    result:'完成11页完整洞察报告；建立大学生用户画像；输出可落地的商业建议。方法说明：洞察来自一线实践观察（做账号 + 卖校园卡 + 评论区），非问卷抽样，结论的适用边界我自己会主动说明。'},
  manual:{tag:'个人',title:'AI时代个人说明书',meta:'角色：作者｜时间：2026暑期｜北辰青年实习产出',
    desc:'在AI时代重新定义「我是谁」。从能力图谱、工作风格、协作方式到价值观，系统梳理个人定位与优势。它不是简历——简历回答「你做过什么」，说明书回答「怎么和你协作、怎么激发你的优势」。',
    images:[],video:'',
    result:'完成8页个人说明书；建立个人能力图谱与协作风格说明；已成为求职面试AI Skill的结构化输入（个人说明书 + 简历 + 岗位JD → 匹配分析）。'}
};

/* 打开项目详情 */
function openProjectDetail(pid){
  const p=PROJECTS[pid];if(!p)return;
  const isHangyan=(pid==='hangyan');
  const isPeiyang=(pid==='peiyang');
  const isInsight=(pid==='insight');
  const isManual=(pid==='manual');
  document.getElementById('pd-pdf-preview').style.display=isHangyan?'block':'none';
  document.getElementById('pd-pdf-preview-peiyang').style.display=isPeiyang?'block':'none';
  document.getElementById('pd-pdf-preview-insight').style.display=isInsight?'block':'none';
  document.getElementById('pd-pdf-preview-manual').style.display=isManual?'block':'none';
  if(isHangyan||isPeiyang||isInsight||isManual){
    // hangyan项目只显示PDF预览，隐藏其他内容
    document.getElementById('pd-tag').style.display='none';
    document.getElementById('pd-title').style.display='none';
    document.getElementById('pd-meta').style.display='none';
    document.getElementById('pd-desc').style.display='none';
    document.getElementById('pd-gallery').style.display='none';
    document.getElementById('pd-video').style.display='none';
    document.getElementById('pd-result').style.display='none';
  }else{
    // 其他项目正常显示
    document.getElementById('pd-tag').style.display='inline-block';
    document.getElementById('pd-title').style.display='block';
    document.getElementById('pd-meta').style.display='block';
    document.getElementById('pd-desc').style.display='block';
    document.getElementById('pd-gallery').style.display='grid';
    document.getElementById('pd-video').style.display='block';
    document.getElementById('pd-result').style.display='block';
    document.getElementById('pd-tag').textContent=p.tag;
    document.getElementById('pd-title').textContent=p.title;
    document.getElementById('pd-meta').innerHTML=p.meta;
    document.getElementById('pd-desc').innerHTML=p.desc;
    const gallery=document.getElementById('pd-gallery');gallery.innerHTML='';
    if(p.images&&p.images.length){
      p.images.forEach(src=>{
        const div=document.createElement('div');
        div.style.cssText='aspect-ratio:4/3;background:#ddd;border-radius:8px;overflow:hidden;';
        div.innerHTML=`<img src="${src}" style="width:100%;height:100%;object-fit:cover;">`;
        gallery.appendChild(div);
      });
    }
    const videoDiv=document.getElementById('pd-video');
    if(p.video){
      videoDiv.innerHTML=`<a href="${p.video}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:var(--pink-soft);border-radius:24px;text-decoration:none;color:var(--accent-deep);font-size:14px;font-weight:bold;">▶ 观看相关视频</a>`;
    }else{videoDiv.innerHTML='';}
    document.getElementById('pd-result').innerHTML=p.result?`<strong>成果与收获：</strong>${p.result}`:'';
    if(p.doc){
      var docBtn = '<br><br><a href="' + p.doc + '" target="_blank" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:bold;box-shadow:0 4px 12px rgba(212,138,160,.3);">📖 查看完整品牌探讨文档</a>';
      document.getElementById('pd-result').innerHTML += docBtn;
    }
    if(p.website){
      var btn = '<br><br><a href="' + p.website + '" target="_blank" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:bold;box-shadow:0 4px 12px rgba(212,138,160,.3);">🌐 访问这个网站</a>';
      document.getElementById('pd-result').innerHTML += btn;
    }
  }
  const win=document.getElementById('win-project-detail');
  win.classList.remove('closed','min');win.classList.add('show');
  focusWin(win.dataset.win);
  placeWin(win);                       /* 项目详情是最常点的窗口，也要居中弹出 */
  const titleEl=win.querySelector('.win-title');titleEl.textContent='';
  const full=isHangyan?'潮流盲盒玩具行研报告.pdf':(isPeiyang?'人才培养方案项目化学习汇报.pdf':(isInsight?'校园招募洞察报告.pdf':(isManual?'AI时代个人说明书.pdf':p.title)));let i=0;
  const iv=setInterval(()=>{titleEl.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv);},55);
}function closeProjectDetail(){
  const win=document.getElementById('win-project-detail');
  win.classList.add('closed');win.classList.remove('show','active','max');
}
/* 项目卡片点击事件 */
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click',()=>openProjectDetail(card.dataset.pid));
});
const isMobile=()=>window.matchMedia('(max-width:680px)').matches;

const deskSvg={
  projects:`<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="4" width="5" height="2" fill="#9b8f82"/><rect x="2" y="5" width="12" height="9" fill="#d3a9b6"/><rect x="2" y="5" width="12" height="1" fill="#f3e7da"/><rect x="3" y="8" width="10" height="1" fill="#fbf6ee"/><rect x="3" y="10" width="7" height="1" fill="#fbf6ee"/><rect x="3" y="12" width="9" height="1" fill="#fbf6ee"/></svg>`,
  study:`<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="3" width="8" height="10" fill="#fbf6ee"/><rect x="7" y="3" width="2" height="10" fill="#d3a9b6"/><rect x="5" y="5" width="1" height="6" fill="#c98aa0"/><rect x="9" y="5" width="2" height="1" fill="#9be8ff"/><rect x="9" y="8" width="2" height="1" fill="#9be8ff"/><rect x="9" y="11" width="1" height="1" fill="#f0c2cf"/></svg>`,
  about:`<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="6" y="3" width="4" height="4" fill="#f0dbe0"/><rect x="4" y="8" width="8" height="5" fill="#f0dbe0"/><rect x="5" y="9" width="6" height="3" fill="#e7a9b8"/><rect x="7" y="4" width="2" height="1" fill="#c98aa0"/></svg>`,
  work:`<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="12" fill="#e7a9b8"/><rect x="2" y="7" width="12" height="2" fill="#e7a9b8"/><rect x="5" y="5" width="6" height="6" fill="#f3e7da"/><rect x="6" y="6" width="4" height="4" fill="#e7a9b8"/></svg>`,
  contact:`<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="4" width="10" height="8" fill="#fbf6ee"/><rect x="3" y="4" width="10" height="1" fill="#d3a9b6"/><rect x="3" y="5" width="5" height="3" fill="#e7a9b8"/><rect x="8" y="5" width="5" height="3" fill="#e7a9b8"/><rect x="3" y="11" width="10" height="1" fill="#d3a9b6"/></svg>`,
};

let zTop=9600;
const taskBtns=document.getElementById('taskBtns');
const screenEl=document.querySelector('.monitor-screen');
/* 坐标系说明：.monitor-screen 有 transform:translateZ(0)，创建了包含块，
   所以窗口的 left/top 是相对「屏幕」的，不能用 window.innerWidth/innerHeight 算居中。
   之前就是这里算错，导致窗口被推到屏幕下方看不见。 */
function screenW(){return screenEl?screenEl.offsetWidth:window.innerWidth;}
function screenH(){return screenEl?screenEl.offsetHeight:window.innerHeight;}
/* 窗口居中弹出 + 轻微级联：后开的错开 24px，既显眼又不完全盖住 */
var openCount=0;
function placeWin(win){
  if(!win||isMobile())return;                 // 手机端是卡片流，不做定位
  var w=win.offsetWidth||520, h=win.offsetHeight||420;
  var step=(openCount++%6)*24;
  var x=(screenW()-w)/2+step, y=(screenH()-h)/2-18+step;
  win.style.left=Math.max(8,Math.min(x,Math.max(8,screenW()-w-8)))+'px';
  win.style.top =Math.max(8,Math.min(y,Math.max(8,screenH()-90)))+'px';
}
function clampX(x){return Math.max(8,Math.min(x,screenW()-348));}
function clampY(y){return Math.max(8,Math.min(y,screenH()-134));}
function openWin(id){__mScroll(id);
  const win=document.getElementById('win-'+id);if(!win)return;
  win.classList.remove('closed','min');win.classList.add('show');
  if(isMobile())win.classList.add('max');          /* 手机端：窗口直接最大化铺满屏幕 */
  if(!win.dataset.placed){placeWin(win);win.dataset.placed='1';typeTitle(win);}
  focusWin(id);addTaskBtn(id);
}
function focusWin(id){
  const win=document.getElementById('win-'+id);if(!win)return;
  /* 层级用尽时按当前顺序压缩重排（不能直接回绕到 9600，
     否则新聚焦的窗口会掉到最底层，反而被别的窗口盖住） */
  if(zTop>=9890){
    const all=[...document.querySelectorAll('.win')]
      .map(function(w){return {w:w,z:parseInt(w.style.zIndex)||9600};})
      .sort(function(a,b){return a.z-b.z;});
    all.forEach(function(o,i){o.w.style.zIndex=String(9600+i);});
    zTop=9600+all.length;
  }
  win.style.zIndex=String(++zTop);
  document.querySelectorAll('.win').forEach(w=>w.classList.toggle('active',w.dataset.win===id));
  document.querySelectorAll('.task-btn').forEach(b=>b.classList.toggle('active',b.dataset.win===id));
  closeStart();
}
function minimizeWin(id){document.getElementById('win-'+id).classList.add('min');}
function toggleMax(id){const win=document.getElementById('win-'+id);if(win&&!isMobile())win.classList.toggle('max');}
function closeWin(id){const win=document.getElementById('win-'+id);win.classList.add('closed');win.classList.remove('show','active','max');const b=document.querySelector('.task-btn[data-win="'+id+'"]');if(b)b.remove();}
function typeTitle(win){const t=win.querySelector('.win-title');const full=t.dataset.title;t.textContent='';let i=0;const iv=setInterval(()=>{t.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv);},55);}
function addTaskBtn(id){
  if(document.querySelector('.task-btn[data-win="'+id+'"]'))return;
  const meta=WINDOWS.find(w=>w.id===id);
  const b=document.createElement('div');b.className='task-btn';b.dataset.win=id;
  b.innerHTML=deskSvg[meta.icon]+`<span>${meta.title}</span>`;
  b.addEventListener('click',()=>{const win=document.getElementById('win-'+id);if(win.classList.contains('min')){win.classList.remove('min');focusWin(id);}else if(win.classList.contains('active')){minimizeWin(id);}else{focusWin(id);}});
  taskBtns.appendChild(b);
}

const ringNav=document.getElementById('ringNav');
WINDOWS.forEach((w,i)=>{
  const d=document.createElement('div');d.className='ring-item';d.dataset.win=w.id;
  d.innerHTML=`${deskSvg[w.icon]}<span class="ring-label">${w.cn}</span>`;
  d.addEventListener('click',()=>openWin(w.id));
  ringNav.appendChild(d);
});

const startRow=document.getElementById('startRow');
WINDOWS.forEach(w=>{
  const it=document.createElement('div');it.className='start-item';it.dataset.win=w.id;
  it.innerHTML=deskSvg[w.icon]+`<div class="sl">${w.cn}</div>`;
  it.addEventListener('click',()=>{openWin(w.id);closeStart();});
  startRow.appendChild(it);
});
function toggleStart(){document.getElementById('startMenu').classList.toggle('hidden');}
function closeStart(){document.getElementById('startMenu').classList.add('hidden');}
document.getElementById('startBtn').addEventListener('click',e=>{e.stopPropagation();toggleStart();});
document.addEventListener('click',e=>{if(!e.target.closest('.start-menu')&&!e.target.closest('#startBtn'))closeStart();});

let dragWin=null,offX=0,offY=0,rafP=false,lx=0,ly=0;
function onBarDown(e){
  if(e.button!==0)return;if(isMobile())return;if(e.target.closest('.win-btns'))return;
  const bar=e.currentTarget,win=bar.closest('.win');focusWin(win.dataset.win);
  if(win.classList.contains('max'))return;
  const r=win.getBoundingClientRect();offX=e.clientX-r.left;offY=e.clientY-r.top;
  dragWin=win;win.classList.add('dragging');
  try{bar.setPointerCapture(e.pointerId);}catch(_){}
}
function onMove(e){
  if(!dragWin)return;
  const sr=screenEl.getBoundingClientRect();
  lx=Math.max(0,Math.min(e.clientX-offX-sr.left,sr.width-60));
  ly=Math.max(0,Math.min(e.clientY-offY-sr.top,sr.height-54));
  if(!rafP){rafP=true;requestAnimationFrame(()=>{dragWin.style.left=lx+'px';dragWin.style.top=ly+'px';rafP=false;});}
}
function onUp(){if(dragWin){dragWin.classList.remove('dragging');dragWin=null;}}
document.querySelectorAll('.win-bar').forEach(bar=>bar.addEventListener('pointerdown',onBarDown));
document.addEventListener('pointermove',onMove);
document.addEventListener('pointerup',onUp);
document.querySelectorAll('.win').forEach(w=>w.addEventListener('pointerdown',()=>focusWin(w.dataset.win)));

const windowsEl=document.getElementById('windows');
/* 窗口控制按钮：直接绑到每个按钮上，不用事件委托。
   原因：委托绑在 #windows 上，靠冒泡传递。深层详情窗口（实习 / 北辰 / 支教 / 行研）
   的点击到不了 #windows，导致缩小 / 放大 / 关闭三个按钮全部失灵。
   直接绑定不依赖冒泡，任何一个窗口都保证可用。 */
function bindWinButtons(){
  document.querySelectorAll('.win-btns button').forEach(function(b){
    if(b.dataset.wbBound)return;            // 防止重复绑定
    b.dataset.wbBound='1';
    b.setAttribute('type','button');        // 避免被当作提交按钮
    b.addEventListener('click',function(e){
      e.preventDefault(); e.stopPropagation();
      const win=b.closest('.win'); if(!win)return;
      const id=win.dataset.win;
      if(b.classList.contains('wb-close'))closeWin(id);
      else if(b.classList.contains('wb-min'))minimizeWin(id);
      else if(b.classList.contains('wb-max'))toggleMax(id);
    });
  });
}
bindWinButtons();

function tick(){const n=new Date();const hh=String(n.getHours()).padStart(2,'0');const mm=String(n.getMinutes()).padStart(2,'0');const el=document.getElementById('taskClock');if(el)el.textContent=hh+':'+mm;}
tick();setInterval(tick,15000);

const KEY='ctbu-theme';
if(localStorage.getItem(KEY)==='night')document.body.classList.add('night');
document.getElementById('themeToggle').addEventListener('click',e=>{e.stopPropagation();document.body.classList.toggle('night');localStorage.setItem(KEY,document.body.classList.contains('night')?'night':'day');});

let gTimer=null;
document.addEventListener('click',e=>{
  if(e.target.closest('.theme-toggle'))return;if(isMobile())return;
  document.body.classList.add('glitching');clearTimeout(gTimer);
  gTimer=setTimeout(()=>document.body.classList.remove('glitching'),250);
});

const setSVG=(id,html)=>{const el=document.getElementById(id);if(el)el.innerHTML=html;};
setSVG('ph-cobig',`<svg width="180" height="200" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><ellipse cx="90" cy="188" rx="72" ry="10" fill="rgba(120,100,85,.16)"/><rect x="14" y="20" width="152" height="158" rx="22" fill="url(#pinkPlastic)" stroke="#d3a9b6" stroke-width="2"/><rect x="22" y="28" width="136" height="104" rx="16" fill="#f6efe6" stroke="#e0d4c2" stroke-width="1.5"/><circle cx="90" cy="80" r="42" fill="#eef3f6" stroke="#cdbfb2" stroke-width="1.5"/><circle cx="90" cy="80" r="42" fill="none" stroke="#9be8ff" stroke-width="1.4" opacity=".55"/><circle cx="90" cy="80" r="30" fill="none" stroke="#d9cfc0" stroke-width="1"/><circle cx="90" cy="80" r="15" fill="#e7c3cb" stroke="#d3a9b6" stroke-width="1.5"/><circle cx="90" cy="80" r="4.5" fill="#fff"/><path d="M132,40 l3,7 l7,0 l-5,5 l2,7 l-7,-4 l-7,4 l2,-7 l-5,-5 l7,0 Z" fill="#e7a9b8" stroke="#d99fb0" stroke-width="1"/><rect x="22" y="140" width="136" height="30" rx="9" fill="#2a2430"/><rect x="22" y="140" width="136" height="30" rx="9" fill="none" stroke="#9be8ff" stroke-width="1" opacity=".55"/><text x="36" y="161" font-family="VT323,'Courier New',monospace" font-size="15" fill="#ffc6e6">♪ 03</text><text x="90" y="160" font-family="Courier New, monospace" font-size="9" fill="#9be8ff">* 2003</text><g fill="#f3ece2" stroke="#d3a9b6" stroke-width="1"><circle cx="120" cy="155" r="5"/><circle cx="138" cy="155" r="5"/></g></svg>`);
setSVG('ph-jaybig',`<svg width="170" height="188" viewBox="0 0 172 190" xmlns="http://www.w3.org/2000/svg"><ellipse cx="86" cy="178" rx="64" ry="9" fill="rgba(120,100,85,.16)"/><rect x="18" y="14" width="136" height="152" rx="14" fill="rgba(246,239,230,.42)" stroke="#d9cfc0" stroke-width="2"/><circle cx="86" cy="80" r="46" fill="#2b2b33"/><circle cx="86" cy="80" r="46" fill="none" stroke="#9be8ff" stroke-width="1.5" opacity=".6"/><circle cx="86" cy="80" r="13" fill="#15151b"/><text x="86" y="85" text-anchor="middle" font-family="Courier New, monospace" font-size="15" fill="#ffc6e6">JAY</text><rect x="96" y="120" width="42" height="22" rx="4" fill="#f0dbe0" stroke="#d3a9b6" stroke-width="1.2"/><text x="117" y="136" text-anchor="middle" font-family="VT323,'Courier New',monospace" font-size="14" fill="#c98aa0">YE</text><path d="M40,128 q-7,-9 -14,0 q-7,9 14,19 q21,-10 14,-19 q-7,-9 -14,0 Z" fill="none" stroke="#e7a9b8" stroke-width="2"/></svg>`);

const floaties=document.getElementById('floaties');
function mk(html,cls){const d=document.createElement('div');d.className='floaty '+cls;d.innerHTML=html;floaties.appendChild(d);}
const cobigSVG=document.getElementById('ph-cobig').innerHTML;
const jaybigSVG=document.getElementById('ph-jaybig').innerHTML;
const radioSVG=`<svg width="92" height="82" viewBox="0 0 96 84" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="22" x2="8" y2="2" stroke="#b6ada3" stroke-width="2"/><circle cx="8" cy="2" r="2.6" fill="#d99fb0"/><rect x="10" y="20" width="78" height="58" rx="11" fill="url(#pinkPlastic)" stroke="#d3a9b6" stroke-width="1.5"/><rect x="18" y="28" width="42" height="17" rx="3" fill="#2a2430"/><rect x="18" y="28" width="42" height="17" rx="3" fill="none" stroke="#9be8ff" stroke-width="1" opacity=".6"/><text x="39" y="40" text-anchor="middle" font-family="VT323,'Courier New',monospace" font-size="12" fill="#ffc6e6">FM 89</text><g fill="#e7c3cb" opacity=".85"><circle cx="68" cy="40" r="3"/><circle cx="76" cy="40" r="3"/><circle cx="68" cy="48" r="3"/><circle cx="76" cy="48" r="3"/><circle cx="68" cy="56" r="3"/><circle cx="76" cy="56" r="3"/></g><circle cx="30" cy="60" r="6" fill="#f3ece2" stroke="#d3a9b6" stroke-width="1.5"/><circle cx="30" cy="60" r="2" fill="#d99fb0"/></svg>`;
const cdSVG=`<svg width="86" height="86" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="72" height="68" rx="13" fill="url(#pinkPlastic)" stroke="#d3a9b6" stroke-width="1.5"/><circle cx="44" cy="40" r="20" fill="#f6efe6" stroke="#cdbfb2" stroke-width="1"/><circle cx="44" cy="40" r="6" fill="#e7c3cb" stroke="#d3a9b6"/><circle cx="44" cy="40" r="2" fill="#fff"/><rect x="14" y="16" width="24" height="11" rx="2" fill="#2a2430"/><text x="26" y="24" text-anchor="middle" font-family="VT323,'Courier New',monospace" font-size="10" fill="#9be8ff">&gt;03</text><text x="44" y="76" text-anchor="middle" font-family="Courier New, monospace" font-size="9" fill="#d99fb0">* 2003</text></svg>`;
const jaycdSVG=`<svg width="78" height="82" viewBox="0 0 80 84" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="8" width="60" height="68" rx="6" fill="rgba(246,239,230,.45)" stroke="#d9cfc0" stroke-width="1.5"/><circle cx="40" cy="38" r="19" fill="#2b2b33"/><circle cx="40" cy="38" r="19" fill="none" stroke="#9be8ff" stroke-width="1" style="opacity:.5"/><circle cx="40" cy="38" r="5" fill="#15151b"/><text x="40" y="42" text-anchor="middle" font-family="Courier New, monospace" font-size="9" fill="#ffc6e6">JAY</text><rect x="44" y="60" width="22" height="11" rx="2" fill="#f0dbe0" stroke="#d3a9b6"/><text x="55" y="68" text-anchor="middle" font-family="VT323,'Courier New',monospace" font-size="10" fill="#c98aa0">YE</text></svg>`;
mk(cobigSVG,'f-cd1');mk(jaybigSVG,'f-cd2');mk(radioSVG,'f-radio');mk(cdSVG,'f-cd');mk(jaycdSVG,'f-jaycd');

/* 蝴蝶 + 偶尔停在窗口上 */
const bflyLayer=document.getElementById('butterflies');
let bId=0;
const bflyDefs=[
  {anim:'flyA',dur:30,delay:0,w:64},
  {anim:'flyB',dur:38,delay:-10,w:52},
  {anim:'flyC',dur:34,delay:-18,w:70},
  {anim:'flyA',dur:42,delay:-26,w:46},
];
const bflyEls=[];
bflyDefs.forEach(b=>{
  const id='bf'+(bId++);
  const el=document.createElement('div');
  el.className='bfly';el.style.width=b.w+'px';
  el.style.animationName=b.anim;el.style.animationDuration=b.dur+'s';el.style.animationDelay=b.delay+'s';
  el.innerHTML=`<svg class="bfly-svg" viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0c2cf"/><stop offset=".5" stop-color="#f6e6e0"/><stop offset="1" stop-color="#e7a9b8"/></linearGradient></defs><g class="bfly-wings"><g class="wing wing-l"><path d="M30,28 C18,10 4,12 6,26 C8,34 22,32 30,28 Z" fill="url(#${id})" stroke="#d99fb0" stroke-width="1" opacity=".9"/><path d="M30,30 C20,34 10,46 18,48 C26,49 30,38 30,30 Z" fill="url(#${id})" stroke="#d99fb0" stroke-width="1" opacity=".82"/></g><g class="wing wing-r"><path d="M34,28 C46,10 60,12 58,26 C56,34 42,32 34,28 Z" fill="url(#${id})" stroke="#d99fb0" stroke-width="1" opacity=".9"/><path d="M34,30 C44,34 54,46 46,48 C38,49 34,38 34,30 Z" fill="url(#${id})" stroke="#d99fb0" stroke-width="1" opacity=".82"/></g></g><ellipse cx="32" cy="29" rx="2.1" ry="11" fill="#8a7d72"/><path d="M32,19 C30,12 26,9 22,9 M32,19 C34,12 38,9 42,9" stroke="#d99fb0" stroke-width="1" fill="none"/></svg>`;
  bflyLayer.appendChild(el);
  bflyEls.push(el);
});

function butterflyRest(){
  const openWins=document.querySelectorAll('.win.show:not(.closed):not(.min)');
  if(openWins.length===0||isMobile())return;
  const win=openWins[Math.floor(Math.random()*openWins.length)];
  const bar=win.querySelector('.win-bar');
  if(!bar)return;
  const bfly=bflyEls[Math.floor(Math.random()*bflyEls.length)];
  const r=bar.getBoundingClientRect();
  bfly.classList.add('resting');
  bfly.style.left=(r.left+r.width/2-24)+'px';
  bfly.style.top=(r.top-34)+'px';
  bfly.style.transform='rotate(0)';
  setTimeout(()=>{bfly.classList.remove('resting');bfly.style.left='';bfly.style.top='';},4000);
}
setInterval(butterflyRest,10000);

var resumeBtn=document.getElementById('resumeBtn');
if(resumeBtn){                       /* 按钮可能已被移除，判空避免整块脚本报错 */
resumeBtn.addEventListener('click',()=>{
  const txt='CTBU一只喵 · 个人简历（占位）\n\n—— 本文件为网站自动生成的占位简历，请替换为真实内容后使用。\n\n昵称：秋玲 / CTBU一只喵\n学校：重庆工商大学 · 市场营销\n定位：值得信赖的学姐 · 校园干货 / 成长思考 / AI 工具赋能\n平台：小红书 / 抖音 / 公众号 / 知乎\n';
  const blob=new Blob([txt],{type:'text/plain;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='CTBU一只喵_简历.txt';a.click();URL.revokeObjectURL(a.href);
});
}

/* 手机端不再自动展开全部窗口：与电脑端一致，等用户自己点图标开窗口 */

/* ============ 浮动提示系统 ============ */
(function(){
  var _hints=[
    {text:'双击桌面空白处，会有小惊喜出现 ✨',pos:'br'},
    {text:'点击桌面图标，打开我的故事',pos:'br'},
    {text:'试试拖动窗口标题栏，像用真电脑一样',pos:'br'},
    {text:'任务栏最右边✦可以切换日/夜模式 🌙',pos:'tr'}
  ];
  var _hintIdx=0,_hintEl=null,_hintTimer=null;
  function _showHint(){
    if(_hintIdx>=_hints.length){_hideHint();return;}
    var h=_hints[_hintIdx];
    if(_hintEl)_hintEl.remove();
    _hintEl=document.createElement('div');
    _hintEl.className='hint-bubble';
    _hintEl.innerHTML='<button class="hint-close" onclick="this.parentElement.remove()">✕</button>'+
      '<span class="hint-dot"></span>'+h.text+
      '<div class="hint-step">'+(_hintIdx+1)+' / '+_hints.length+' · 点桌面继续</div>';
    if(h.pos==='br'){_hintEl.style.bottom='82px';_hintEl.style.right='28px';}
    else{_hintEl.style.top='28px';_hintEl.style.right='28px';}
    document.body.appendChild(_hintEl);
    _hintIdx++;
    clearTimeout(_hintTimer);
    _hintTimer=setTimeout(_showHint,6500);
  }
  function _hideHint(){
    if(_hintEl){_hintEl.classList.add('out');var el=_hintEl;setTimeout(function(){el.remove();},400);_hintEl=null;}
    clearTimeout(_hintTimer);
  }
  var _enterBtn=document.getElementById('gateEnter');
  if(_enterBtn){_enterBtn.addEventListener('click',function(){setTimeout(_showHint,2600);});}
  else{setTimeout(_showHint,2600);}
  document.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('.hint-bubble'))return;
    if(_hintEl&&_hintIdx<_hints.length)_showHint();
  });
  window._showHint=_showHint;
})();

/* 教育局实习详情 */
function openInternshipDetail(){
  var win=document.getElementById('win-internship');
  if(!win)return;
  win.classList.remove('closed','min');win.classList.add('show');
  focusWin(win.dataset.win);
  win.style.maxWidth=Math.min(680,screenW()*0.9)+'px';
  placeWin(win);
  var titleEl=win.querySelector('.win-title');titleEl.textContent='';
  var full='internship.record';var i=0;
  var iv=setInterval(function(){titleEl.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv);},55);}
function closeInternshipDetail(){
  var win=document.getElementById('win-internship');
  if(win){win.classList.add('closed');win.classList.remove('show','active','max');}
}

/* 北辰青年实习详情 */
function openBeichenDetail(){
  var win=document.getElementById('win-beichen-detail');
  if(!win)return;
  win.classList.remove('closed','min');win.classList.add('show');
  focusWin(win.dataset.win);
  win.style.maxWidth=Math.min(620,screenW()*0.92)+'px';
  placeWin(win);
  var titleEl=win.querySelector('.win-title');titleEl.textContent='';
  var full='beichen.internship';var i=0;
  var iv=setInterval(function(){titleEl.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv);},55);
}
function closeBeichenDetail(){
  var win=document.getElementById('win-beichen-detail');
  if(win){win.classList.add('closed');win.classList.remove('show','active','max');}
}
/* 童年一课支教详情 */
function openZhijiao(){
  var win=document.getElementById('win-zhijiao');
  if(!win)return;
  win.classList.remove('closed','min');win.classList.add('show');
  focusWin(win.dataset.win);
  win.style.maxWidth=Math.min(620,screenW()*0.92)+'px';
  placeWin(win);
  var titleEl=win.querySelector('.win-title');titleEl.textContent='';
  var full='zhijiao.detail';var i=0;
  var iv=setInterval(function(){titleEl.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv);},55);
}

function openHangyanDetail(){
  var win=document.getElementById('win-hangyan-detail');
  if(win){win.classList.remove('closed','min');win.classList.add('show');focusWin(win.dataset.win);placeWin(win);}
}
function closeHangyanDetail(){
  var win=document.getElementById('win-hangyan-detail');
  if(win){win.classList.add('closed');win.classList.remove('show','active','max');}
}
function closeZhijiao(){
  var win=document.getElementById('win-zhijiao');
  if(win){win.classList.add('closed');win.classList.remove('show','active','max');}
}
