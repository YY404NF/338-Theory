export type Profile = {
  name: string
  date: string
  avatar: string
}

export type QuizKey = 'height' | 'weight' | 'shoeSize' | 'factor18'

export type QuizQuestion = {
  key: QuizKey
  emoji: string
  label: string
  unit: string
  ideal: number
}

export type QuizDimensionResult = {
  value: number
  unit: string
  description: string
  ratio: number
  matched: boolean
}
