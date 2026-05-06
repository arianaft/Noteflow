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