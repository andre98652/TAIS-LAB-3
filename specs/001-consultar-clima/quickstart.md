# Quickstart y validación

## Requisitos

Node.js LTS compatible con las versiones de package.json, npm y navegador.
Para retomar el flujo: Python 3.11+ y Spec Kit 1.2.5 o una versión compatible.
La aplicación funciona sin Python; .tools es solo el entorno local de preparación.

## Ejecutar desde la raíz del repositorio

```powershell
cd app
npm.cmd ci
npm.cmd run dev
```

Abrir la URL que muestre Vite. Buscar Lima y comprobar nombre, °C, %, mm y fuente.
Si el proveedor no responde, debe aparecer un error identificando el servicio.

## Comprobar de forma repetible

Mantener la terminal dentro de `app/`.

```powershell
npm.cmd run typecheck
npm.cmd run test -- --run
npm.cmd run build
```

Probar vacío, solo espacios, Enter, texto con espacios extremos, ciudad inexistente,
recuperación después de fallo y nueva búsqueda. Los errores HTTP, timeout, cuerpo lento,
datos incompletos y valores inválidos se simulan en la suite automática.

Comprobar a 360 px que el formulario y los tres valores se lean sin desbordar la página.
Ver [contratos](contracts/open-meteo.md) y [modelo](data-model.md) para resultados esperados.

## Retomar las instrucciones del asistente

Las skills están en `.agents/skills/speckit-*`. Se leen y ejecutan desde el chat del
asistente compatible, no como comandos de PowerShell. La funcionalidad activa está
registrada en `.specify/feature.json`.
