import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// SISTEMA UNIFICADO DE MADUREZ EN IA V2.0
// ============================================

export interface Question {
  id: string
  text: string
  explanation: string
  weight: number
}

export interface Block {
  id: string
  title: string
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
  companySize: CompanySize
  organizationContext: string
}

// ============================================
// DATOS DEL CHECKLIST UNIFICADO
// ============================================

export const checklistData: ChecklistData = {
  maxTotalPoints: 600, // 6 bloques x 100 puntos cada uno (24 preguntas x 5 puntos máximo x 5)
  blocks: [
    {
      id: 'procesos',
      title: '1. Procesos y Organización',
      description: 'Evaluamos cómo tienes organizados y optimizados tus procesos de negocio',
      maxPoints: 100,
      questions: [
        {
          id: 'proc1',
          text: '¿Tienen definidos y documentados sus procesos de negocio clave?',
          explanation: 'Evalúa el nivel de documentación de tus procesos más importantes',
          weight: 20
        },
        {
          id: 'proc2',
          text: '¿Con qué frecuencia revisan y optimizan sus procesos actuales?',
          explanation: '0 = Nunca/raramente, 1 = Anualmente, 2 = Trimestralmente o más frecuente',
          weight: 20
        },
        {
          id: 'proc3',
          text: '¿Existen métricas o indicadores (KPIs) que midan la eficiencia de sus procesos?',
          explanation: '0 = No medimos, 1 = Algunas métricas básicas, 2 = KPIs completos y seguimiento regular',
          weight: 20
        },
        {
          id: 'proc4',
          text: '¿Identifican claramente cuáles son las tareas repetitivas o de poco valor añadido?',
          explanation: '0 = No lo analizamos, 1 = Tenemos idea general, 2 = Mapeo detallado de tareas',
          weight: 20
        },
        {
          id: 'proc5',
          text: '¿Disponen de un mapa de procesos digitalizado (workflow, BPM, etc.)?',
          explanation: '0 = No existe, 1 = Mapas básicos en documentos, 2 = Sistema digital de gestión de procesos',
          weight: 20
        }
      ]
    },
    {
      id: 'datos',
      title: '2. Datos y Conectividad',
      description: 'Analizamos cómo gestionas, almacenas y conectas tus datos empresariales',
      maxPoints: 100,
      questions: [
        {
          id: 'dat1',
          text: '¿Dónde se almacenan actualmente sus datos (Excel, ERP, CRM, otros sistemas)?',
          explanation: '0 = Principalmente Excel/archivos, 1 = Sistemas mixtos, 2 = Sistemas integrados (ERP/CRM)',
          weight: 20
        },
        {
          id: 'dat2',
          text: '¿Los datos están centralizados o dispersos en diferentes plataformas?',
          explanation: '0 = Muy dispersos, 1 = Parcialmente centralizados, 2 = Centralizados en pocos sistemas',
          weight: 20
        },
        {
          id: 'dat3',
          text: '¿Qué grado de calidad y fiabilidad tienen sus datos?',
          explanation: '0 = Muchos errores/duplicados, 1 = Calidad aceptable, 2 = Datos limpios y confiables',
          weight: 20
        },
        {
          id: 'dat4',
          text: '¿Existen integraciones entre sus herramientas principales (ERP, CRM, email, etc.)?',
          explanation: '0 = Sin integraciones, 1 = Algunas integraciones manuales, 2 = Integraciones automáticas',
          weight: 20
        },
        {
          id: 'dat5',
          text: '¿Tienen políticas de gobierno del dato (accesos, seguridad, actualizaciones)?',
          explanation: '0 = Sin políticas, 1 = Normas básicas, 2 = Políticas formales y aplicadas',
          weight: 20
        }
      ]
    },
    {
      id: 'cultura',
      title: '3. Cultura y Personas',
      description: 'Evaluamos la preparación del equipo humano para la transformación digital e IA',
      maxPoints: 100,
      questions: [
        {
          id: 'cul1',
          text: '¿Qué nivel de formación digital tienen los empleados de la empresa?',
          explanation: '0 = Nivel básico, 1 = Nivel intermedio, 2 = Nivel avanzado/experto',
          weight: 20
        },
        {
          id: 'cul2',
          text: '¿Existe apertura cultural al cambio tecnológico o hay resistencia interna?',
          explanation: '0 = Resistencia alta, 1 = Aceptación moderada, 2 = Entusiasmo por la innovación',
          weight: 20
        },
        {
          id: 'cul3',
          text: '¿Tienen algún responsable o equipo que lidere la digitalización?',
          explanation: '0 = Sin responsable, 1 = Responsable parcial, 2 = Equipo/responsable dedicado',
          weight: 20
        },
        {
          id: 'cul4',
          text: '¿Se incentiva la mejora continua y la innovación entre los empleados?',
          explanation: '0 = Sin incentivos, 1 = Incentivos ocasionales, 2 = Cultura de mejora continua',
          weight: 20
        },
        {
          id: 'cul5',
          text: '¿Los equipos están acostumbrados a trabajar con herramientas digitales colaborativas?',
          explanation: '0 = Herramientas básicas, 1 = Algunas herramientas colaborativas, 2 = Ecosistema digital completo',
          weight: 20
        }
      ]
    },
    {
      id: 'tecnologia',
      title: '4. Tecnología y Herramientas',
      description: 'Revisamos tu infraestructura tecnológica actual y capacidades de automatización',
      maxPoints: 100,
      questions: [
        {
          id: 'tec1',
          text: '¿Qué nivel de digitalización actual tiene la empresa (uso de ERP, CRM, plataformas de gestión)?',
          explanation: '0 = Herramientas básicas, 1 = Algunas plataformas específicas, 2 = Ecosistema digital completo',
          weight: 20
        },
        {
          id: 'tec2',
          text: '¿Qué porcentaje de sus procesos clave está digitalizado hoy?',
          explanation: '0 = Menos del 30%, 1 = 30-70%, 2 = Más del 70%',
          weight: 20
        },
        {
          id: 'tec3',
          text: '¿Han utilizado ya herramientas de automatización (RPA, Zapier, Make, Power Automate)?',
          explanation: '0 = Sin experiencia, 1 = Pruebas básicas, 2 = Uso regular de automatizaciones',
          weight: 20
        },
        {
          id: 'tec4',
          text: '¿Cuentan con sistemas en la nube o todo se gestiona en local?',
          explanation: '0 = Solo local, 1 = Híbrido (local + nube), 2 = Principalmente en la nube',
          weight: 20
        },
        {
          id: 'tec5',
          text: '¿Se dispone de soporte técnico interno o externo para mantener las herramientas digitales?',
          explanation: '0 = Sin soporte especializado, 1 = Soporte básico, 2 = Soporte estratégico IT',
          weight: 20
        }
      ]
    },
    {
      id: 'estrategia',
      title: '5. Estrategia y Visión',
      description: 'Analizamos tu planificación estratégica y visión sobre IA y automatización',
      maxPoints: 100,
      questions: [
        {
          id: 'est1',
          text: '¿Tienen una estrategia digital definida en la empresa?',
          explanation: '0 = Sin estrategia, 1 = Estrategia básica, 2 = Estrategia digital formal y documentada',
          weight: 20
        },
        {
          id: 'est2',
          text: '¿Se incluye la digitalización y la IA en la planificación estratégica de la dirección?',
          explanation: '0 = No se considera, 1 = Se menciona ocasionalmente, 2 = Parte integral de la estrategia',
          weight: 20
        },
        {
          id: 'est3',
          text: '¿Qué esperan conseguir con la IA y las automatizaciones?',
          explanation: '0 = Objetivos vagos, 1 = Algunos objetivos claros, 2 = Objetivos específicos y medibles',
          weight: 20
        },
        {
          id: 'est4',
          text: '¿Están dispuestos a invertir recursos económicos y humanos en proyectos de IA?',
          explanation: '0 = Reticentes a invertir, 1 = Inversión condicionada, 2 = Compromiso claro de inversión',
          weight: 20
        },
        {
          id: 'est5',
          text: '¿Han hecho pilotos de innovación o proyectos de prueba en los últimos 2 años?',
          explanation: '0 = Sin pilotos, 1 = Algunas pruebas, 2 = Varios pilotos exitosos',
          weight: 20
        }
      ]
    },
    {
      id: 'seguridad',
      title: '6. Seguridad y Cumplimiento',
      description: 'Evaluamos tus medidas de seguridad y preparación para el cumplimiento normativo en IA',
      maxPoints: 100,
      questions: [
        {
          id: 'seg1',
          text: '¿Qué medidas de seguridad tienen implementadas actualmente?',
          explanation: '0 = Medidas básicas, 1 = Seguridad intermedia, 2 = Seguridad robusta y completa',
          weight: 20
        },
        {
          id: 'seg2',
          text: '¿Existen políticas de privacidad y cumplimiento normativo (ej. GDPR)?',
          explanation: '0 = Sin políticas formales, 1 = Políticas básicas, 2 = Cumplimiento completo y documentado',
          weight: 20
        },
        {
          id: 'seg3',
          text: '¿Hay procedimientos para gestionar incidencias de ciberseguridad?',
          explanation: '0 = Sin procedimientos, 1 = Procedimientos básicos, 2 = Plan de respuesta completo',
          weight: 20
        },
        {
          id: 'seg4',
          text: '¿Se realizan formaciones periódicas en seguridad digital para empleados?',
          explanation: '0 = Sin formación, 1 = Formación ocasional, 2 = Formación regular y actualizada',
          weight: 20
        }
      ]
    }
  ]
}

