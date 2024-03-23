import { useEffect } from "react";
import TagManager from "react-gtm-module";

const useGA4EventTop = () => {

  let script = null;
  if (process.env.REACT_APP_ENVIRONMENT === 'cardel-product') {
    if (document.querySelector('#line_script') === null) {
      script = document.createElement('script');
      script.id = 'line_script';

      // innerHTMLでやりたい内容を書く
      script.innerHTML = `
        (function(g,d,o){
        g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};
        var h=location.protocol==='https:'?'https://d.line-scdn.net':'http://d.line-cdn.net';
        var s=d.createElement('script');s.async=1;
        s.src=o||h+'/n/line_tag/public/release/v1/lt.js';
        var t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);
            })(window, document);
        _lt('init', {
        customerType: 'account',
        tagId: 'f711f2f9-ba7d-42d2-8efc-58037bd5adda'
        });
        _lt('send', 'cv', {
          type: 'TopPage'
        },['f711f2f9-ba7d-42d2-8efc-58037bd5adda']);
        `;
    }
  }

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT === 'cardel-product') {
      TagManager.initialize({gtmId: 'GTM-NG8K5TRD'});
      TagManager.dataLayer({
        dataLayer: {
          event: 'custom_page_view',
          "eventName": "page_view_top"
        },
      });
      // LINE
      if (script !== null) {
        document.body.appendChild(script);
        const element = document.getElementById("line_script");
        element.remove();
      }
    }
    else if (process.env.REACT_APP_ENVIRONMENT === 'cardel-develop') {
      TagManager.initialize({gtmId: 'GTM-N8HFV4B6'});
      TagManager.dataLayer({
        dataLayer: {
          event: 'custom_page_view',
          "eventName": "page_view_top"
        },
      });
    }
  }, []);
};

export default useGA4EventTop;