import {projects as baseProjects,jobs as baseJobs,advantages as baseAdvantages} from './base-content';
import {caseStudies} from './case-studies';

// Shared facts remain in base-content and case-studies. Profiles change emphasis only.
const metrics=baseProjects.map(({id,metric,unit,label})=>({id,metric,unit,label}));
const legacy={
 id:'original',role:'产品运营 / 产品经理',aboutTitle:['产品运营 /','产品经理。'],
 eyebrow:'PRODUCT OPERATIONS / GROWTH',translation:'Find insights in data. Drive change through product & operations.',
 headline:['用数据发现问题，','用产品与运营推动改变。'],
 keywords:'用户洞察 · 产品迭代 · 业务增长',
 lead:'拥有软件商业化与 OTT 内容产品经历，围绕转化、留存和收入开展分析、策略设计与产品迭代。',
 support:'独立统筹需求、原型和交付，结合 AI 制作可交互原型及部分功能雏形，与研发和测试协作推进上线。',
 experience:'有丰富的软件商业化，用户留存，用户体验优化的实操落地经验。',
 approach:['从用户洞察到交互原型，','从策略实验到团队交付。'],
 notes:[['围绕目标验证方案','围绕需求或迭代的 MVP 目标制定效果指标。A/B 测试通常采用 50/50 分流；按用户标签开展的定向投放作为分人群策略验证单独评估。'],['用 AI 缩短原型验证路径','使用 AI 辅助生成与转化原型，完成部分 HTML 页面和后台逻辑雏形，与研发协作补全接口及复杂逻辑，推动想法进入实际交付。']],
 footer:'Product Operations & Growth',backImage:'/assets/card-back.svg',
 projects:baseProjects,jobs:baseJobs,advantages:baseAdvantages,metrics
};

