import { useEffect, useState } from 'react';

/**
 *
 * @desc: hook nay dung de check viec da co hydrate chưa
 */

const useCheckIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  });

  return {
    isHydrated,
  };
};

export default useCheckIsHydrated;
