import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// SISTEMA UNIFICADO DE MADUREZ EN IA V2.0 - SIMPLIFICADO
// ============================================

export interface Question {
  id: string
  text: string
  weight: number
}

export interface Block {
  id: string
  title: string
  icon: string
  description: string
  maxPoints: number
  questions: Question[]
}

export interface ChecklistData {
  maxTotalPoints: number
  blocks: Block[]
}

export interface Responses {
  [questionId: string]: number
}

export type CompanySize = '1' | '2-5' | '6-15' | '16-50' | '51-200' | '200+'

export interface CompanyInfo {
  employeeCount: CompanySize
}

export interface BlockAnalysis {
  id: string
  title: string
  score: number
  maxScore: number
  percentage: number
  level: 'critico' | 'basico' | 'intermedio' | 'avanzado'
  insights: string[]
  recommendations: string[]
}

export interface IntelligentDiagnosisResult {
  totalScore: number
  maxTotalScore: number
  percentage: number
  overallLevel: 'inicial' | 'basico' | 'intermedio' | 'avanzado'
  blockAnalysis: BlockAnalysis[]
  mainInsights: string[]
  priorityActions: string[]
  timeframe: string
  investmentGuidance: string
  organizationContext: string
}

// ============================================
// NUEVAS PREGUNTAS OPTIMIZADAS PARA PUNTUACIÓN 1-5
// ============================================

export const checklistData: ChecklistData = {
  maxTotalPoints: 500,
  blocks: [
    {
      id: 'procesos',
      title: 'Procesos y Organización',
      icon: '⚙️',
      description: 'Evaluamos la madurez de tus procesos organizacionales y su preparación para la digitalización',
      maxPoints: 100,
      questions: [
        {
          id: 'proc1',
          text: 'Los procesos de negocio de la empresa están definidos y documentados.',
          weight: 25
        },
        {
          id: 'proc2',
          text: 'Los procesos se siguen de forma consistente en toda la organización.',
          weight: 25
        },
        {
          id: 'proc3',
          text: 'Existen indicadores (KPIs) que miden la eficiencia de los procesos.',
          weight: 25
        },
        {
          id: 'proc4',
          text: 'Hemos identificado tareas repetitivas o de bajo valor que podrían ser automatizadas.',
          weight: 25
        }
      ]
    },
    {
      id: 'datos',
      title: 'Datos y Conectividad',
      icon: '📊',
      description: 'Analizamos la calidad, accesibilidad y gestión de tus datos empresariales',
      maxPoints: 100,
      questions: [
        {
          id: 'dat1',
          text: 'Los datos de la empresa están centralizados y accesibles.',
          weight: 33.33
        },
        {
          id: 'dat2',
          text: 'La calidad de los datos es alta (sin duplicados, errores o incompletos).',
          weight: 33.33
        },
        {
          id: 'dat3',
          text: 'Los sistemas principales (ERP, CRM, email, etc.) están integrados entre sí.',
          weight: 33.34
        }
      ]
    },
    {
      id: 'cultura',
      title: 'Personas y Cultura',
      icon: '👥',
      description: 'Evaluamos la preparación cultural y las competencias del equipo para adoptar IA',
      maxPoints: 100,
      questions: [
        {
          id: 'cul1',
          text: 'Los empleados tienen un nivel suficiente de competencias digitales.',
          weight: 33.33
        },
        {
          id: 'cul2',
          text: 'Existe una cultura abierta al cambio y a la innovación tecnológica.',
          weight: 33.33
        },
        {
          id: 'cul3',
          text: 'La empresa cuenta con un responsable o equipo que lidere la digitalización.',
          weight: 33.34
        }
      ]
    },
    {
      id: 'tecnologia',
      title: 'Tecnología y Herramientas',
      icon: '💻',
      description: 'Analizamos tu infraestructura tecnológica y preparación técnica',
      maxPoints: 100,
      questions: [
        {
          id: 'tec1',
          text: 'La empresa utiliza herramientas digitales de gestión (ERP, CRM, herramientas colaborativas).',
          weight: 33.33
        },
        {
          id: 'tec2',
          text: 'Los sistemas tecnológicos son modernos, escalables o en la nube.',
          weight: 33.33
        },
        {
          id: 'tec3',
          text: 'Ya se han implementado automatizaciones o pilotos de IA en algún proceso.',
          weight: 33.34
        }
      ]
    },
    {
      id: 'estrategia',
      title: 'Estrategia y Visión',
      icon: '🎯',
      description: 'Analizamos tu planificación estratégica y visión sobre IA y automatización',
      maxPoints: 100,
      questions: [
        {
          id: 'est1',
          text: 'La empresa tiene una estrategia digital definida alineada con el negocio.',
          weight: 50
        },
        {
          id: 'est2',
          text: 'Existe un compromiso claro de la dirección para invertir en digitalización e IA.',
          weight: 50
        }
      ]
    }
  ]
}

