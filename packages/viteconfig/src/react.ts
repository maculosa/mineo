/**
 * React-specific Vite configuration.
 * @module reactConfig
 * @description React-specific Vite configuration.
 * @author Mineo
 * @example
 * ```ts
 * import { reactConfig } from '@mineo/vite-config/react';
 * ```
 * @see {@link https://mineo.banmao.cc}
 */

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import AutoImport from 'unplugin-auto-import/vite'

export const reactConfig = {
  plugins: [react(), tailwindcss(), AutoImport({
    imports: ['react'],
    dts: true,
  })],
};
