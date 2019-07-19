import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      user_name: '张三' + Mock.mock('@integer(1, 999)'),
      mobile: '18912345678',
      nick_name: '测试',
      gender: Mock.mock('@integer(1, 2)'),
      state: Mock.mock('@integer(1, 2)'),
      type: Mock.mock('@integer(1, 2)'),
      user_level: 1,
      pb_date: Mock.mock('@datetime'),
      up_date: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const parkList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      park_name: '甘肃紫光停车场',
      person_mobile: '18912345678',
      person_name: '张三',
      park_total: '500',
      state: 1,
      pb_date: Mock.mock('@datetime'),
      up_date: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const carList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      user_id: tmpKey,
      plate_no: '甘AZG23',
      plate_color: '0',
      park_service: 1,
      car_type: 1,
      validity: 1,
      etc_service: 1,
      etc_no: '622347863748563475',
      card_type: 1,
      car_status: 1,
      state: 1,
      pb_date: Mock.mock('@datetime'),
      up_date: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const artList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      art_title: '甘AZG23',
      art_content: `<h1 class="ql-align-center"><strong class="ql-size-huge">巴黎圣母院被烧了</strong></h1><p class="ql-align-justify">  有着850年历史的巴黎圣母院，巴黎地标性建筑的巴黎圣母院，因为雨果作品在文学史上永远璀璨的巴黎圣母院，就这样笼罩在一片大火中。打个比方，卢浮宫在巴黎的地位，相当于北京的故宫；那圣母院在巴黎的地位，绝对不亚于北京的天坛。但<strong>现在，“巴黎的天坛”被大火吞噬了。</strong>在社交媒体上，很多人用“心碎”、“我的心也被焚烧”来表达悲伤。</p><p class="ql-align-justify">		一直对法国冷嘲热讽的特朗普，还很不寻常地发推特支招说：<strong>看到巴黎圣母院大火燃烧太恐怖了，或许空中灭火可以扑灭，但必须尽快行动！</strong>特朗普的心情可以理解，但法国方面却毫无犹豫拒绝了，因为不靠谱。显然是回应特朗普，在一则特意用英文发的推特上，法国内政部门这样解释：<strong>已采取了所有手段，除了用飞机发射水炮，因为如果这样做的话，（水的重量）会导致圣母院所有建筑倒塌。</strong></p><p class="ql-align-justify">		法国总统马克龙火速赶到现场指挥，他也不忘在推特上说：<strong>和所有同胞一样，我今晚也非常悲伤，眼睁睁看着我们的一部分在燃烧。</strong>电视画面上，眼泪在马克龙眼眶里打转。唯一让人感到宽慰的是，虽然巴黎圣母院被焚烧了相当部分，但毕竟没有完全被烧毁。马克龙更承诺，将集合全世界的智慧，重建巴黎圣母院。只是新的圣母院，还是那个圣母院吗？一个这么重要的建筑，怎么会发生这样的悲剧？</p><p class="ql-align-justify">		具体原因还有待调查。但这不由让人想起了<strong>墨菲定律（Murphy's law）。</strong>美国一空军基地的墨菲上尉在研究事故中发现：<strong>如果有两种或两种以上的方式去做某件事情，而其中一种选择方式将导致灾难，则必定有人会做出这种选择。</strong>这就是“墨菲定律”，主要内容有四个方面：</p><p class="ql-align-justify">		一、任何事都没有表面看起来那么简单；</p><p class="ql-align-justify">		二、所有的事都会比你预计的时间长；</p><p class="ql-align-justify">		三、会出错的事总会出错；</p><p class="ql-align-justify">		四、如果你担心某种情况发生，那么它就更有可能发生。</p><p class="ql-align-justify">		如果大家看过电影《星际穿越》的话，对“墨菲定律”或许并不陌生。这其实都说明一个问题：<strong>事故肯定存在隐患，应该也出现过异常现象的苗头，只要一个隐患被堵住、一个征兆被提前发现，往往就能避免整个事故的发生。</strong>这个世界，来不得半点侥幸的。很多时候，最糟糕的事情总会发生。</p><p class="ql-align-center"><img src="https://pics1.baidu.com/feed/a71ea8d3fd1f413480fc046b99a938ced0c85e12.jpeg?token=b47ef34bb1c775c57e30ebc676e1edd7&amp;s=EC721CC744170BD452C564320300F050"></p><p class="ql-align-center"><img src="https://pic.rmb.bdstatic.com/7d43e40d24b4212335dd66157633bfc26567.gif" width="171px"></p><p class="ql-align-justify">		在法国，最近糟糕的事情似乎一件接着一件。最新的，自然是这次巴黎圣母院火灾；还在继续的，则是黄马甲抗议，每一周都有新花样；另外，恐怖事件虽比以前少了一些，但隔一段时间仍会发生。总有一种感觉，<strong>法国病了。</strong>这一系列的悲剧，其实暴露出法国这个老牌资本主义的大国表面繁荣下存在的种种问题。至少一大治国软肋，那就是太过疏松随意的治理方式。很简单，如果防火措施足够到位，如果能把小火扼杀在点燃之时，就不会有这样的悲剧。</p><p class="ql-align-justify">		但这个世界，是不存在如果的。这种松懈，其实还表现在法国最近几年的安全防范上。恐怖主义确实防不胜防，但前几年，恐怖分子能拿着AK47和炸弹在巴黎繁华街区如入无人之境，这种安保漏洞也真让人叹为观止！</p><p class="ql-align-justify">		一位曾长期在法国工作的记者朋友说：<span style="color: rgb(153, 153, 153);">为什么是法国？法国人，呵呵，傲慢，作死，真没有办法。此前，有个加拿大杀人狂魔，在巴黎呆了几天，法国警察愣让人跑了。可他一跑德国去就被抓住了。警戒太松懈了。法国人会说，呵呵，我们自由，警察不管我们。但是恐怖分子管啊！</span></p><p class="ql-align-center"><img src="https://pics1.baidu.com/feed/4b90f603738da977568e9eb90ee7551d8718e33e.jpeg?token=91f47a1a30c05fdb8499eea3a90c468c&amp;s=1726F2057413FFDC02955C80030070A8"></p><p class="ql-align-justify">		我理解他对法国的喜爱和无奈。但至少有时，这还真就是法国的现实。所以，我们看到，法国人阅兵和其他国家很不一样，队伍往往歪歪斜斜，士兵有时还松松垮垮。你可以将这理解为一种错落的美，也未必真反映到战斗力上。但军队总要有军队的样子，太过随意，何尝不是一种国民性的折射。</p><p class="ql-align-justify">		法国人是最浪漫的民族，这一点似乎也是全世界的共识。但浪漫过度的另一面，其实就是随意，是享受。所以，哪怕是黄马甲运动，一星期也就抗议一天，抗议示威其实也挺累的，所以还要周日休息一天，这样才能缓过劲来去上班。</p><p class="ql-align-justify">		这个世界，怕就怕认真二字。不认真，难免就出大错；不认真，就不会好的回报。天上毕竟不会掉馅饼，高福利是好，但高福利也养懒了很多人。太过疏松的治理方式背后，悲剧就会不断发生，墨菲定律不仅仅只是一个定律。</p><p class="ql-align-justify">		总是很心痛，巴黎圣母院的大火，也不仅仅是法国人的痛；穿越了800多年历史的标志性建筑，就这样被大火吞噬，总也是整个人类文明的悲哀。警钟必须长鸣。法国的惨痛教训，也值得很多国家认真反思！</p><p><br></p>`,
      art_state: Mock.mock('@integer(1, 3)'),
      publisher: 'user',
      auditer: 'admin',
      pb_date: Mock.mock('@datetime'),
      up_date: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    data: [
      {
        id: 1,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title: 'Alipay',
        description: '那是一种内在的东西， 他们到达不了，也无法触及的',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 2,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        title: 'Angular',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 3,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        title: 'Ant Design',
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 4,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        title: 'Ant Design Pro',
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 5,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
        title: 'Bootstrap',
        description: '凛冬将至',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 6,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
        title: 'Vue',
        description: '生命就像一盒巧克力，结果往往出人意料',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      }
    ],
    pageSize: 10,
    pageNo: 0,
    totalPage: 6,
    totalCount: 57
  })
}

