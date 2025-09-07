# Checklist de Madurez en IA 🧠

Una herramienta web interactiva para evaluar la preparación de organizaciones para implementar soluciones de Inteligencia Artificial.

## 🚀 Características Principales

### ✨ Diagnóstico Personalizado Inteligente
- **Análisis por bloques temáticos**: Evaluación específica de cada área crítica
- **Recomendaciones targetizadas**: Consejos específicos según las debilidades detectadas
- **Veredictos adaptativos**: Mensajes personalizados basados en respuestas reales

### 🎯 Dos Perfiles de Evaluación
- **Micropymes (50 pts)**: 17 preguntas en 6 bloques temáticos
- **Empresas (100 pts)**: 20 preguntas en 7 bloques temáticos

### 🎨 Interfaz Moderna y Atractiva
- **shadcn/ui components**: Interfaz profesional y elegante
- **Animaciones suaves**: Experiencia de usuario fluida con Framer Motion
- **Responsive design**: Optimizado para mobile y desktop
- **Progreso visual**: Barras de progreso y feedback en tiempo real

### 🧠 Sistema de Evaluación Inteligente

#### Niveles de Madurez:
- 🔴 **NO PREPARADO**: Fundamentos por fortalecer
- 🟡 **PILOTO**: Listo para proyectos controlados
- 🟢 **ESCALAR**: Preparado para implementación completa

#### Diagnóstico Personalizado:
- Identifica áreas específicas débiles (procesos, datos, governance, etc.)
- Proporciona recomendaciones accionables por área
- Combina análisis cuantitativo con insights cualitativos

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **UI Components**: shadcn/ui con Radix UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **TypeScript**: Tipado estático completo
- **Deployment**: Optimizado para Vercel

## 📋 Bloques Temáticos

### Micropymes:
1. **Objetivos y Casos de Uso** (10 pts)
2. **Procesos Básicos** (12 pts)
3. **Datos Mínimos** (12 pts)
4. **Herramientas y Encaje** (6 pts)
5. **Seguridad Básica** (4 pts)
6. **Medición** (6 pts)

### Empresas:
1. **Estrategia y Objetivos** (15 pts)
2. **Procesos** (15 pts)
3. **Datos** (20 pts)
4. **Gobernanza y Seguridad** (15 pts)
5. **Tecnología e Integración** (10 pts)
6. **Personas y Cultura** (10 pts)
7. **Medición y ROI** (15 pts)

## 🚀 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone [repo-url]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm run start
```

## 🌐 Deployment en Vercel

Este proyecto está optimizado para Vercel:

1. Conecta tu repositorio a Vercel
2. El deployment es automático con cada push
3. Variables de entorno ya configuradas

## 📱 Características Mobile

- **Touch-friendly**: Controles optimizados para dispositivos táctiles
- **Responsive**: Adaptación automática a diferentes tamaños de pantalla
- **Performance**: Carga rápida y animaciones suaves

## 🎯 Casos de Uso

### Para Consultores:
- Evaluación inicial de clientes
- Lead magnet profesional
- Herramienta de diagnóstico

### Para Empresas:
- Autoevaluación de preparación IA
- Planificación estratégica
- Benchmark interno

### Para Educación:
- Material didáctico interactivo
- Evaluación de conocimientos
- Herramienta de aprendizaje

## 🔄 Algoritmo de Diagnóstico

```typescript
// Ejemplo del algoritmo personalizado
if (blockScores.procesos?.average <= 0.5) {
  diagnosis.push('📋 PROCESOS: Documenta paso a paso el proceso a mejorar - es fundamental antes de automatizar.')
}

if (blockScores.datos?.average <= 0.5) {
  diagnosis.push('💾 DATOS: Digitaliza y estructura tus datos - sin datos limpios la IA no funcionará.')
}
```

## 📈 Métricas y Analytics

- Puntuación por bloques temáticos
- Porcentaje de madurez general
- Análisis comparativo (si completa ambos perfiles)
- Recomendaciones priorizadas por impacto

## 🤝 Contribución

Este es un proyecto de código abierto. Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crea una feature branch
3. Commit de cambios
4. Push a la branch
5. Crear Pull Request

## 📄 Licencia

Proyecto desarrollado con fines educativos y de evaluación empresarial.

---

**Desarrollado con ❤️ usando shadcn/ui y Next.js**