// Export de los bloques para uso directo en los componentes
export const blocks = checklistData.blocks

// ============================================
// FUNCIONES DE DIAGNÓSTICO INTELIGENTE
// ============================================

export function calculateIntelligentDiagnosis(responses: Responses, companyInfo: CompanyInfo): IntelligentDiagnosisResult {
  const blockAnalysis = analyzeBlocks(responses, companyInfo)
  const totalScore = blockAnalysis.reduce((sum, block) => sum + block.score, 0)
  const maxTotalScore = checklistData.maxTotalPoints
  const percentage = Math.round((totalScore / maxTotalScore) * 100)
  
  const overallLevel = determineOverallLevel(percentage)
  const mainInsights = generateMainInsights(blockAnalysis, companyInfo, responses)
  const priorityActions = generatePriorityActions(blockAnalysis, companyInfo, responses)
  const timeframe = determineTimeframe(percentage, companyInfo, responses)
  const investmentGuidance = determineInvestmentGuidance(percentage, companyInfo, responses)
  const organizationContext = generateOrganizationContext(companyInfo)

  return {
    totalScore,
    maxTotalScore,
    percentage,
    overallLevel,
    blockAnalysis,
    mainInsights,
    priorityActions,
    timeframe,
    investmentGuidance,
    organizationContext
  }
}

function analyzeBlocks(responses: Responses, companyInfo: CompanyInfo): BlockAnalysis[] {
  return checklistData.blocks.map(block => {
    let blockScore = 0
    let blockMaxScore = 0

    block.questions.forEach(question => {
      const response = responses[question.id] || 1
      const questionScore = response * (question.weight / 5) // Normalizar a peso de la pregunta
      blockScore += questionScore
      blockMaxScore += question.weight
    })

    const percentage = Math.round((blockScore / blockMaxScore) * 100)
    const level = determineBlockLevel(percentage)
    const insights = generateBlockInsights(block.id, percentage, level, companyInfo)
    const recommendations = generateBlockRecommendations(block.id, level, companyInfo)

    return {
      id: block.id,
      title: block.title,
      score: Math.round(blockScore),
      maxScore: blockMaxScore,
      percentage,
      level,
      insights,
      recommendations
    }
  })
}

function determineBlockLevel(percentage: number): 'critico' | 'basico' | 'intermedio' | 'avanzado' {
  if (percentage >= 80) return 'avanzado'
  if (percentage >= 60) return 'intermedio'
  if (percentage >= 40) return 'basico'
  return 'critico'
}

function determineOverallLevel(percentage: number): 'inicial' | 'basico' | 'intermedio' | 'avanzado' {
  if (percentage >= 75) return 'avanzado'
  if (percentage >= 55) return 'intermedio'
  if (percentage >= 35) return 'basico'
  return 'inicial'
}

function generateOrganizationContext(companyInfo: CompanyInfo): string {
  const sizeContexts = {
    '1': 'Emprendedor individual o freelancer',
    '2-5': 'Microempresa o startup temprana',
    '6-15': 'Pequeña empresa en crecimiento',
    '16-50': 'Empresa mediana establecida',
    '51-200': 'Empresa mediana-grande con estructura organizacional',
    '200+': 'Gran empresa con operaciones complejas'
  }
  
  return sizeContexts[companyInfo.employeeCount]
}

