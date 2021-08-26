import { defineMessages } from 'react-intl'

export const commonMessages = {
  unknown: defineMessages({
    period: { id: 'common.unknown.period', defaultMessage: '未知週期' },
  }),
  unit: defineMessages({
    min: { id: 'common.unit.min', defaultMessage: '分' },
    sec: { id: 'common.unit.sec', defaultMessage: '秒' },
    hour: { id: 'common.unit.hour', defaultMessage: '時' },
    day: { id: 'common.unit.day', defaultMessage: '天' },
    week: { id: 'common.unit.week', defaultMessage: '週' },
    month: { id: 'common.unit.month', defaultMessage: '月' },
    monthWithQuantifier: { id: 'common.unit.monthWithQuantifier', defaultMessage: '個月' },
    year: { id: 'common.unit.year', defaultMessage: '年' },
  }),
  label: defineMessages({
    listPrice: { id: 'common.label.listPrice', defaultMessage: '定價' },
    free: { id: 'common.label.free', defaultMessage: '免費' },
    firstPeriod: { id: 'common.label.firstPeriod', defaultMessage: '首期' },
    fromSecondPeriod: { id: 'common.label.fromSecondPeriod', defaultMessage: '第二期開始' },
    originalPrice: { id: 'common.label.originalPrice', defaultMessage: '原價' },
    name: { id: 'common.label.name', defaultMessage: '名稱' },
  }),
  ui: defineMessages({
    uploadImage: { id: 'common.ui.uploadImage', defaultMessage: '上傳圖片' },
    save: { id: 'common.ui.save', defaultMessage: '儲存' },
  }),
}

export const productMessages = {
  activity: {
    content: defineMessages({
      remaining: { id: 'product.activity.content.remaining', defaultMessage: '剩餘' },
    }),
  },
}

export const projectMessages = {
  label: defineMessages({
    isExpired: { id: 'project.label.isExpired', defaultMessage: '已結束' },
    isExpiredFunding: { id: 'project.label.isExpiredFunding', defaultMessage: '專案結束' },
  }),
  text: defineMessages({
    people: { id: 'project.text.people', defaultMessage: '{count} {count, plural, one {人} other {人}}' },
    preOrderCountDownDays: {
      id: 'project.text.preOrderCountDownDays',
      defaultMessage: '優惠倒數 {days} {days, plural, one {天} other {天}}',
    },
    fundingCountDownDays: {
      id: 'project.text.fundingCountDownDays',
      defaultMessage: '募資倒數 {days} {days, plural, one {天} other {天}}',
    },
    totalParticipants: {
      id: 'project.text.totalParticipants',
      defaultMessage: '已有 {count} {count, plural, one {人} other {人}}參與',
    },
  }),
}

