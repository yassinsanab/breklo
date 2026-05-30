// German homepage route.
// Re-exports the English homepage component, which is locale-aware (detects the
// /de route via usePathname and renders German strings through the t() helper).
export { default } from '@/app/page';