function generateMainInsights(blockAnalysis: BlockAnalysis[], companyInfo: CompanyInfo, responses: Responses): string[] {
  const insights: string[] = []
  const weakestBlocks = blockAnalysis
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 2)
  
  const strongestBlock = blockAnalysis
    .sort((a, b) => b.percentage - a.percentage)[0]
  
  const averageMaturity = blockAnalysis.reduce((sum, block) => sum + block.percentage, 0) / blockAnalysis.length

  // Insight según el tamaño de empresa
  const sizeInsights = {
    '1': 'Como emprendedor individual, tu enfoque debe ser maximizar la eficiencia personal y automatizar tareas administrativas.',
    '2-5': 'En esta fase de microempresa, es crucial establecer procesos escalables y una base tecnológica sólida.',
    '6-15': 'Tu empresa está en el momento ideal para implementar sistemas integrados y formar al equipo en competencias digitales.',
    '16-50': 'Con esta estructura, puedes abordar iniciativas de IA más ambiciosas y crear un centro de excelencia digital.',
    '51-200': 'Tu organización tiene el tamaño perfecto para liderar la transformación digital en tu sector.',
    '200+': 'Como gran empresa, tienes la oportunidad de ser pionero en IA avanzada y establecer estándares industriales.'
  }
  
  insights.push(sizeInsights[companyInfo.employeeCount])

  // Insights personalizados basados en patrones específicos de respuesta
  const personalizedInsights = generatePersonalizedInsights(responses, companyInfo, blockAnalysis)
  insights.push(...personalizedInsights)

  // Insight sobre automatizaciones inmediatas (NUEVA LÓGICA)
  if (averageMaturity < 70) {
    insights.push('Aunque tu madurez en IA sea temprana, puedes obtener beneficios inmediatos con automatizaciones simples: chatbots para atención al cliente, emails automáticos, o flujos de WhatsApp Business.')
  }

  // Insight sobre fortaleza con contexto específico
  if (strongestBlock.percentage >= 70) {
    const strengthContext = getStrengthContext(strongestBlock.id, responses)
    insights.push(`Tu mayor fortaleza está en ${strongestBlock.title.toLowerCase()}: ${strengthContext}`)
  }

  // Insights sobre debilidades críticas con análisis específico
  weakestBlocks.forEach(block => {
    if (block.percentage < 50) {
      const weaknessContext = getWeaknessContext(block.id, responses, companyInfo)
      insights.push(`${block.title}: ${weaknessContext}`)
    }
  })

  return insights
}

function generatePriorityActions(blockAnalysis: BlockAnalysis[], companyInfo: CompanyInfo, responses: Responses): string[] {
  const actions: string[] = []
  const averageMaturity = blockAnalysis.reduce((sum, block) => sum + block.percentage, 0) / blockAnalysis.length

  // Análisis granular de respuestas para acciones específicas
  const specificActions = generateSpecificActions(responses, companyInfo, blockAnalysis)
  
  // SIEMPRE incluir automatizaciones inmediatas como primera acción si madurez < 85%
  if (averageMaturity < 85) {
    const automationActions = {
      '1': 'Implementar un chatbot básico para tu web o WhatsApp (ej: Tidio, ManyChat) para responder FAQs y captar leads automáticamente',
      '2-5': 'Automatizar el flujo de nuevos clientes: chatbot de calificación → email automático → programación de citas',
      '6-15': 'Crear 3 automatizaciones clave: chatbot para soporte, email marketing por segmentos, y recordatorios automáticos de servicios',
      '16-50': 'Implementar un ecosistema de automatización: chatbot multicanal, CRM automático, y flujos de nurturing personalizados',
      '51-200': 'Desarrollar automatizaciones avanzadas: chatbots inteligentes con IA, scoring automático de leads, y workflows complejos',
      '200+': 'Crear un centro de automatización: bots conversacionales avanzados, personalización automática masiva, y AI-driven customer journeys'
    }
    
    actions.push(automationActions[companyInfo.employeeCount])
  }

  // Agregar acciones específicas basadas en respuestas individuales
  actions.push(...specificActions.slice(0, 2))

  // Acciones para empresas maduras (85%+)
  if (averageMaturity >= 85) {
    const advancedActions = [
      'Implementar IA predictiva para forecasting de ventas y detección de churn de clientes',
      'Desarrollar modelos de machine learning para personalización avanzada de contenido y ofertas',
      'Crear un sistema de BI con dashboards automáticos y alertas inteligentes'
    ]
    actions.push(...advancedActions.slice(0, 1))
  }

  // Asegurar que siempre hay exactamente 3 acciones
  while (actions.length < 3) {
    const fallbackActions = [
      'Automatizar el seguimiento de leads: secuencia de 5 emails automáticos con contenido de valor personalizado',
      'Crear un sistema de calificación automática de prospectos usando formularios inteligentes y scoring',
      'Implementar automatización de redes sociales: programación de posts, respuestas automáticas y generación de leads',
      'Desarrollar un sistema de reportes automáticos que consolide métricas clave semanalmente',
      'Implementar un workflow de onboarding automatizado para nuevos clientes o empleados'
    ]
    
    const randomIndex = Math.floor(Math.random() * fallbackActions.length)
    actions.push(fallbackActions[randomIndex])
  }

  return actions.slice(0, 3)
}

