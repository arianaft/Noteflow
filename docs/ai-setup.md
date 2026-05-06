# Configuración de herramientas de IA

## Herramienta utilizada: Claude

Para este proyecto se usa Claude como asistente de desarrollo.
Al iniciar cada conversación nueva sobre NoteFlow se incluye
este bloque de contexto antes de cualquier pregunta:

---

Contexto del proyecto NoteFlow:
- App móvil React Native con Expo SDK 54 y TypeScript
- Expo Router para navegación file-based
- Zustand para estado global, AsyncStorage para persistencia
- FlashList para listas, Zod para validación, Gluestack UI para componentes
- Tres tipos de nota: Note (texto), ChecklistNote (items marcables), IdeaNote (etiquetas + color)
- Estructura: app/ para rutas, components/ para UI, store/ para Zustand, types/ para interfaces
- Nunca FlatList, nunca StyleSheet.create, nunca useState para estado global

---

## Por qué se configura así

Sin contexto, Claude genera código React genérico que no funciona
en React Native, o sugiere FlatList en lugar de FlashList, o gestiona
estado con useState en lugar de Zustand. Con el bloque de contexto
el código generado encaja directamente en el proyecto.