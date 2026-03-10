import type { QuizDimensionResult, QuizKey, QuizQuestion } from './types'

export const quizQuestions: QuizQuestion[] = [
  { key: 'height', emoji: '📏', label: '身高', unit: 'cm', ideal: 185 },
  { key: 'weight', emoji: '⚖️', label: '体重', unit: 'kg', ideal: 90 },
  { key: 'shoeSize', emoji: '👟', label: '鞋码', unit: '码', ideal: 45 },
  { key: 'factor18', emoji: '🔮', label: '18因子', unit: '', ideal: 18 },
]

const toNumber = (value: string) => Number(value || 0)

const getDimensionDescription = (key: QuizKey, value: number) => {
  if (!value) return '该维度暂未录入有效数字，研究院无法继续追踪。'

  switch (key) {
    case 'height':
      if (value < 175) return '高度偏保守，离核心模板还有肉眼可见的差距。'
      if (value < 183) return '身高已进入观察区，但还没完全贴上 185 基准线。'
      if (value <= 187) return '高度命中标准射程，338 雷达已经亮起。'
      return '高度强势超线，属于一眼能被注意到的体量。'
    case 'weight':
      if (value < 75) return '质量参数偏轻，整体压迫感不够饱满。'
      if (value < 85) return '质量参数接近标准，但还差一点厚重感。'
      if (value <= 95) return '质量维度达标，已经踩在理论核心带上。'
      return '质量参数偏高，属于重量级候选。'
    case 'shoeSize':
      if (value < 42) return '支撑系统规格偏小，暂未进入经典 45 模板。'
      if (value < 43) return '鞋码接近目标，但还没正式卡进标准区间。'
      if (value <= 46) return '支撑系统状态优良，理论适配度很高。'
      return '鞋码规格溢出，属于扩展型底盘。'
    case 'factor18':
      if (value < 18) return '18 因子未觉醒，神秘变量依旧沉睡。'
      if (value <= 22) return '18 因子触发成功，玄学模块开始共振。'
      if (value <= 30) return '18 因子能量偏高，已经出现强化迹象。'
      return '18 因子异常活跃，进入传说波段。'
  }
}

export const buildQuizSummary = (form: Record<QuizKey, string>) => {
  const values = {
    height: toNumber(form.height),
    weight: toNumber(form.weight),
    shoeSize: toNumber(form.shoeSize),
    factor18: toNumber(form.factor18),
  }

  const matched = {
    height: values.height >= 183 && values.height <= 187,
    weight: values.weight >= 85 && values.weight <= 95,
    shoeSize: values.shoeSize >= 43 && values.shoeSize <= 46,
    factor18: values.factor18 >= 18 && values.factor18 <= 22,
  }

  const dimensions = quizQuestions.reduce<Record<QuizKey, QuizDimensionResult>>((accumulator, question) => {
    const value = values[question.key]
    accumulator[question.key] = {
      value,
      unit: question.unit,
      ratio: value ? Math.min((value / question.ideal) * 100, 100) : 0,
      matched: matched[question.key],
      description: getDimensionDescription(question.key, value),
    }
    return accumulator
  }, {} as Record<QuizKey, QuizDimensionResult>)

  const matchedCount = Object.values(matched).filter(Boolean).length
  const globalMessages: string[] = []

  if (values.height === 185 && values.weight === 90 && values.shoeSize === 45 && values.factor18 === 18) {
    globalMessages.push('👑 四维精确命中 185/90/45/18，属于传说级原生 338 模板。')
  }

  if (matchedCount === 4) {
    globalMessages.push('🔥 四个维度全部落入标准区间，已经非常接近理论原型。')
  }

  if (matched.height && matched.weight && matched.shoeSize) {
    globalMessages.push('🚀 身高、体重、鞋码三轴同步达标，物理层面的 338 感已经成形。')
  }

  if (matched.height && matched.weight) {
    globalMessages.push('📡 高度与质量双维共振，基础盘面相当稳。')
  }

  if (matched.shoeSize && matched.factor18) {
    globalMessages.push('🌀 支撑系统与神秘变量同步在线，这人多少带点宿命色彩。')
  }

  if (matchedCount === 3) {
    globalMessages.push('✨ 三维达标，只差一个因子就能正式冲击 338 门槛。')
  }

  if (matchedCount === 2) {
    globalMessages.push('🎯 已形成双维联动，属于有潜力继续培养的候选体。')
  }

  if (matchedCount <= 1) {
    globalMessages.push('🧪 当前更像 338 观察席成员，短板还比较明显。')
  }

  return {
    matchedCount,
    dimensions,
    globalMessages: [...new Set(globalMessages)],
  }
}