// ============================================
// SISTEMA DE DIAGNÓSTICO INTELIGENTE
// ============================================

export function calculateIntelligentDiagnosis(responses: Responses, companyInfo: CompanyInfo): IntelligentDiagnosisResult {
  const blockAnalysis = analyzeBlocks(responses, companyInfo)
  const totalScore = blockAnalysis.reduce((sum, block) => sum + block.score, 0)
  const maxTotalScore = checklistData.maxTotalPoints
  const percentage = Math.round((totalScore / maxTotalScore) * 100)
  
  const overallLevel = determineOverallLevel(percentage)
  const mainInsights = generateMainInsights(blockAnalysis, percentage, companyInfo)
  const priorityActions = generatePriorityActions(blockAnalysis, companyInfo)
  const timeframe = determineTimeframe(blockAnalysis, percentage, companyInfo)
  const investmentGuidance = determineInvestmentGuidance(blockAnalysis, percentage, companyInfo)
  const organizationContext = getOrganizationContext(companyInfo.employeeCount)

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
    companySize: companyInfo.employeeCount,
    organizationContext
  }
}

function analyzeBlocks(responses: Responses, companyInfo: CompanyInfo): BlockAnalysis[] {
  return checklistData.blocks.map(block => {
    let blockScore = 0
    let blockMaxScore = 0
    
    block.questions.forEach(question => {
      const response = responses[question.id] || 1
      const points = response * (question.weight / 5) // Escala 1-5: 1=4pts, 2=8pts, 3=12pts, 4=16pts, 5=20pts
      blockScore += points
      blockMaxScore += question.weight
    })
    
    const percentage = blockMaxScore > 0 ? (blockScore / blockMaxScore) * 100 : 0
    const level = determineBlockLevel(percentage)
    const insights = generateBlockInsights(block.id, percentage, blockScore, blockMaxScore, companyInfo)
    const recommendations = generateBlockRecommendations(block.id, level, percentage, companyInfo)
    
    return {
      id: block.id,
      title: block.title,
      score: blockScore,
      maxScore: blockMaxScore,
      percentage,
      level,
      insights,
      recommendations
    }
  })
}

