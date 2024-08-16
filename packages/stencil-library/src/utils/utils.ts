export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getSurveyData(rawData) {
  if (!rawData) return null

  const { assessmentCollection } = rawData || {}
  const { items } = assessmentCollection || {}
  const survey = items?.[0]
  return survey
}

export function getSurveyQuestions(survey) {
  if (!survey) return null
  const questions = survey.questions.pages.map(
    page => page.elements
  )?.flat()
  return questions
}

export function truncateText(text, length) {
  return text.length > length ? `${text.substring(0, length)}...` : text
}
