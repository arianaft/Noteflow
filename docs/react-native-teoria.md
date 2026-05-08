# Teoría React Native

## React Native vs app nativa

Una app nativa se escribe en Swift (iOS) o Kotlin (Android) y habla
directamente con el sistema operativo. React Native escribe en
JavaScript/TypeScript pero en lugar de renderizar HTML en un WebView,
habla con el SO para crear vistas nativas reales. El resultado tiene
el aspecto y rendimiento de una app nativa pero con un solo código
para iOS y Android.

## Metro bundler

Metro es el empaquetador de JavaScript de React Native. Funciona de
forma similar a Webpack pero está optimizado para móvil. Cuando ejecutas
`npx expo start`, Metro arranca un servidor local que transforma y sirve
el código JS a la app. Soporta hot reload, lo que significa que los
cambios en el código se reflejan en el dispositivo sin reiniciar la app.

## Por qué Expo Go no es suficiente en proyectos reales

Expo Go es un entorno de desarrollo rápido: escaneas un QR y tu app
corre sin compilar nada. El problema es que solo soporta los módulos
incluidos en Expo Go. Si necesitas módulos nativos personalizados como
notificaciones push, biometría o cámara avanzada, necesitas un
Development Build: un binario propio generado con EAS Build que incluye
exactamente los módulos nativos que tu proyecto necesita.

## Sistemas de diseño

Se eligió Gluestack UI sobre React Native Paper por las siguientes razones:
- Mejor soporte con Expo SDK 54
- Filosofía utilitaria similar a Tailwind, más flexible visualmente
- Permite crear tarjetas con estilos muy distintos para cada tipo de nota
- React Native Paper impone Material Design, lo que limita la identidad
  visual de NoteFlow

El archivo constants/theme.ts centraliza todos los tokens visuales:
colores, tipografía, espaciados y bordes. El hook useTheme() devuelve
los valores correctos según si el sistema está en modo oscuro o claro.

## Navegación en NoteFlow

### Tabs (pestañas)
Navegación principal entre las tres secciones: Notas, Tareas e Ideas.
El usuario siempre ve las pestañas en la parte inferior y puede cambiar
de sección en cualquier momento sin perder el estado.

### Stack (pila)
Navegación dentro de cada sección. Al pulsar una tarjeta se apila
la pantalla de detalle encima. El botón de volver desapila y regresa
al listado. Se usa para la pantalla de detalle [id].tsx.

### Modal
Se usa para la creación de nuevo contenido. Aparece desde abajo
cubriendo parcialmente la pantalla. Se usa en nueva-nota.tsx porque
es una acción puntual que no forma parte del flujo principal.