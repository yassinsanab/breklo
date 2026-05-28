import { getToolContent } from '@/lib/toolContent';
const content = getToolContent('mp4-to-wav');
export const metadata = {
  title: content.h1,
  description: content.intro.slice(0, 160),
};
export default function Layout({ children }) { return children; }
