import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This disables native Rollup bindings at runtime
process.env.ROLLUP_NO_NATIVE = '1';

export default defineConfig({
  plugins: [react()],
});