function determineBlockLevel(percentage: number): 'critico' | 'basico' | 'intermedio' | 'avanzado' {
  if (percentage < 30) return 'critico'
  if (percentage < 60) return 'basico'
  if (percentage < 80) return 'intermedio'
  return 'avanzado'
}

function determineOverallLevel(percentage: number): 'inicial' | 'basico' | 'intermedio' | 'avanzado' {
  if (percentage < 35) return 'inicial'
  if (percentage < 60) return 'basico'
  if (percentage < 80) return 'intermedio'
  return 'avanzado'
}

function getOrganizationContext(employeeCount: CompanySize): string {
  switch (employeeCount) {
    case '1':
      return 'Autónomo/Freelancer - Decisiones ágiles, recursos limitados, enfoque personal'
    case '2-5':
      return 'Startup/Equipo pequeño - Flexibilidad máxima, roles múltiples, crecimiento rápido'
    case '6-15':
      return 'Micropyme - Estructura simple, procesos básicos, especialización inicial'
    case '16-50':
      return 'Pequeña empresa - Departamentos definidos, procesos formalizados, jerarquía clara'
    case '51-200':
      return 'Mediana empresa - Estructura compleja, sistemas integrados, governance formal'
    case '200+':
      return 'Gran empresa - Organización matricial, procesos avanzados, compliance estricto'
    default:
      return 'Organización empresarial'
  }
}

