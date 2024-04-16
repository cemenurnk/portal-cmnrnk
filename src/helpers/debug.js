export const debugConsole = (...message) => {
  if(import.meta.env.VITE_EVIRONMENT === "DESA") console.log(...message)
}