function determineTimeframe(percentage: number, companyInfo: CompanyInfo, responses: Responses): string {
  const employeeCount = parseInt(companyInfo.employeeCount.split('-')[0]) || 1
  
  if (percentage >= 70) {
    return employeeCount <= 5 
      ? 'Puedes empezar CON AUTOMATIZACIONES BÁSICAS en 1-2 semanas, e implementar IA avanzada en 3-6 meses.'
      : 'Inicia automatizaciones simples YA (1 mes), lanza IA piloto en 6-9 meses, escala en 12-18 meses.'
  } else if (percentage >= 50) {
    return employeeCount <= 15
      ? 'Empieza con chatbots y automatizaciones básicas AHORA (2-4 semanas), construye capacidades de IA en 6-12 meses.'
      : 'Implementa automatizaciones inmediatas (1-2 meses), desarrolla capacidades de IA en 12-18 meses.'
  } else {
    return employeeCount <= 5
      ? 'ACCIÓN INMEDIATA: automatizaciones básicas (1 mes), transformación digital en 6-12 meses, IA avanzada en 12-18 meses.'
      : 'Plan dual: automatizaciones rápidas (2-3 meses) + transformación estructural (18-24 meses) en paralelo.'
  }
}

function determineInvestmentGuidance(percentage: number, companyInfo: CompanyInfo, responses: Responses): string {
  const automationBudgets = {
    '1': { immediate: '€50-200', advanced: '€500-2000' },
    '2-5': { immediate: '€200-500', advanced: '€2000-10000' },
    '6-15': { immediate: '€500-1500', advanced: '€10000-50000' },
    '16-50': { immediate: '€1000-3000', advanced: '€25000-100000' },
    '51-200': { immediate: '€2000-5000', advanced: '€50000-250000' },
    '200+': { immediate: '€5000-15000', advanced: '€100000-500000' }
  }
  
  const budget = automationBudgets[companyInfo.employeeCount]
  
  if (percentage >= 70) {
    return `EMPIEZA YA: Automatizaciones básicas ${budget.immediate}/mes (chatbots, emails). Inversión IA avanzada: ${budget.advanced}. ROI esperado: 200-500% en 6 meses.`
  } else if (percentage >= 50) {
    return `PLAN DUAL: Automatizaciones inmediatas ${budget.immediate}/mes + Preparación para IA ${budget.advanced}/año. ROI automatizaciones: 10-20 horas/semana recuperadas.`
  } else {
    return `ESTRATEGIA GRADUAL: Empieza con automatizaciones ${budget.immediate}/mes (ROI inmediato: 5-15 horas/semana). Construye capacidades para IA: ${budget.advanced} en 12-18 meses.`
  }
}

