import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { MaximizeIcon, MinimizeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Fullscreen = () => {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    onFullscreenChange();

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  function handleFullscreen() {
    if (!document.fullscreenElement) {
      const element = document.documentElement;
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <Tooltip title={t('fullscreen.toggle')} placement="bottom" mouseEnterDelay={0.6}>
      <div
        className="hidden h-[30px] w-[30px] cursor-pointer items-center justify-center rounded text-neutral-300 hover:bg-neutral-700/80 hover:text-white sm:flex"
        onClick={handleFullscreen}
      >
        {isFullscreen ? <MinimizeIcon size={18} /> : <MaximizeIcon size={18} />}
      </div>
    </Tooltip>
  );
};
