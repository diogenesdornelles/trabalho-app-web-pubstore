import useSession from '@/hooks/useSession';

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { authSession } = useSession();

  if (!authSession) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