function generateBlockInsights(blockId: string, percentage: number, level: string, companyInfo: CompanyInfo): string[] {
  const insights: string[] = []
  
  const blockInsights: Record<string, Record<string, string[]>> = {
    'procesos': {
      'critico': ['Procesos desorganizados frenan cualquier iniciativa digital', 'Sin procesos claros, la IA puede amplificar problemas existentes'],
      'basico': ['Procesos básicos definidos, pero necesitan optimización', 'Falta medición sistemática de la eficiencia'],
      'intermedio': ['Buena base de procesos, listos para automatización selectiva', 'KPIs implementados facilitan la mejora continua'],
      'avanzado': ['Procesos maduros ideales para IA avanzada', 'Cultura de optimización continua establecida']
    },
    'datos': {
      'critico': ['Datos fragmentados impiden aprovecha IA efectivamente', 'Calidad de datos insuficiente para algoritmos confiables'],
      'basico': ['Datos parcialmente organizados pero con gaps importantes', 'Integración entre sistemas limitada'],
      'intermedio': ['Buena centralización de datos con calidad aceptable', 'Sistemas integrados permiten análisis cruzados'],
      'avanzado': ['Infraestructura de datos lista para IA avanzada', 'Calidad de datos excelente para machine learning']
    },
    'cultura': {
      'critico': ['Resistencia al cambio dificultará adopción de IA', 'Competencias digitales insuficientes en el equipo'],
      'basico': ['Apertura básica al cambio pero falta liderazgo digital', 'Algunas competencias digitales pero inconsistentes'],
      'intermedio': ['Cultura receptiva con liderazgo digital definido', 'Competencias digitales sólidas en roles clave'],
      'avanzado': ['Cultura innovadora ideal para adopción de IA', 'Equipo con competencias digitales avanzadas']
    },
    'tecnologia': {
      'critico': ['Infraestructura tecnológica insuficiente para IA', 'Dependencia de sistemas legacy problemática'],
      'basico': ['Herramientas básicas pero no integradas', 'Algunos sistemas modernos mezclados con legacy'],
      'intermedio': ['Buena infraestructura con capacidad de expansión', 'Sistemas modernos facilitan integración de IA'],
      'avanzado': ['Tecnología de vanguardia lista para IA compleja', 'Infraestructura escalable y moderna']
    },
    'estrategia': {
      'critico': ['Sin estrategia digital clara ni compromiso directivo', 'Falta visión sobre el potencial de la IA'],
      'basico': ['Estrategia digital básica pero sin foco en IA', 'Compromiso directivo limitado con la innovación'],
      'intermedio': ['Estrategia digital sólida con primeros pasos en IA', 'Buen compromiso directivo con la transformación'],
      'avanzado': ['Estrategia de IA bien definida y respaldada', 'Liderazgo visionario en transformación digital']
    }
  }
  
  return blockInsights[blockId]?.[level] || []
}

function generateSpecificActions(responses: Responses, companyInfo: CompanyInfo, blockAnalysis: BlockAnalysis[]): string[] {
  const specificActions: string[] = []
  
  // Análisis de respuestas específicas por pregunta
  const procesos = {
    proc1: responses['proc1'] || 1, // Procesos documentados
    proc2: responses['proc2'] || 1, // Consistencia
    proc3: responses['proc3'] || 1, // KPIs
    proc4: responses['proc4'] || 1  // Identificación de automatización
  }
  
  const datos = {
    dat1: responses['dat1'] || 1, // Centralización
    dat2: responses['dat2'] || 1, // Calidad
    dat3: responses['dat3'] || 1  // Integración
  }
  
  const cultura = {
    cul1: responses['cul1'] || 1, // Competencias digitales
    cul2: responses['cul2'] || 1, // Cultura de cambio
    cul3: responses['cul3'] || 1  // Liderazgo digital
  }
  
  const tecnologia = {
    tec1: responses['tec1'] || 1, // Herramientas digitales
    tec2: responses['tec2'] || 1, // Sistemas modernos
    tec3: responses['tec3'] || 1  // Automatizaciones existentes
  }
  
  const estrategia = {
    est1: responses['est1'] || 1, // Estrategia digital
    est2: responses['est2'] || 1  // Compromiso directivo
  }

  // Patrones específicos de necesidades
  
  // Patrón: Buenos procesos pero sin KPIs
  if (procesos.proc1 >= 4 && procesos.proc2 >= 4 && procesos.proc3 <= 2) {
    specificActions.push('Implementar un dashboard de KPIs automático que mida la eficiencia de tus procesos ya documentados')
  }
  
  // Patrón: Datos centralizados pero mala calidad
  if (datos.dat1 >= 4 && datos.dat2 <= 2) {
    specificActions.push('Ejecutar un proyecto de limpieza de datos: eliminar duplicados, estandarizar formatos y validar información')
  }
  
  // Patrón: Buena tecnología pero falta integración
  if (tecnologia.tec1 >= 4 && tecnologia.tec2 >= 4 && datos.dat3 <= 2) {
    specificActions.push('Integrar tus sistemas existentes usando APIs o herramientas como Zapier para crear flujos de datos automáticos')
  }
  
  // Patrón: Equipo competente pero sin liderazgo digital
  if (cultura.cul1 >= 4 && cultura.cul3 <= 2) {
    specificActions.push('Designar un Chief Digital Officer interno y crear un comité de transformación digital con reuniones semanales')
  }
  
  // Patrón: Estrategia clara pero sin compromiso directivo
  if (estrategia.est1 >= 4 && estrategia.est2 <= 2) {
    specificActions.push('Organizar una presentación ejecutiva mostrando ROI de casos de éxito de IA en tu sector para conseguir buy-in directivo')
  }
  
  // Patrón: Alta madurez en procesos y datos, baja en tecnología
  if ((procesos.proc1 + procesos.proc2 + procesos.proc3) / 3 >= 4 && (datos.dat1 + datos.dat2) / 2 >= 4 && (tecnologia.tec1 + tecnologia.tec2) / 2 <= 2) {
    specificActions.push('Migrar a la nube y modernizar tu stack tecnológico - tienes la base de procesos y datos perfecta para maximizar el ROI')
  }
  
  // Patrón: Buena cultura y estrategia, débil en operaciones
  if ((cultura.cul1 + cultura.cul2) / 2 >= 4 && estrategia.est1 >= 4 && (procesos.proc1 + procesos.proc2) / 2 <= 2) {
    specificActions.push('Aprovechar tu cultura innovadora para pilotar metodologías ágiles y documentar procesos sobre la marcha')
  }
  
  // Patrón: Identificaron automatizaciones pero no las han implementado
  if (procesos.proc4 >= 4 && tecnologia.tec3 <= 2) {
    specificActions.push('Priorizar las 3 automatizaciones más fáciles que ya identificaste - calcula horas ahorradas por semana y empieza por la de mayor impacto')
  }
  
  // Patrón: Sistemas modernos pero sin automatizaciones
  if (tecnologia.tec2 >= 4 && tecnologia.tec3 <= 2) {
    specificActions.push('Tu infraestructura moderna te permite implementar RPA básico - automatiza reportes, facturación y seguimientos como primer paso')
  }

  // Patrones avanzados para empresas grandes
  if (companyInfo.employeeCount === '200+') {
    if (cultura.cul1 >= 4 && cultura.cul2 >= 4 && estrategia.est2 >= 4) {
      specificActions.push('Crear un Centro de Excelencia en IA con budget dedicado y KPIs específicos - tienes la cultura y compromiso ideales')
    }
    
    if (datos.dat1 >= 4 && datos.dat2 >= 4 && tecnologia.tec1 >= 4) {
      specificActions.push('Implementar un Data Lake empresarial con analytics avanzado - tu infraestructura de datos está lista para Big Data e IA')
    }
  }

  return specificActions
}

