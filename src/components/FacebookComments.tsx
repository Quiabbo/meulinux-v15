import React, { useEffect } from 'react';

interface FacebookCommentsProps {
  url: string;
}

export const FacebookComments: React.FC<FacebookCommentsProps> = ({ url }) => {
  useEffect(() => {
    // Load Facebook SDK
    const loadSDK = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
        return;
      }

      (window as any).fbAsyncInit = function() {
        window.FB.init({
          appId: '', // Optional: Add your Facebook App ID here
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };

      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/pt_BR/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };

    loadSDK();
  }, [url]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-12">
      <h3 className="text-2xl font-display font-bold mb-8 text-dark border-b-2 border-primary/10 pb-4">
        Comentários
      </h3>
      <div 
        className="fb-comments" 
        data-href={url} 
        data-width="100%" 
        data-numposts="5"
        data-colorscheme="light"
      ></div>
    </div>
  );
};

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
