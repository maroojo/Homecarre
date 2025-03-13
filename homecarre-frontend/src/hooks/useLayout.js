import { usePathname } from 'next/navigation';

const path = ['/admin/login'];

const useLayout = (blacklist = path) => {
  const pathname = usePathname();
  const hide = blacklist.includes(pathname);
  return { hide };
};

export default useLayout;