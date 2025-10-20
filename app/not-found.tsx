import type { Metadata } from 'next';
import Link from 'next/link';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found - NoteHub',
  description: 'The page you are looking for does not exist. Return to NoteHub to continue managing your notes.',
  openGraph: {
    title: 'Page Not Found - NoteHub',
    description: 'The page you are looking for does not exist. Return to NoteHub to continue managing your notes.',
    url: 'https://vercel.com/new/olenas-projects-81ca86a5/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=07-routing-nextjs-j99qmfeh0-olenas-projects-81ca86a5.vercel.app&projectName=07-routing-nextjs&s=https%3A%2F%2Fgithub.com%2FOlenaZhmudenko%2F07-routing-nextjs&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1&flow-id=N5KH7YGpWN6gircyGJqOg',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Return to Home
        </Link>
      </div>
    </main>
  );
}