function generatePersonalizedInsights(responses: Responses, companyInfo: CompanyInfo, blockAnalysis: BlockAnalysis[]): string[] {
  const insights: string[] = []
  
  // Análisis de patrones complejos de respuesta
  const procesos = [responses['proc1'] || 1, responses['proc2'] || 1, responses['proc3'] || 1, responses['proc4'] || 1]
  const datos = [responses['dat1'] || 1, responses['dat2'] || 1, responses['dat3'] || 1]
  const cultura = [responses['cul1'] || 1, responses['cul2'] || 1, responses['cul3'] || 1]
  const tecnologia = [responses['tec1'] || 1, responses['tec2'] || 1, responses['tec3'] || 1]
  const estrategia = [responses['est1'] || 1, responses['est2'] || 1]

  // Patrón "Perfil Visionario": Alta estrategia y cultura, baja implementación
  if (estrategia[0] >= 4 && cultura[1] >= 4 && tecnologia.reduce((a,b) => a+b) / 3 <= 2.5) {
    insights.push('Eres un "Visionario Digital": tienes la visión y cultura, pero necesitas acelerar la implementación tecnológica para materializar tus ideas.')
  }

  // Patrón "Perfil Técnico": Alta tecnología pero baja estrategia
  if (tecnologia.reduce((a,b) => a+b) / 3 >= 4 && estrategia.reduce((a,b) => a+b) / 2 <= 2.5) {
    insights.push('Eres un "Implementador Técnico": dominas la tecnología pero necesitas una estrategia más clara para maximizar el impacto del negocio.')
  }

  // Patrón "Perfil Operativo": Buenos procesos y datos, débil en cultura
  if (procesos.reduce((a,b) => a+b) / 4 >= 3.5 && datos.reduce((a,b) => a+b) / 3 >= 3.5 && cultura.reduce((a,b) => a+b) / 3 <= 2.5) {
    insights.push('Eres una "Máquina Operativa": excelente en procesos y datos, pero necesitas trabajar la cultura de cambio para impulsar la innovación.')
  }

  // Patrón específico por tamaño de empresa
  if (companyInfo.employeeCount === '1') {
    if (responses['proc4'] >= 4 && responses['tec3'] <= 2) {
      insights.push('Como freelancer que ya identificaste automatizaciones, estás a 2-3 semanas de recuperar 10-15 horas semanales con las herramientas adecuadas.')
    }
  }

  if (['2-5', '6-15'].includes(companyInfo.employeeCount)) {
    if (responses['cul2'] >= 4 && responses['cul3'] <= 2) {
      insights.push('Tu equipo está abierto al cambio pero falta liderazgo digital - designar un "champion" interno multiplicará la adopción por 3.')
    }
  }

  if (['16-50', '51-200'].includes(companyInfo.employeeCount)) {
    if (responses['dat1'] >= 4 && responses['dat2'] >= 4 && responses['tec1'] <= 2) {
      insights.push('Tienes una base de datos sólida pero herramientas obsoletas - una modernización tecnológica te daría ventaja competitiva inmediata.')
    }
  }

  // Patrón de "Quick Wins" basado en respuestas específicas
  if (responses['proc1'] >= 4 && responses['proc3'] <= 2 && responses['tec1'] >= 3) {
    insights.push('QUICK WIN identificado: tus procesos están documentados y tienes herramientas - implementar KPIs automáticos te dará resultados en 2-4 semanas.')
  }

  return insights.slice(0, 2) // Máximo 2 insights personalizados para no saturar
}

