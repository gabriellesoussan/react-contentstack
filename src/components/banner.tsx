import React, { useEffect, useState } from 'react';
import { BannerRes } from '../typescript/response';
import { getBannerRes } from '../helper';
import { ActionBar, Button } from '@contentstack/venus-components';
import '@contentstack/venus-components/build/main.css';
import Contentstack from 'contentstack';
import { useLivePreviewCtx } from '../context/live-preview-context-provider';
import { useNavigate } from 'react-router-dom';


export function Banner() {

  const [banner, setBanner] = useState<BannerRes>(); 
  const [url, setUrl] = useState<string>(); 
  const Stack = Contentstack.Stack({ "api_key": "bltf740414cc05c8837", "delivery_token": "csb74a81e7e50e9c4b30db8d87", "environment": "development"});
  const Query = Stack.ContentType('banner').Entry("blt882493ba5de4d0bf");
  const lpTs = useLivePreviewCtx();

  const getData = () => {
    return new Promise((resolve, reject) => {
      Query.toJSON()
          .fetch()
          .then(
              function success(entry) {
                  resolve(entry);
              },
              function error(err) {
                  console.log('error id');
                  reject(err);
              }
          );
       });
    };
 

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
        href= {url}
      >
        {banner?.button.label}
      </Button>
    </div>
  );
  }

export default Banner;
    