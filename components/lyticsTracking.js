import { useEffect, useState } from "react";

const snippet = `!function(){"use strict";if("undefined"!=typeof window){var n=function(o){r[o]=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return i.push([o,e]),r}},r=window.jstag||(window.jstag={}),i=[];n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("call"),n("on"),n("once"),r.asyncVersion="3.0.37",r.loadScript=function(n,e,t){var o=document.createElement("script");o.async=!0,o.src=n,o.onload=e,o.onerror=t;var r=document.getElementsByTagName("script")[0],i=r&&r.parentNode||document.head||document.body,c=r||i.lastChild;return null!=c?i.insertBefore(o,c):i.appendChild(o),this},r.init=function n(e){return r.config=e,r.loadScript(e.src,function(){if(r.init===n)throw new Error("Load error!");r.init(r.config),function(){for(var n=0;n<i.length;n++){var e=i[n][0],t=i[n][1];r[e].apply(r,t)}i=void 0}()}),r}}}();`;

export const useJstag = () => {
  if (typeof jstag === "undefined") {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.text = snippet;
    document.head.appendChild(script);

    jstag.init({
      src: `https://c.lytics.io/api/tag/${process.env.LYTICS_TAG}/latest.min.js`, 
      contentstack: {
        entityPush: {
          poll: {
            disabled: false,
          },
        },
      },
    });
  }
  return jstag;
};

export const useEntity = () => {
  const jstag = useJstag();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    const off = jstag.on("entity.loaded", (_, entity) => {
      setEntity(entity);
    });
    return () => {
      off();
    };
  }, []);

  return entity;
};

export function LyticsTracking() {
  const jstag = useJstag();

  useEffect(() => {
    jstag.pageView();
  }, [jstag]);

  return <></>;
}