const activity = () => {
  return builder([
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      },
      project: {
        name: '白鹭酱油开发组',
        action: '更新',
        event: '番组计划'
      },
      time: '2018-08-23 14:47:00'
    },
    {
      id: 1,
      user: {
        nickname: '蓝莓酱',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
      },
      project: {
        name: '白鹭酱油开发组',
        action: '更新',
        event: '番组计划'
      },
      time: '2018-08-23 09:35:37'
    },
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: '@image(64x64)'
      },
      project: {
        name: '白鹭酱油开发组',
        action: '创建',
        event: '番组计划'
      },
      time: '2017-05-27 00:00:00'
    },
    {
      id: 1,
      user: {
        nickname: '曲丽丽',
        avatar: '@image(64x64)'
      },
      project: {
        name: '高逼格设计天团',
        action: '更新',
        event: '六月迭代'
      },
      time: '2018-08-23 14:47:00'
    },
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: '@image(64x64)'
      },
      project: {
        name: '高逼格设计天团',
        action: 'created',
        event: '六月迭代'
      },
      time: '2018-08-23 14:47:00'
    },
    {
      id: 1,
      user: {
        nickname: '曲丽丽',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      },
      project: {
        name: '高逼格设计天团',
        action: 'created',
        event: '六月迭代'
      },
      time: '2018-08-23 14:47:00'
    }
  ])
}

const teams = () => {
  return builder([
    {
      id: 1,
      name: '科学搬砖组',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    {
      id: 2,
      name: '程序员日常',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
    },
    {
      id: 1,
      name: '设计天团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
    },
    {
      id: 1,
      name: '中二少女团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
    },
    {
      id: 1,
      name: '骗你学计算机',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
    }
  ])
}

const radar = () => {
  return builder([
    {
      item: '引用',
      个人: 70,
      团队: 30,
      部门: 40
    },
    {
      item: '口碑',
      个人: 60,
      团队: 70,
      部门: 40
    },
    {
      item: '产量',
      个人: 50,
      团队: 60,
      部门: 40
    },
    {
      item: '贡献',
      个人: 40,
      团队: 50,
      部门: 40
    },
    {
      item: '热度',
      个人: 60,
      团队: 70,
      部门: 40
    },
    {
      item: '引用',
      个人: 70,
      团队: 50,
      部门: 40
    }
  ])
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/car\/list/, 'get', carList)
Mock.mock(/\/park/, 'get', parkList)
Mock.mock(/\/art\/list/, 'get', artList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