function generateBlockInsights(blockId: string, percentage: number, score: number, maxScore: number, companyInfo: CompanyInfo): string[] {
  const insights: string[] = []
  
  switch (blockId) {
    case 'procesos':
      const isSmall = ['1', '2-5', '6-15'].includes(companyInfo.employeeCount)
      if (percentage < 50) {
        if (isSmall) {
          insights.push('Como organización pequeña, enfócate en documentar 2-3 procesos críticos antes que sistemas complejos')
        } else {
          insights.push('Tu empresa necesita procesos más estructurados y documentados antes de implementar IA')
        }
      } else if (percentage < 80) {
        if (isSmall) {
          insights.push('Base sólida para tu tamaño. Puedes empezar automatizaciones simples mientras creces')
        } else {
          insights.push('Tienes una base sólida de procesos, pero puedes optimizarlos más para IA empresarial')
        }
      } else {
        insights.push('Excelente gestión de procesos, ideal para implementaciones de IA exitosas')
      }
      break
      
    case 'datos':
      if (percentage < 50) {
        insights.push('La calidad y centralización de datos es crítica para el éxito de proyectos de IA')
      } else if (percentage < 80) {
        insights.push('Tus datos están en buen camino, necesitas mejorar integración y calidad')
      } else {
        insights.push('Excelente infraestructura de datos, perfecta para alimentar algoritmos de IA')
      }
      break
      
    case 'cultura':
      if (percentage < 50) {
        insights.push('La resistencia al cambio puede ser el mayor obstáculo para adoptar IA')
      } else if (percentage < 80) {
        insights.push('Tu equipo muestra apertura al cambio, pero necesita más formación digital')
      } else {
        insights.push('Cultura digital madura, tu equipo está listo para liderar la transformación con IA')
      }
      break
      
    case 'tecnologia':
      if (percentage < 50) {
        insights.push('Necesitas modernizar tu infraestructura tecnológica antes de IA avanzada')
      } else if (percentage < 80) {
        insights.push('Base tecnológica sólida, puedes empezar con automatizaciones simples')
      } else {
        insights.push('Infraestructura tecnológica madura, lista para proyectos complejos de IA')
      }
      break
      
    case 'estrategia':
      if (percentage < 50) {
        insights.push('Sin estrategia clara, los proyectos de IA serán experimentos sin rumbo')
      } else if (percentage < 80) {
        insights.push('Visión estratégica en desarrollo, necesitas mayor concreción en objetivos')
      } else {
        insights.push('Estrategia digital madura, clara orientación para maximizar el ROI de la IA')
      }
      break
      
    case 'seguridad':
      if (percentage < 50) {
        insights.push('La seguridad debe fortalecerse antes de manejar datos sensibles con IA')
      } else if (percentage < 80) {
        insights.push('Seguridad aceptable, pero la IA requiere medidas adicionales de privacidad')
      } else {
        insights.push('Excelente postura de seguridad, preparada para cumplimiento normativo en IA')
      }
      break
  }
  
  return insights
}