export const craftPageMessages = {
  ui: defineMessages({
    createPage: { id: 'craft.ui.createPage', defaultMessage: '建立頁面' },
    deleteAllBlock: { id: 'craft.ui.deleteAllBlock', defaultMessage: '移除整個區塊' },
    deleteBlock: { id: 'craft.ui.deleteBlock', defaultMessage: '移除區塊' },
    deletePage: { id: 'craft.ui.deletePage', defaultMessage: '刪除頁面' },
    empty: { id: 'craft.ui.empty', defaultMessage: '無' },
    image: { id: 'craft.ui.image', defaultMessage: '圖片' },
    solidColor: { id: 'craft.ui.solidColor', defaultMessage: '純色' },
  }),
  label: defineMessages({
    emptyPage: { id: 'craft.label.emptyPage', defaultMessage: '空白頁' },
    settings: { id: 'craft.label.settings', defaultMessage: '基本設定' },
    pageEditor: { id: 'craft.label.pageEditor', defaultMessage: '首頁 - 編輯頁面' },
    editPage: { id: 'craft.label.editPage', defaultMessage: '編輯頁面' },
    choiceTemplate: { id: 'craft.label.choiceTemplate', defaultMessage: '選擇版型' },
    pageName: { id: 'craft.label.pageName', defaultMessage: '頁面名稱' },
    path: { id: 'craft.label.urlPath', defaultMessage: '網址路徑' },
    url: { id: 'craft.label.url', defaultMessage: '網址' },
    latestUpdatedAt: { id: 'craft.label.latestUpdatedAt', defaultMessage: '最後修改時間' },
    publish: { id: 'craft.label.publish', defaultMessage: '發佈' },
    columnAmount: { id: 'craft.label.columnAmount', defaultMessage: '欄數' },
    ratio: { id: 'craft.label.ratio', defaultMessage: '比例' },
    displayAmount: { id: 'craft.label.displayAmount', defaultMessage: '資料顯示數量' },
    title: { id: 'craft.label.title', defaultMessage: '標題' },
    titleContent: { id: 'craft.label.titleContent', defaultMessage: '標題內容' },
    content: { id: 'craft.label.content', defaultMessage: '內文' },
    imageSetting: { id: 'craft.label.imageSetting', defaultMessage: '圖片設定' },
    imageStyle: { id: 'craft.label.imageStyle', defaultMessage: '圖片樣式' },
    avatarSetting: { id: 'craft.label.avatar', defaultMessage: '頭像設定' },
    titleStyle: { id: 'craft.label.titleStyle', defaultMessage: '標題樣式' },
    paragraphStyle: { id: 'craft.label.paragraphStyle', defaultMessage: '段落樣式' },
    paragraphContent: { id: 'craft.label.paragraphContent', defaultMessage: '段落內容' },
    cardStyle: { id: 'craft.label.cardStyle', defaultMessage: '卡片樣式' },
    margin: { id: 'craft.label.margin', defaultMessage: '外距' },
    padding: { id: 'craft.label.padding', defaultMessage: '內距' },
    buttonSetting: { id: 'craft.label.buttonSetting', defaultMessage: '按鈕設定' },
    buttonStyle: { id: 'craft.label.buttonStyle', defaultMessage: '按鈕樣式' },
    carouselSetting: { id: 'craft.label.carouselSetting', defaultMessage: '輪播設定' },
    desktopDisplay: { id: 'craft.label.desktopDisplay', defaultMessage: '電腦版顯示' },
    mobileDisplay: { id: 'craft.label.mobileDisplay', defaultMessage: '手機版顯示' },
    link: { id: 'craft.label.link', defaultMessage: '連結' },
    openNewTab: { id: 'craft.label.openNewTab', defaultMessage: '另開分頁' },
    fontSize: { id: 'craft.label.fontSize', defaultMessage: '字級' },
    lineHeight: { id: 'craft.label.lineHeight', defaultMessage: '行高' },
    textAlign: { id: 'craft.label.textAlign', defaultMessage: '對齊' },
    left: { id: 'craft.label.left', defaultMessage: '左' },
    center: { id: 'craft.label.center', defaultMessage: '中' },
    right: { id: 'craft.label.right', defaultMessage: '右' },
    fontWeight: { id: 'craft.label.fontWeight', defaultMessage: '字重' },
    lighter: { id: 'craft.label.lighter', defaultMessage: '細' },
    normal: { id: 'craft.label.normal', defaultMessage: '中' },
    bold: { id: 'craft.label.bold', defaultMessage: '粗' },
    size: { id: 'craft.label.size', defaultMessage: '尺寸' },
    large: { id: 'craft.label.large', defaultMessage: '大' },
    middle: { id: 'craft.label.middle', defaultMessage: '中' },
    small: { id: 'craft.label.small', defaultMessage: '小' },
    width: { id: 'craft.label.width', defaultMessage: '寬度' },
    buttonBlock: { id: 'craft.label.buttonBlock', defaultMessage: '滿版' },
    variant: { id: 'craft.label.variant', defaultMessage: '變化' },
    plainText: { id: 'craft.label.plainText', defaultMessage: '純文字' },
    coloring: { id: 'craft.label.coloring', defaultMessage: '填色' },
    background: { id: 'craft.label.background', defaultMessage: '背景' },
    backgroundColor: { id: 'craft.label.backgroundColor', defaultMessage: '底色' },
    none: { id: 'craft.label.none', defaultMessage: '無樣式' },
    outline: { id: 'craft.label.outline', defaultMessage: '線框' },
    color: { id: 'craft.label.color', defaultMessage: '顏色' },
    containerComponent: { id: 'craft.label.containerComponent', defaultMessage: '區塊元件' },
    desktopLayoutComponent: { id: 'craft.label.desktopLayoutComponent', defaultMessage: '電腦版排版元件' },
    mobileLayoutComponent: { id: 'craft.label.mobileLayoutComponent', defaultMessage: '手機版排版元件' },
    allTemplate: { id: 'craft.label.allTemplate', defaultMessage: '所有樣板' },
    cover: { id: 'craft.label.cover', defaultMessage: '輪播' },
    programBlock: { id: 'craft.label.programBlock', defaultMessage: '課程區塊' },
    activityBlock: { id: 'craft.label.activityBlock', defaultMessage: '活動區塊' },
    podcastBlock: { id: 'craft.label.podcastBlock', defaultMessage: '廣播區塊' },
    lecturerBlock: { id: 'craft.label.lecturerBlock', defaultMessage: '講師區塊' },
    fundraisingBlock: { id: 'craft.label.fundraisingBlock', defaultMessage: '講師區塊' },
    preOrderBlock: { id: 'craft.label.preOrderBlock', defaultMessage: '預購專區' },
    statistics: { id: 'craft.label.statisticsBlock', defaultMessage: '統計數字' },
    description: { id: 'craft.label.description', defaultMessage: '描述' },
    feature: { id: 'craft.label.feature', defaultMessage: '特色' },
    callToAction: { id: 'craft.label.callToAction', defaultMessage: '行動呼籲' },
    referrerEvaluation: { id: 'craft.label.referrerEvaluation', defaultMessage: '推薦評價' },
    partner: { id: 'craft.label.partner', defaultMessage: '合作夥伴' },
    commonProblem: { id: 'craft.label.commonProblem', defaultMessage: '常見問題' },
    imageBlock: { id: 'craft.label.imageBlock', defaultMessage: '圖片區塊' },
    textBlock: { id: 'craft.label.textBlock', defaultMessage: '文字區塊' },
    programSection: { id: 'craft.label.programSection', defaultMessage: '課程區塊' },
    activitySection: { id: 'craft.label.activitySection', defaultMessage: '活動區塊' },
    blockSetting: { id: 'craft.label.blockSetting', defaultMessage: '區塊樣式' },
    dataDisplay: { id: 'craft.label.dataDisplay', defaultMessage: '資料顯示' },
    specifyDisplayItem: { id: 'craft.label.specifyDisplayItem', defaultMessage: '指定顯示項目' },
    choiceData: { id: 'craft.label.choiceData', defaultMessage: '選擇資料' },
    program: { id: 'craft.label.program', defaultMessage: '課程' },
    activity: { id: 'craft.label.activity', defaultMessage: '活動' },
    podcast: { id: 'craft.label.podcast', defaultMessage: '廣播' },
    lecturer: { id: 'craft.label.lecturer', defaultMessage: '講師' },
    fundraising: { id: 'craft.label.fundraising', defaultMessage: '募資' },
    preOrder: { id: 'craft.label.preOrder', defaultMessage: '預購' },
    newest: { id: 'craft.label.newest', defaultMessage: '最新上架' },
    custom: { id: 'craft.label.newest', defaultMessage: '自訂項目' },
    ruleOfSort: { id: 'craft.label.ruleOfSort', defaultMessage: '排序規則' },
  }),
  text: defineMessages({
    deleteWarning: {
      id: 'craft.text.deleteWarning',
      defaultMessage: '刪除不可恢復，確定要刪除嗎？',
    },
    deletePageConfirmation: {
      id: 'craft.text.deletePageConfirmation',
      defaultMessage: '頁面一經刪除即不可恢復，確定要刪除嗎？',
    },
    deletePageWarning: {
      id: 'craft.text.deletePageWarning',
      defaultMessage: '請仔細確認是否真的要刪除頁面，因為一旦刪除就無法恢復。',
    },
    noPageName: {
      id: 'craft.text.noPageName',
      defaultMessage: '尚未填寫頁面名稱',
    },
    noPath: {
      id: 'craft.text.noPath',
      defaultMessage: '尚未填寫網址路徑',
    },
    notCompleteNotation: {
      id: 'craft.text.notCompleteNotation',
      defaultMessage: '請填寫以下必填資料，填寫完畢即可由此發佈',
    },
    unpublishedNotation: {
      id: 'craft.text.unpublishedNotation',
      defaultMessage: '因你的頁面未發佈，此頁面並不會顯示。',
    },
    publishedNotation: {
      id: 'craft.text.publishedNotation',
      defaultMessage: '現在你的頁面已經發佈，此頁面將會顯示。',
    },
    boxModelInputWarning: {
      id: 'craft.text.boxModelInputWarning',
      defaultMessage: '請填入以下格式，5;3;5;3;',
    },
  }),
}
