import { useEffect, useState } from 'react';
import { Tag, Tooltip } from 'antd';
import { CircleHelpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as api from '@/api/vm.ts';

type IP = {
  name: string;
  addr: string;
  version: string;
  type: string;
};

type Info = {
  ips: IP[];
  mdns: string;
  image: string;
  application: string;
  deviceKey: string;
};

export const Information = () => {
  const { t } = useTranslation();

  const [information, setInformation] = useState<Info>();

  useEffect(() => {
    api.getInfo().then((rsp: any) => {
      if (rsp.code !== 0) {
        console.log(rsp.msg);
        return;
      }

      setInformation(rsp.data);
    });
  }, []);

  return (
    <>
      <div className="pb-5 text-neutral-400">{t('settings.about.information')}</div>

      <div className="flex w-full flex-col space-y-4">
        {/* IP list */}
        <div className="flex w-full items-start justify-between">
          <span>{t('settings.about.ip')}</span>
          {information?.ips && information.ips.length > 0 ? (
            <div className="flex flex-col space-y-1">
              {information.ips.map((ip) => (
                <div key={ip.addr} className="flex items-center">
                  <Tag>{ip.type}</Tag>
                  <span>{ip.addr}</span>
                </div>
              ))}
            </div>
          ) : (
            <span>-</span>
          )}
        </div>

        {/* mDNS */}
        {!!information?.mdns && (
          <div className="flex w-full items-center justify-between">
            <span>{t('settings.about.mdns')}</span>
            <span>{information.mdns}</span>
          </div>
        )}

        {/* image version */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>{t('settings.about.image')}</span>
            <Tooltip
              title={t('settings.about.imageTip')}
              className="cursor-pointer text-neutral-500"
              placement="right"
            >
              <CircleHelpIcon size={15} />
            </Tooltip>
          </div>

          <span>{information ? information.image : '-'}</span>
        </div>

        {/* application version */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>{t('settings.about.application')}</span>
            <Tooltip
              title={t('settings.about.applicationTip')}
              className="cursor-pointer text-neutral-500"
              placement="right"
            >
              <CircleHelpIcon size={15} />
            </Tooltip>
          </div>

          <span>{information ? information.application : '-'}</span>
        </div>

        {/* device key */}
        {/*<div className="flex w-full items-center justify-between">*/}
        {/*  <span>{t('settings.about.deviceKey')}</span>*/}
        {/*  <span>{information ? information.deviceKey : '-'}</span>*/}
        {/*</div>*/}
      </div>
    </>
  );
};