function generateBlockRecommendations(blockId: string, level: string, percentage: number, companyInfo: CompanyInfo): string[] {
  const recommendations: string[] = []
  
  switch (blockId) {
    case 'procesos':
      const isSmallOrg = ['1', '2-5', '6-15'].includes(companyInfo.employeeCount)
      if (level === 'critico') {
        if (isSmallOrg) {
          recommendations.push('Documenta tu proceso más crítico (ventas o entrega)')
          recommendations.push('Implementa 1-2 métricas básicas de rendimiento')
        } else {
          recommendations.push('Documenta tus 3-5 procesos más críticos')
          recommendations.push('Implementa KPIs básicos para medir eficiencia')
        }
      } else if (level === 'basico') {
        if (isSmallOrg) {
          recommendations.push('Usa herramientas simples como Trello o Notion para mapear procesos')
          recommendations.push('Identifica 1-2 tareas repetitivas para automatizar')
        } else {
          recommendations.push('Digitaliza el mapeo de procesos con herramientas BPM')
          recommendations.push('Identifica tareas repetitivas candidatas a automatización')
        }
      }
      break
      
    case 'datos':
      if (level === 'critico') {
        recommendations.push('Consolida datos críticos en un sistema central')
        recommendations.push('Limpia y normaliza la información más importante')
      } else if (level === 'basico') {
        recommendations.push('Establece integraciones entre sistemas principales')
        recommendations.push('Implementa políticas básicas de calidad de datos')
      }
      break
      
    case 'cultura':
      if (level === 'critico') {
        recommendations.push('Designa un responsable de transformación digital')
        recommendations.push('Inicia programa básico de formación digital')
      } else if (level === 'basico') {
        recommendations.push('Implementa herramientas colaborativas en toda la organización')
        recommendations.push('Crea incentivos para la mejora continua')
      }
      break
      
    case 'tecnologia':
      if (level === 'critico') {
        recommendations.push('Migra sistemas críticos a la nube')
        recommendations.push('Establece soporte IT estratégico')
      } else if (level === 'basico') {
        recommendations.push('Prueba herramientas de automatización simples')
        recommendations.push('Aumenta el porcentaje de procesos digitalizados')
      }
      break
      
    case 'estrategia':
      if (level === 'critico') {
        recommendations.push('Define una estrategia digital básica con objetivos claros')
        recommendations.push('Realiza un piloto de automatización pequeño')
      } else if (level === 'basico') {
        recommendations.push('Integra IA en la planificación estratégica formal')
        recommendations.push('Establece presupuesto específico para innovación digital')
      }
      break
      
    case 'seguridad':
      if (level === 'critico') {
        recommendations.push('Implementa medidas básicas: backups, antivirus, firewalls')
        recommendations.push('Forma al equipo en seguridad digital básica')
      } else if (level === 'basico') {
        recommendations.push('Desarrolla plan de respuesta a incidentes')
        recommendations.push('Asegura cumplimiento GDPR completo')
      }
      break
  }
  
  return recommendations
}

function generateMainInsights(blockAnalysis: BlockAnalysis[], percentage: number, companyInfo: CompanyInfo): string[] {
  const insights: string[] = []
  const criticalBlocks = blockAnalysis.filter(b => b.level === 'critico')
  const advancedBlocks = blockAnalysis.filter(b => b.level === 'avanzado')
  
  // Insight principal basado en puntuación global y tamaño
  const isSmallOrg = ['1', '2-5', '6-15'].includes(companyInfo.employeeCount)
  if (percentage < 35) {
    if (isSmallOrg) {
      insights.push('🔴 Como organización pequeña, enfócate primero en consolidar los fundamentos básicos antes de pensar en IA.')
    } else {
      insights.push('🔴 Tu organización está en fase inicial para IA. Necesitas fortalecer fundamentos antes de proyectos complejos.')
    }
  } else if (percentage < 60) {
    if (isSmallOrg) {
      insights.push('🟡 Base aceptable para tu tamaño. Empieza con herramientas de IA simples que te ahorren tiempo.')
    } else {
      insights.push('🟡 Tienes una base aceptable. Puedes empezar con automatizaciones simples mientras fortaleces otras áreas.')
    }
  } else if (percentage < 80) {
    if (isSmallOrg) {
      insights.push('🟢 Muy bien para tu tamaño. Puedes probar IA específica para pequeños negocios con confianza.')
    } else {
      insights.push('🟢 Buen nivel de madurez. Estás preparado para pilotos de IA estructurados con expectativas realistas.')
    }
  } else {
    insights.push('🟢 Excelente madurez digital. Puedes abordar proyectos ambiciosos de IA con alta probabilidad de éxito.')
  }
  
  // Insights específicos basados en bloques críticos
  if (criticalBlocks.length > 0) {
    const criticalAreas = criticalBlocks.map(b => b.title.split('.')[1].trim()).join(', ')
    insights.push(`⚠️ Áreas críticas a resolver: ${criticalAreas}`)
  }
  
  // Insights sobre fortalezas
  if (advancedBlocks.length > 0) {
    const strongAreas = advancedBlocks.map(b => b.title.split('.')[1].trim()).join(', ')
    insights.push(`💪 Tus fortalezas principales: ${strongAreas}`)
  }
  
  return insights
}