function getStrengthContext(blockId: string, responses: Responses): string {
  const contexts: Record<string, string> = {
    'procesos': responses['proc3'] >= 4 
      ? 'tienes KPIs implementados que te permiten optimizar continuamente'
      : 'tus procesos están bien estructurados, ideal para automatización',
    'datos': responses['dat2'] >= 4 
      ? 'la calidad de tus datos es excelente, perfecta para algoritmos de IA'
      : 'tienes buena centralización, el siguiente paso es mejorar la calidad',
    'cultura': responses['cul3'] >= 4 
      ? 'cuentas con liderazgo digital, lo más difícil de conseguir'
      : 'tu equipo tiene competencias digitales sólidas',
    'tecnologia': responses['tec3'] >= 4 
      ? 'ya tienes experiencia con automatizaciones, puedes escalar rápido'
      : 'tu infraestructura moderna facilita implementar nuevas soluciones',
    'estrategia': responses['est2'] >= 4 
      ? 'el compromiso directivo garantiza los recursos necesarios'
      : 'tienes una hoja de ruta clara para la transformación digital'
  }
  
  return contexts[blockId] || 'tienes una base sólida para expandir a otras áreas'
}

function getWeaknessContext(blockId: string, responses: Responses, companyInfo: CompanyInfo): string {
  const contexts: Record<string, string> = {
    'procesos': responses['proc1'] <= 2 
      ? 'sin procesos documentados, la IA puede amplificar problemas existentes'
      : 'necesitas medir la eficiencia antes de automatizar',
    'datos': responses['dat2'] <= 2 
      ? 'la calidad de datos es crítica - ningún algoritmo funciona con datos incorrectos'
      : 'datos fragmentados limitan el potencial de análisis avanzado',
    'cultura': responses['cul3'] <= 2 
      ? 'sin liderazgo digital, los proyectos de transformación fracasan en el 70% de los casos'
      : 'necesitas formar al equipo antes de introducir nuevas tecnologías',
    'tecnologia': responses['tec2'] <= 2 
      ? 'sistemas legacy requieren modernización antes de implementar IA'
      : 'falta integración entre herramientas, creando silos de información',
    'estrategia': responses['est2'] <= 2 
      ? 'sin compromiso directivo, es difícil conseguir presupuesto y recursos'
      : 'necesitas definir objetivos específicos y medibles para la digitalización'
  }
  
  return contexts[blockId] || 'requiere atención urgente para el éxito de la transformación digital'
}

function generateBlockRecommendations(blockId: string, level: string, companyInfo: CompanyInfo): string[] {
  // Esta función puede expandirse con recomendaciones específicas por bloque y nivel
  return []
}