const ops={
 education:{honors:['国家级奖学金','省级优秀学生干部','省级优秀毕业生','省级大学生职业规划大赛优秀奖','省级优秀班集体（集体荣誉）'],summary:'在校获多项校级奖项与奖学金。参与策划、统筹、主持与演讲 20 余次大型活动，活动规模 200–500 余人，积累活动组织、沟通表达与现场协调经验。'},
 id:'ops',role:'产品运营 / 用户运营',aboutTitle:['产品运营 /','用户运营。'],
 eyebrow:'PRODUCT & USER OPERATIONS',translation:'Understand users through data. Drive conversion, retention & growth.',
 headline:['用AI和数据理解用户，','用策略推动转化与留存。'],keywords:'用户洞察 · 分层运营 · 商业化增长',
 heroNote:'4年+工作经验 · 国内与出海业务 · 百万DAU产品运营',
 lead:'兼具国内百万 DAU 内容产品与出海软件商业化运营经验，围绕用户分层、活动策划、价格策略和内容推荐推进增长：黑五单渠道月销售 45 万美元，站点相关转化指标相对提升 10%–30%，内容产品策略覆盖人群的使用时长与次日留存环比提升 10% 以上。',
 support:'具备多产品并行运营与高压交付能力，覆盖 EaseUS 多款核心产品页及 VoiceWave 客户端相关工作。在日常优化与大促任务并行时，统筹策略、埋点和跨团队协作，黑五期间保持每 1–2 天一次版本更新，持续跟进上线、效果与迭代。',
 facts:['4年+工作经验','高频 AI 协作 · 高效原型验证','国内与出海产品经验','英语能力优秀','产品经验与需求思维','HTML / 代码基础'],
 experienceTitle:'把策略做实，把成果做出来。',
 experience:'从出海软件商业化到国内百万 DAU 内容运营，持续围绕收入、转化与留存交付成果。',
 methodology:[['洞察','从行为数据与业务目标明确问题。'],['策略','按人群差异匹配内容、折扣与价格。'],['验证','跟进埋点与实验，按效果迭代复盘。']],
 metrics:metrics.map(item=>item.id==='03'?{...item,metric:'+10%',label:'策略覆盖人群次日留存环比提升',note:'内容产品 · 个人策略覆盖人群 · 较上月'}:item),
 heroVisual:{color:'#5fffce',glintColor:'#d6fffb',glint:0.48,contrast:1.15,fog:0.4},
 approach:['从用户洞察到分层策略，','从活动执行到效果复盘。'],
 footer:'Product & User Operations',backImage:'/assets/card-back-ops.svg',
 notes:[['从用户问题到可验证的增长策略','从国内百万 DAU 内容产品与出海软件场景出发，结合行为数据识别安装、购买、使用深度和留存中的问题，再将业务目标拆解为页面、内容、优惠券或人群策略。按国家、语言、复购与活跃情况组织差异化方案；A/B 实验通常采用 50/50 分流，标签定向策略单独评估，结合观察周期、覆盖人群和比较基准判断效果。'],['用交付节奏连接方案、上线与复盘','把策略转化为可评审的页面、原型与埋点需求，独立对接设计、研发和测试，跟进资源、版本和上线细节。黑五期间保持每 1–2 天一次更新，依据数据反馈持续调整玩法与价格策略。高频使用 AI 辅助数据拉取、分析、策略完善和复盘，并制作可交互原型与部分功能雏形，接口及复杂逻辑与研发协作完成。']],
 advantages:[
 {title:'深度应用 AI',en:'AI WORKFLOW',text:'熟练将 AI 融入数据拉取、分析、策略完善、上线与复盘全流程，制作可交互原型和部分功能雏形，加快方案沟通与验证；接口和复杂逻辑与研发协作完成。',tools:'Claude Code / Codex / Deepseek / Kimi',shape:'orbit'},
 {title:'匹配人群与商业化策略',en:'SEGMENTATION & GROWTH',text:'结合行为数据与国家、语言、复购、活跃等维度匹配人群，统筹黑五玩法、优惠券及差异化价格策略。以埋点和实验持续优化：A/B 测试通常采用 50/50 分流，标签定向策略单独评估。',tools:'人群分层 / 活动策划 / 价格策略 / A/B 测试',shape:'layers'},
 {title:'连接产品、团队与决策',en:'PRODUCT & COMMUNICATION',text:'具备独立站负责人及客户端产品经理经历，将业务需求转化为清晰的方案与原型。善于跨团队沟通、资源协调和汇报表达，清晰呈现方案逻辑、进展与结果，推动团队共识与协作落地。',tools:'产品经验 / 跨团队协调 / 方案汇报 / 沟通表达',shape:'communication'},
 {title:'推动执行与复盘',en:'EXECUTION',text:'将策略转化为可评审的页面、原型与埋点需求，协调设计、研发和测试，黑五期间每 1–2 天一次更新；复盘时明确观察周期、覆盖人群与比较基准。',tools:'跨团队协作 / 版本跟进 / 数据复盘',shape:'grid'}
 ],
 jobItems:[
 [['大促统筹与销售成果','独立统筹黑五玩法、优惠券、实验与埋点，推动单渠道月销售达到 45 万美元、创历史新高；活动中每 1–2 天一次版本更新，协调设计、研发和测试交付。'],['分层运营与价格策略','结合国家、浏览器语言、复购频率和活跃情况 4 项维度组织人群，推进定制化折扣与价格策略下发，支持活动与日常商业化运营。'],['多产品转化优化','作为网页侧负责人推进多款核心产品页改版，并参与 VoiceWave 客户端 UI 设计。站点策略约一个月观察期内，安装和购买点击相关指标相对提升 10%–30%；上线后数月月均 GMV 较上线前增加 15 万元以上，不含促销活动销售额。']],
 [['百万 DAU 用户运营','面向国内百万 DAU 内容产品开展用户行为分析，围绕细分影视人群制定并下发内容推荐与推送策略，协同多端推广优化内容触达，推动营收环比提升 10% 以上。'],['留存与使用深度','结合私域与热点运营落地个人策略，策略覆盖人群的使用时长、次日留存均较上月提升 10% 以上。'],['产品思维与落地','参与用户标签系统需求梳理、评审与原型设计，协同设计和研发推进上线，为人群策略与精细化运营提供支持。']]
 ],
 order:['02','03','01'],
 projectEdits:{
 '02':{image:'project-campaign-ops-v4.webp',title:'独立统筹黑五商业化运营，单渠道月销售 45 万美元',category:'CAMPAIGN / COMMERCIAL GROWTH',tags:['全流程统筹','分层促销','高频迭代'],evidence:[['$45万','单渠道月销售额'],['1–2天','活动版本更新节奏']],cardSummary:'独立统筹黑五玩法、优惠券、分层价格、埋点与跨团队交付，保持每 1–2 天一次版本更新，推动单渠道月销售达到 45 万美元、创历史新高。'},
 '03':{image:'project-content-ops-v3.webp',title:'日常精细化分层运营，多途径推动日常销售增长',category:'USER OPERATIONS / SEGMENTATION',tags:['人群洞察','精细化运营','策略执行'],evidence:[['4项','国家 / 语言 / 复购 / 活跃'],['分层下发','定制化折扣与价格']],cardSummary:'日常持续维护国家、浏览器语言、复购频率与活跃情况 4 项维度的用户分层，针对不同人群下发差异化折扣与价格策略，推动购买点击、下载等核心转化率明显提升；结合 EDM、Bundle 组合销售、限时促销及区域化定价，多途径推动日常销售增长。'},
 '01':{image:'project-web-ops-v4.webp',title:'多产品转化运营优化，站点相关指标相对提升 10%–30%',category:'CONVERSION / USER EXPERIENCE',tags:['多产品运营','转化优化','A/B 测试'],evidence:[['10%–30%','站点相关转化指标相对提升'],['15万元+','上线后月均 GMV 增量']],cardSummary:'覆盖 EaseUS 核心产品页及 VoiceWave 客户端相关工作，优化内容、营销与价格表达；站点相关转化指标相对提升 10%–30%，上线后月均 GMV 较上线前增加 15 万元以上，不含促销活动销售额。'}
 },
 caseEdits:{
 '02':{
 presentation:{hideNavigation:true,hideVisualNote:true,hideProcess:true,hideCriteria:true,hideTakeaway:true,hideBottom:true,fullWidthSummary:true},
 summary:'独立统筹黑五商业化运营，完成前期玩法、阶段性营销锚点及不同 SKU 的折扣价格设计；结合用户埋点与订单反馈，主动发起并主导每 1–2 天一次的版本迭代，推动单渠道月销售达到 45 万美元、创历史新高。',
 ownership:'独立完成活动前期玩法、阶段性营销锚点及不同 SKU 的折扣价格设计，统筹优惠券、人群策略与埋点。活动中结合国家、产品线等维度分析用户行为及订单数据，主动发起并主导每 1–2 天一次的版本迭代，协调设计、研发与测试完成上线，并持续补充和更新埋点。',
 scope:caseStudies['02'].scope.map(([label,value])=>[label,label==='迭代节奏'?'主动发起并主导每 1–2 天一次版本迭代':value]),
 annotations:[
  {title:'独立设计活动玩法与 SKU 折扣',text:'从前期活动玩法、阶段性营销锚点到折扣价格方案均独立完成，针对不同 SKU 设置差异化折扣，将活动节奏与各产品的促销方案衔接。',x:23,y:24},
  {title:'多维数据分析与定向策略调整',text:'活动过程中结合国家、产品线等维度分析用户行为与订单表现，识别转化盲点及人群差异，有针对性地调整折扣方案并下发用户策略。',x:50,y:45},
  {title:'主导高频迭代与埋点完善',text:'结合用户埋点与订单数据反馈，主动发起并主导每 1–2 天一次版本更新，持续调整活动方案，同步更新和补充埋点，跟踪迭代效果。',x:85,y:62}
 ],
 strategy:[['国家与语言','结合国家与浏览器语言拆解活动表现，识别不同市场和人群的转化差异，支持定向折扣调整与用户策略下发。'],['复购频率与产品线 × SKU 分析','结合用户复购频率、产品线及 SKU 交叉分析购买与订单表现，识别不同产品和复购人群的转化盲点，据此调整对应 SKU 的折扣与价格方案。'],['行为反馈与策略迭代','持续跟踪用户埋点与订单数据，判断折扣调整及策略下发后的表现，发起后续版本优化，并同步补充和更新埋点。']],
 outcomes:[{value:'$450,000',label:'单渠道月销售额',note:'黑五活动期间，单渠道月销售达到 45 万美元。'},{value:'历史新高',label:'黑五促销活动销售表现',note:'通过玩法、分层价格策略与持续迭代推动销售创历史新高。'}]
 },
 '03':{
 presentation:{hideNavigation:true,hideCriteria:true,hideTakeaway:true,hideBottom:true,hideVisualNote:true,hideProcess:true,fullWidthSummary:true},
 summary:'日常持续维护国家、浏览器语言、复购频率与活跃情况 4 项维度的用户分层，匹配差异化折扣与价格策略并推进下发，推动购买点击、下载等核心转化率明显提升，持续优化商业化收益。',
 context:'在软件商业化日常运营中，持续维护用户分层并跟踪人群行为差异，将折扣和价格策略与对应用户连接，在日常与活动场景中兼顾转化效率和商业化收益。',
 ownership:'持续维护用户属性与行为标签，结合消费、地域、年龄等人群特征及不同产品线、SKU 的消费情况，精准匹配促销促活策略，推进下发并跟踪购买点击、下载等核心转化表现，优化转化效率与商业化收益。',
 annotations:[
  {title:'产品线与 SKU 的多样化促销',text:'结合不同产品线及 SKU 的特点，匹配并下发多样化促销与促活方案，通过邮件触达、组合销售、限时优惠及区域化价格，连接不同场景下的用户需求与购买决策。',methods:['EDM 邮件营销','Bundle 组合销售','限时 Sales','区域化定价'],x:36,y:43},
  {title:'基于用户标签精准下发策略',text:'结合用户消费、地域、年龄等标签，识别人群需求与购买偏好，匹配差异化折扣、内容与触达方式，精准下发用户策略，持续提升转化效率与商业化收益。',x:96,y:35}
 ],
 strategy:[['地域与用户标签','结合国家、浏览器语言、年龄等属性及消费行为识别人群差异，为定向促销、区域化定价与用户策略下发提供依据。'],['复购频率和产品线消费情况','结合用户复购频率、已购产品线及 SKU 消费情况进行分层，识别不同产品偏好与复购需求，匹配组合销售、差异化折扣和相应触达策略。'],['促销促活与效果跟踪','结合 EDM 邮件营销、Bundle 组合销售、限时 Sales 和区域化定价推进策略下发，持续观察购买点击、下载等核心转化表现，并根据反馈调整策略。']],
 outcomes:[{value:'转化提升',label:'购买点击与下载',note:'差异化折扣与价格策略下发后，购买点击、下载等核心转化率明显提升。'},{value:'日常维护',label:'精细化用户分层',note:'持续维护国家、浏览器语言、复购频率与活跃情况 4 项维度，优化策略匹配与商业化收益。'}]
 },
 '01':{
 presentation:{hideNavigation:true,hideVisualNote:true,hideProcess:true,hideCriteria:true,hideTakeaway:true,hideBottom:true,fullWidthSummary:true},
 ownership:'担任英语主站的独立站负责人，以及部分产品客户端的产品经理，统筹用户分析、需求梳理、方案与原型设计，推进站点与客户端的内容、交互及商业化体验优化，并协调设计、研发与测试完成埋点、上线和效果验证。',
 scope:caseStudies['01'].scope.map(([label,value])=>[label,label==='业务场景'?'EaseUS 英语主站 / 部分产品客户端':label==='我的角色'?'英语主站独立站负责人 / 部分客户端产品经理':value]),
 annotations:[
  {title:'以埋点识别页面交互问题',text:'旧页面 UI 设计老化，交互体验欠佳，销售表现未达预期。结合交互埋点分析用户路径与关键行为，定位页面承接问题，明确以提升核心交互率为改版目标。',x:27,y:42},
  {title:'协同优化视觉、交互与价格表达',text:'结合 UI 设计、产品价值锚点与用户决策心理，优化内容层级、关键交互和价格呈现，让站点视觉、使用体验与价格感知共同支持用户的购买决策。',x:78,y:72},
  {title:'通过实验与灰度持续验证',text:'改版过程中通过 A/B 测试与小范围灰度发布，实时观察数据表现，必要时及时微调方案；结合交互埋点与销售数据验证优化效果，持续改善转化并推动销售金额提升。',x:60,y:46}
 ],
 summary:'围绕多款 EaseUS 产品页和 VoiceWave 客户端相关工作优化转化体验，统筹内容、营销、价格表达与埋点实验。站点相关指标相对提升 10%–30%，策略上线后数月月均 GMV 较上线前增加 15 万元以上，不含促销活动销售额。',
 strategy:[['梳理用户路径','结合用户行为分析梳理产品页的安装、购买等关键行为，确定页面与内容优化方向。'],['优化营销与价格表达','重构核心产品页与客户端 UI 中的内容和营销表达，将套餐价格信息与转化入口衔接。'],['用实验跟踪效果','推进埋点与 A/B 测试，观察站点侧安装、购买点击等相关指标；不单独归因客户端 UI 的量化收益。']],
 takeaway:'把用户行为分析、页面承接与实验验证连接起来，用运营策略推动产品转化体验改善。'}
 }
};