function generatePriorityActions(blockAnalysis: BlockAnalysis[], companyInfo: CompanyInfo): string[] {
  const actions: string[] = []
  const criticalBlocks = blockAnalysis.filter(b => b.level === 'critico').sort((a, b) => a.percentage - b.percentage)
  const basicBlocks = blockAnalysis.filter(b => b.level === 'basico')
  
  // Acciones para bloques críticos (máxima prioridad)
  criticalBlocks.slice(0, 2).forEach((block, index) => {
    if (block.recommendations.length > 0) {
      actions.push(`${index + 1}. ${block.recommendations[0]} (${block.title.split('.')[1].trim()})`)
    }
  })
  
  // Si no hay críticos o quedan acciones, añadir de básicos
  if (actions.length < 3) {
    basicBlocks.slice(0, 3 - actions.length).forEach((block, index) => {
      if (block.recommendations.length > 0) {
        actions.push(`${actions.length + 1}. ${block.recommendations[0]} (${block.title.split('.')[1].trim()})`)
      }
    })
  }
  
  return actions.slice(0, 3) // Máximo 3 acciones prioritarias
}

function determineTimeframe(blockAnalysis: BlockAnalysis[], percentage: number, companyInfo: CompanyInfo): string {
  const criticalCount = blockAnalysis.filter(b => b.level === 'critico').length
  const isSmallOrg = ['1', '2-5', '6-15'].includes(companyInfo.employeeCount)
  
  if (percentage < 35) {
    return isSmallOrg ? '6-12 meses para bases sólidas + herramientas simples de IA' : '12-18 meses para estar preparado para IA más compleja'
  } else if (percentage < 60) {
    return isSmallOrg ? '3-6 meses para implementar herramientas de IA específicas' : '6-12 meses para implementar automatizaciones intermedias'
  } else if (percentage < 80) {
    return isSmallOrg ? '1-3 meses para probar soluciones de IA dirigidas' : '3-6 meses para pilotos de IA exitosos'
  } else {
    return isSmallOrg ? 'Listo ahora para IA enfocada en tu negocio' : 'Listo ahora para proyectos ambiciosos de IA'
  }
}

function determineInvestmentGuidance(blockAnalysis: BlockAnalysis[], percentage: number, companyInfo: CompanyInfo): string {
  const isSmallOrg = ['1', '2-5', '6-15'].includes(companyInfo.employeeCount)
  
  if (percentage < 35) {
    return isSmallOrg 
      ? 'Inversión mínima: Enfócate en herramientas gratuitas/baratas y capacitación básica antes que IA.'
      : 'Enfócate en inversión en fundamentos: procesos, datos y capacitación. Evita IA compleja aún.'
  } else if (percentage < 60) {
    return isSmallOrg
      ? 'Inversión selectiva: Prueba herramientas de IA específicas de bajo costo (ChatGPT, Canva AI, etc.)'
      : 'Inversión balanceada: 70% en fortalecer base, 30% en automatizaciones simples.'
  } else if (percentage < 80) {
    return isSmallOrg
      ? 'Inversión dirigida: Invierte en 1-2 soluciones de IA que impacten directamente tu negocio.'
      : 'Inversión estratégica: 50% en pilotos de IA, 50% en optimizar áreas débiles.'
  } else {
    return isSmallOrg
      ? 'Inversión ambiciosa para tu tamaño: Puedes ser un early adopter de IA en tu sector.'
      : 'Inversión ambiciosa: Puedes destinar recursos significativos a proyectos transformacionales de IA.'
  }
}