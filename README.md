# Latitud

Aplicación local de consulta meteorológica por ciudad, realizada como caso práctico
de desarrollo guiado por especificaciones con GitHub Spec Kit 1.2.5.

## Ejecutar

Requiere Node.js compatible con package.json (comprobado con 24.16.0) y npm.
Desde esta carpeta:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir la URL que imprime Vite. Para elegir el puerto usado en la demostración:

```powershell
npm.cmd run dev -- --port 5179 --strictPort
```

Si está ocupado, utilizar la instancia existente o cambiar el puerto. No iniciar varias
instancias por defecto. Python y Spec Kit no se necesitan para usar la aplicación.

## Verificar

```powershell
npm.cmd run typecheck
npm.cmd run test:run
npm.cmd run build
```

Se comprobaron 47 casos en cuatro archivos de pruebas, tipos y compilación de producción.
Las pruebas de errores utilizan transporte simulado; la consulta real se comprobó además
en navegador. No se midió cobertura porcentual ni se ejecutó una auditoría de seguridad.

## Flujo SDD

- Constitución: `.specify/memory/constitution.md`.
- Especificación: `specs/001-consultar-clima/spec.md`.
- Diseño: `specs/001-consultar-clima/plan.md`.
- Investigación, modelo, contratos y quickstart: en la misma carpeta de especificaciones.
- Tareas: `specs/001-consultar-clima/tasks.md`.
- Instrucciones oficiales instaladas: `.agents/skills/speckit-*`.
- Bitácora: `docs/bitacora-sdd.md`.
- Capturas y salidas reales de comprobaciones: `docs/evidencias/`.

La CLI se instaló en un entorno Python local `.tools/` y se ejecutó:

```powershell
.\.tools\Scripts\specify.exe init --here --force --non-interactive --integration codex --script ps
```

Esta orden describe la inicialización ya realizada; no repetirla encima del proyecto.
Las etapas del asistente se siguieron leyendo las skills instaladas y aplicando sus
instrucciones en esta conversación. Los comandos `$speckit-*` pertenecen al chat del
asistente compatible, no a PowerShell.

Para otra laptop, reinstalar Spec Kit si se desea retomar el flujo; no copiar `.tools/`,
porque los entornos Python contienen rutas específicas del equipo. Conservar `.specify/`,
`.agents/`, `specs/`, código y lockfile.

## Arquitectura y alcance

Vista -> controlador -> servicios -> cliente HTTP común -> Open-Meteo.
La entrada se valida antes de consultar. Solo hay una búsqueda activa. El timeout de
10 segundos por servicio incluye la lectura JSON. Los valores se conservan crudos y
se redondean en la vista. Cadenas externas se presentan mediante textContent.

Open-Meteo devuelve condiciones modeladas. La aplicación usa el primer resultado
geográfico, por lo que nombres ambiguos pueden corresponder a otra ciudad. Muestra
país y coordenadas para dar contexto. Precipitación en mm corresponde al intervalo
devuelto; no significa probabilidad de lluvia. Requiere conexión y servicio disponible.

Datos: [Open-Meteo](https://open-meteo.com/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Los valores se redondean para su presentación. Uso académico no comercial conforme
a las condiciones del proveedor.

El enunciado compartido exige un caso práctico con Spec Kit; el tema, stack y alcance
son la propuesta adoptada. Este repositorio contiene el código y los entregables
del laboratorio. La aplicación se ejecuta localmente; no se ha desplegado en hosting.

## Informe y material de exposición

- [Informe con capturas](informe/Informe_Laboratorio_SDD_GitHub_Spec_Kit.docx): 16 páginas y 11 figuras.
- [Guía detallada del laboratorio](docs/GUIA_LABORATORIO_SDD_SPEC_KIT.md).
- [Prompt de referencia](docs/prompt_spec_kit.txt): propuesta para reproducir el caso,
  no transcripción de un único mensaje original.
- [Bitácora de realización](docs/bitacora-sdd.md).
- [Capturas y resultados](docs/evidencias/).

El informe y la bitácora describen el estado de la realización antes de solicitar
la publicación en GitHub. Las referencias a la ausencia de un repositorio remoto
corresponden a ese momento. Posteriormente se preparó esta entrega para
[TAIS-LAB-3](https://github.com/andre98652/TAIS-LAB-3).