const pm={
 education:ops.education,heroVisual:ops.heroVisual,metrics:ops.metrics.map(item=>({...item,label:item.id==='01'?'产品迭代后相关转化指标相对提升':item.id==='02'?'独立统筹活动方案，单次活动销售额':item.label})),
 heroNote:'4年+工作经验 · 国内与出海产品 · 需求到上线交付',
 facts:[...ops.facts],
 experienceTitle:'让需求落地，让结果可验证。',
 methodology:[['定义问题','从业务目标与行为数据梳理需求。'],['表达方案','用流程、原型与评审明确交付内容。'],['验证迭代','跟进埋点和上线，以实验验证效果。']],
 id:'pm',role:'产品经理',aboutTitle:['产品经理。'],eyebrow:'PRODUCT MANAGEMENT',
 translation:'Define the problem. Design the solution. Deliver and iterate.',
 headline:['用AI和数据洞察需求，','用产品方案推动业务增长。'],keywords:'需求洞察 · 产品方案 · 交付验证',
 lead:'兼具国内百万 DAU 内容产品与出海软件商业化经历，承担需求分析、方案与原型设计、跨团队交付和上线验证。站点相关转化指标相对提升 10%–30%，参与推进的黑五活动单渠道月销售达到 45 万美元；内容产品个人策略覆盖人群的使用时长与次日留存环比提升 10% 以上。',
 support:'担任英语主站独立站负责人及部分产品客户端产品经理，推进 EaseUS 核心产品页与客户端的需求分析、方案原型和体验优化。结合 AI、埋点、A/B 测试及小范围灰度验证方案；黑五期间主动发起并主导每 1–2 天一次的版本迭代，协同设计、研发与测试完成交付。',
 experience:'从核心产品页面、客户端 UI 到中后台产品协作，连接需求、方案、交付与效果验证，关注体验与商业目标的一致性。',
 approach:['从业务问题到需求与原型，','从协作交付到上线验证。'],
 footer:'Product Management',backImage:'/assets/card-back-pm.svg',
 notes:[['以目标约束产品方案','围绕需求或迭代的 MVP 目标明确效果指标，结合埋点及 A/B 测试验证方案。将实验分流与用户标签定向下发分别评估。'],['用 AI 提前验证产品表达','用 AI 辅助生成可交互原型、HTML 页面和部分后台逻辑雏形，让需求更易讨论和验证；接口与复杂逻辑由研发协作补全。']],
 advantages:[
 {title:'用 AI 加快产品验证',en:'AI WORKFLOW',text:'将 AI 融入数据分析、需求梳理、方案与原型验证，制作可交互页面及部分功能雏形，缩短沟通与试验路径；接口和复杂逻辑与研发协作完成。',tools:'Claude Code / Codex / Deepseek / Kimi',shape:'orbit'},
 {title:'连接用户需求与产品方案',en:'INSIGHT & PRODUCT DESIGN',text:'结合行为数据与使用场景识别问题，将用户分层、价格策略及活动需求转化为清晰的产品方案与原型，通过埋点、A/B 测试及小范围灰度持续验证。',tools:'需求分析 / 用户分层 / 交互原型 / 实验验证',shape:'layers'},
 {title:'推动共识与产品决策',en:'PRODUCT & COMMUNICATION',text:'具备英语主站负责人及客户端产品经理经历，善于跨团队沟通、资源协调与汇报表达，清晰呈现需求依据、方案取舍及结果，推动团队形成共识并落实决策。',tools:'产品经验 / 跨团队协调 / 方案汇报 / 沟通表达',shape:'communication'},
 {title:'推动交付与结果复盘',en:'EXECUTION',text:'协调设计、研发与测试完成评审、埋点和上线，黑五期间主动主导每 1–2 天一次迭代；结合行为与订单数据跟踪效果，明确观察周期与比较基准，推动后续优化。',tools:'需求评审 / 版本迭代 / 数据复盘 / 跨团队交付',shape:'grid'}
 ],
 jobItems:[
 [['产品方案与设计','担任英语主站独立站负责人及部分产品客户端产品经理，负责需求分析、方案与原型设计，推进 EaseUS 核心产品页面及客户端体验优化，覆盖内容、交互、营销表达与价格策略。'],['跨团队交付','独立统筹黑五玩法、阶段性营销锚点及不同 SKU 的折扣方案，主动发起并主导每 1–2 天一次版本迭代，协调评审、埋点及上线；活动单渠道月销售达到 45 万美元、创历史新高。'],['上线验证与迭代','结合用户行为、订单数据、A/B 测试及小范围灰度持续验证方案，安装和购买点击相关指标在约一个月观察期内相对提升 10%–30%；上线后数月月均 GMV 较上线前增加 15 万元以上，不含促销活动销售额。']],
 [['用户分析与产品优化','面向百万 DAU 内容产品分析用户行为，参与细分人群内容推荐、策略下发与多端推广，连接用户需求与内容触达，推动营收环比提升 10% 以上。'],['中后台产品协作','参与用户标签系统需求梳理、评审与原型设计，协同设计、研发推进上线，为精细化运营与人群策略提供支持。'],['效果跟踪','结合私域与热点运营落地个人策略，跟进设计和研发细节；覆盖人群使用时长和次日留存均较上月提升 10% 以上。']]
 ],
 order:['01','03','02'],
 projectEdits:{
 '01':{image:ops.projectEdits['01'].image,title:'核心产品页与客户端体验重构，站点相关指标相对提升 10%–30%',category:'PRODUCT DESIGN / COMMERCIALIZATION',tags:['需求分析','交互原型','上线验证'],evidence:ops.projectEdits['01'].evidence,cardSummary:'作为英语主站独立站负责人及部分客户端产品经理，从行为数据明确改版需求，统筹方案、原型与交付验证；相关转化指标相对提升 10%–30%，上线后数月月均 GMV 较上线前增加 15 万元以上，不含促销活动销售额。'},
 '03':{image:ops.projectEdits['03'].image,title:'连接用户分层与商业化方案，多途径推动日常销售增长',category:'USER STRATEGY / PRODUCT LOGIC',tags:['用户洞察','策略方案','转化验证'],evidence:ops.projectEdits['03'].evidence,cardSummary:'将用户属性、行为与产品线消费情况转化为可执行的人群策略，连接差异化价格、EDM、Bundle 组合销售及限时促销等触点，推动购买点击、下载等核心转化率明显提升，支持日常销售增长。'},
 '02':{image:ops.projectEdits['02'].image,title:'黑五活动方案设计与高频交付，单渠道月销售 45 万美元',category:'CAMPAIGN PRODUCT / DELIVERY',tags:['玩法设计','埋点需求','版本推进'],evidence:ops.projectEdits['02'].evidence,cardSummary:'独立完成活动玩法、阶段性营销锚点及不同 SKU 的折扣方案，结合用户埋点与订单反馈，主动发起并主导每 1–2 天一次版本迭代，活动单渠道月销售达到 45 万美元、创历史新高。'}
 },
 caseEdits:{
 '01':{
  ...ops.caseEdits['01'],
  summary:'以英语主站独立站负责人及部分客户端产品经理的角色，从交互埋点与销售表现识别改版需求，统筹产品方案、原型与跨团队交付，并通过 A/B 测试、小范围灰度持续验证。站点相关转化指标相对提升 10%–30%，上线后数月月均 GMV 较上线前增加 15 万元以上，不含促销活动销售额。',
  ownership:'担任英语主站独立站负责人及部分产品客户端产品经理，负责需求分析、产品方案、原型及体验优化，协调设计、研发与测试完成评审、埋点和上线，并结合行为与销售数据持续验证和迭代。',
  strategy:[['以数据定义改版需求','结合老页面的交互体验与销售表现，分析埋点、用户路径和关键行为，明确以核心交互率改善为目标的产品需求。'],['将需求转化为方案与原型','组织内容层级、产品价值锚点、交互及价格表达，结合用户决策心理完善方案，协同设计、研发落实页面与客户端体验。'],['通过实验与灰度验证','采用 A/B 测试和小范围灰度观察行为与销售表现，必要时微调方案；明确比较基准、观察周期和指标含义，推动后续产品迭代。']]
 },
 '03':{
  ...ops.caseEdits['03'],
  summary:'将用户属性、复购与产品线消费情况组织为可执行的人群策略方案，连接差异化价格、EDM、Bundle 组合销售、限时促销和区域化定价等触点，推动购买点击、下载等核心转化率明显提升，支持日常销售增长。',
  context:'围绕软件商业化场景中的用户差异，梳理分层依据与触达需求，将人群、产品线及 SKU 与相应的价格和促销方案衔接，兼顾用户体验和商业目标。',
  ownership:'结合用户消费、地域、年龄及复购等标签，梳理产品线和 SKU 消费情况，组织差异化折扣、价格与触达方案，推进对应策略下发并跟踪核心转化表现。',
  strategy:[['梳理用户与场景需求','结合国家、语言、年龄等属性及消费行为识别人群差异，明确相应的策略与触达需求。'],['连接复购与产品线消费情况','结合复购频率、已购产品线和 SKU 消费情况组织人群，将差异化折扣、组合销售等方案与对应用户关联。'],['推进策略交付并跟踪验证','衔接 EDM、Bundle、限时促销及区域化定价等触点，推进策略落地，并根据购买点击、下载等数据反馈持续调整方案。']]
 },
 '02':{
  ...ops.caseEdits['02'],
  summary:'将黑五业务目标转化为活动玩法、阶段性营销锚点和不同 SKU 的折扣方案，独立统筹埋点与跨团队交付。结合用户行为、国家与产品线订单反馈，主动发起并主导每 1–2 天一次版本迭代，推动单渠道月销售达到 45 万美元、创历史新高。',
  ownership:'独立完成前期玩法、阶段性营销锚点及不同 SKU 的折扣方案，明确策略与埋点需求，协调设计、研发与测试上线。活动中结合用户行为与订单数据主动主导高频迭代，持续补充和更新埋点。',
  scope:ops.caseEdits['02'].scope.map(([label,value])=>[label,label==='我的角色'?'活动方案 / 策略 / 版本与埋点独立统筹':value])
 }
 }

};

export function getProfile(){
 const mode=import.meta.env.MODE;
 const key=['ops','pm'].includes(mode)?mode:window.location.pathname.split('/').filter(Boolean)[0];
 const variant={ops,pm}[key];
 if(!variant)return legacy;
 const profile={...legacy,...variant};
 profile.jobs=baseJobs.map((job,i)=>({...job,items:variant.jobItems[i]}));
 profile.advantages=variant.advantages.map((item,i)=>({...item,n:String(i+1).padStart(2,'0')}));
 profile.projects=variant.order.map((id,i)=>({...baseProjects.find(p=>p.id===id),...variant.projectEdits[id],number:String(i+1).padStart(2,'0'),caseStudy:{...caseStudies[id],...variant.caseEdits[id]}}));
 return profile;
}
