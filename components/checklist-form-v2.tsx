'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  blocks, 
  calculateIntelligentDiagnosis,
  type Responses, 
  type IntelligentDiagnosisResult,
  type CompanySize,
  type CompanyInfo
} from '@/lib/utils-simplified'
import { motion } from 'framer-motion'

export default function ChecklistFormV2() {
  const [responses, setResponses] = useState<Responses>({})
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({ employeeCount: '1' })
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<IntelligentDiagnosisResult | null>(null)
  
  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
  }

  const getCompletionPercentage = () => {
    const totalQuestions = blocks.reduce((sum, block) => sum + block.questions.length, 0)
    const answeredQuestions = Object.keys(responses).length
    return Math.round((answeredQuestions / totalQuestions) * 100)
  }
  
  const handleSubmit = () => {
    const diagnosis = calculateIntelligentDiagnosis(responses, companyInfo)
    setResults(diagnosis)
    setShowResults(true)
    
    // Scroll automático al inicio del informe
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }
  
  const canSubmit = () => {
    const totalQuestions = blocks.reduce((sum, block) => sum + block.questions.length, 0)
    return Object.keys(responses).length === totalQuestions
  }

  const resetForm = () => {
    setResponses({})
    setShowResults(false)
    setResults(null)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critico': return 'bg-red-100 text-red-800 border-red-200'
      case 'basico': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'intermedio': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'avanzado': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getOverallLevelColor = (level: string) => {
    switch (level) {
      case 'inicial': return 'text-red-600'
      case 'basico': return 'text-orange-600'
      case 'intermedio': return 'text-yellow-600'
      case 'avanzado': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  if (showResults && results) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Tu Diagnóstico de Madurez en IA
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Análisis personalizado basado en metodología Big 4</p>
          <div className="bg-blue-50 rounded-lg px-3 sm:px-4 py-2 mt-3 mx-2 sm:mx-0">
            <p className="text-xs sm:text-sm text-blue-700">
              <strong>Perfil organizacional:</strong> {results.organizationContext}
            </p>
          </div>
        </motion.div>

        {/* Puntuación General */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2">
            <CardHeader className="text-center px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl">Nivel General de Madurez</CardTitle>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 mt-4 space-y-2 sm:space-y-0">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600">{results.percentage}%</div>
                <div className={`text-lg sm:text-xl font-semibold capitalize ${getOverallLevelColor(results.overallLevel)}`}>
                  {results.overallLevel}
                </div>
              </div>
              <Progress value={results.percentage} className="mt-4" />
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                {results.totalScore} de {results.maxTotalScore} puntos
              </p>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Insights Principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">🎯 Diagnóstico Principal</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-2 sm:space-y-3">
                {results.mainInsights.map((insight, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm sm:text-base text-blue-900 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Análisis por Bloques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">📈 Análisis Detallado por Áreas</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {results.blockAnalysis.map((block, index) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                      <h4 className="font-semibold text-sm sm:text-base">{block.title}</h4>
                      <Badge className={`${getLevelColor(block.level)} text-xs sm:text-sm w-fit`}>
                        {block.level}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <Progress value={block.percentage} className="h-2" />
                      <p className="text-xs text-gray-600 mt-1">{block.percentage}%</p>
                    </div>
                    {block.insights.map((insight, i) => (
                      <p key={i} className="text-xs sm:text-sm text-gray-700 mb-1 leading-relaxed">{insight}</p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Acciones Prioritarias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">🚀 Acciones Prioritarias</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Las 3 acciones más importantes que debes tomar ahora
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {results.priorityActions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-green-900 text-sm sm:text-base leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline y Inversión */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-base sm:text-lg flex items-center">
                ⏰ Timeline Recomendado
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{results.timeframe}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-base sm:text-lg flex items-center">
                💰 Guía de Inversión
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{results.investmentGuidance}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Botón para hacer nuevo test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={resetForm}
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            🔄 Hacer Nuevo Test
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          🧠 Checklist de Madurez en IA
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 px-2">Evaluación integral basada en metodología Big 4 consultancy</p>
        <div className="max-w-md mx-auto px-2">
          <Progress value={getCompletionPercentage()} className="mb-2 h-2 sm:h-3" />
          <p className="text-xs sm:text-sm text-gray-600">{getCompletionPercentage()}% completado • {Object.keys(responses).length} de {blocks.reduce((sum, block) => sum + block.questions.length, 0)} preguntas</p>
        </div>
      </motion.div>

      {/* Información de la empresa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="pb-4 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              🏢 Información de tu organización
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Esta información nos ayuda a personalizar las recomendaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium">¿Cuántos empleados tiene tu organización?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-3">
                {[
                  { value: '1', label: 'Solo yo (1)' },
                  { value: '2-5', label: '2-5 empleados' },
                  { value: '6-15', label: '6-15 empleados' },
                  { value: '16-50', label: '16-50 empleados' },
                  { value: '51-200', label: '51-200 empleados' },
                  { value: '200+', label: 'Más de 200' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCompanyInfo({ employeeCount: option.value as CompanySize })}
                    className={`p-3 sm:p-4 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                      companyInfo.employeeCount === option.value
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Todas las preguntas en una sola página */}
      <div className="space-y-6 sm:space-y-8">
        {blocks.map((block, blockIndex) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: blockIndex * 0.1 }}
          >
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">{block.icon}</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {block.title}
                  </span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600">
                  {block.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8 pt-4 sm:pt-6 px-4 sm:px-6">
                {block.questions.map((question, questionIndex) => (
                  <div key={question.id} className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-1">
                        {questionIndex + 1}
                      </div>
                      <div className="flex-1">
                        <Label className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed block mb-3 sm:mb-4">
                          {question.text}
                        </Label>
                        <div className="flex justify-center space-x-3 sm:space-x-6 py-3 sm:py-4">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleResponseChange(question.id, value.toString())}
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-200 hover:scale-110 ${
                                responses[question.id] === value
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110'
                                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 px-1 sm:px-2">
                          <span className="text-left max-w-[45%]">Muy bajo / No implementado</span>
                          <span className="text-right max-w-[45%]">Muy alto / Completamente implementado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Botón de envío al final de las preguntas */}
      <div className="mt-8 sm:mt-12">
        <div className="max-w-lg mx-auto">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
            <CardContent className="text-center space-y-3 sm:space-y-4 py-4 sm:py-6 px-4 sm:px-6">
              <h3 className="text-lg sm:text-xl font-bold">¿Listo para tu diagnóstico personalizado?</h3>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit()}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base sm:text-lg py-4 sm:py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  🧠 Obtener Mi Diagnóstico IA
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}