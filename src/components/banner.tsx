import React, { useEffect, useState } from 'react';
import { BannerRes } from '../typescript/response';
import { getBannerRes } from '../helper';
import { ActionBar, Button } from '@contentstack/venus-components';
import '@contentstack/venus-components/build/main.css';
import { useLivePreviewCtx } from '../context/live-preview-context-provider';


export function Banner() {

  const [banner, setBanner] = useState<BannerRes>(); 
  const [url, setUrl] = useState<string>(); 
  const lpTs = useLivePreviewCtx();
 

async function getBannerData() {
  const bannerData = await getBannerRes();
  setBanner(bannerData);
}

 useEffect(() => {
   getBannerData();
   setUrl(banner?.button.url.at(0)?.url ?? '/');

 }, [lpTs]);

      

  return (
    <div className='member-head'>
       {banner?.background_image ? (
        <img
          {...banner.background_image.$?.url as {}}
          alt={banner.background_image.filename}
          src={banner.background_image.url}
        />
      ) : (
        ''
      )}
      <h1>{banner?.title}</h1>
      <Button
        buttonType={banner?.button.button_type}
        size = {banner?.button.size}
        href= {url}
      >
        {banner?.button.label}
      </Button>
    </div>
  );
  }

export default Banner;
    