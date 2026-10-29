# Aplicación Latitud

Esta carpeta contiene toda la aplicación: `src/`, `tests/`, `index.html`,
`package.json`, `package-lock.json` y las configuraciones de TypeScript y Vite.

Con Node.js compatible con `package.json`, ejecutar desde esta carpeta:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir la dirección que indique Vite. Se necesita Internet para consultar Open-Meteo.

Para verificar y compilar:

```powershell
npm.cmd run typecheck
npm.cmd run test:run
npm.cmd run build
```

Los requisitos, la arquitectura, las tareas, el informe y las evidencias están en
las carpetas del nivel superior. Consultar el [README general](../README.md).
