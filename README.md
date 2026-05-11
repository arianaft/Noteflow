# NoteFlow

App de productividad para estudiantes construida con React Native y Expo.
Permite gestionar tres tipos de contenido: notas de texto, checklists
de tareas y notas de ideas con etiquetas y color.

## Gestión del proyecto

Tablero Trello: [NoteFlow Board](https://trello.com/invite/b/69faff3f1fe9fcecfc191217/ATTI659747fb48f331e4516a0232dbcac5e47FE2B999/noteflow)

## Stack tecnológico

- React Native con Expo SDK 54
- TypeScript
- Expo Router para navegación
- Zustand para estado global
- AsyncStorage para persistencia local
- FlashList de Shopify para listas de alto rendimiento
- Zod para validación de formularios

## Funcionalidades

- Crear, ver y eliminar notas de texto
- Crear checklists con items marcables
- Crear ideas rápidas con etiquetas y color de fondo
- Navegación por pestañas: Notas, Tareas e Ideas
- Pantalla de detalle para cada elemento
- Estados vacíos cuando no hay contenido
- Persistencia local de datos
- Soporte para modo oscuro y claro

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Arrancar en web
npx expo start --web

# Arrancar en móvil
npx expo start --tunnel
```

## Estructura del proyecto

```
noteflow/
├── app/              # Rutas de Expo Router
│   └── (tabs)/       # Navegación principal por pestañas
├── components/       # Componentes reutilizables
│   └── items/        # NoteCard, ChecklistCard, IdeaCard
├── store/            # Store de Zustand
├── types/            # Interfaces TypeScript
├── constants/        # Tokens visuales del tema
└── docs/             # Documentación del proyecto

```